package com.school.portal.service;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import javax.annotation.PostConstruct;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.school.portal.domain.User;
import com.school.portal.requests.EmailNotification;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;
    
    private final BlockingQueue<EmailNotification> queue = new LinkedBlockingQueue<>();

    public void sendEmail(User user, String subject, String templateName, Context context) {
    	EmailNotification emailNotification = new EmailNotification();
    	emailNotification.setUser(user);
    	emailNotification.setSubject(subject);
    	emailNotification.setTemplateName(templateName);
    	emailNotification.setContext(context);
    	addToQueue(emailNotification);
    }
    
    public void triggerEmail(User user, String subject, String templateName, Context context) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            helper.setTo(user.getUsername());
            helper.setSubject(subject);
            String htmlContent = templateEngine.process(templateName, context);
            helper.setText(htmlContent, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
        	e.printStackTrace();
        	System.out.println(e);
        }
    }
    
    
    // Method to add notifications to the queue
    public void addToQueue(EmailNotification notification) {
        try {
            queue.put(notification);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // Method to process notifications in a separate thread
    @PostConstruct
    public void init() {
        Thread thread = new Thread(() -> {
            while (/*!Thread.currentThread().isInterrupted()*/ true) {
                try {
                    EmailNotification notification = queue.take();
                    
                    if (notification != null) {
                        triggerEmail(notification.getUser(), notification.getSubject(), notification.getTemplateName(), notification.getContext());
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });
        thread.start();
    }

	public void sendForgotPassEmail(User user, String subject, String templateName, Context context) {
		sendEmail(user, subject, templateName, context);
	}
	
	public void sendOneTimePasswordOnUserCreation(User user, String subject, String templateName, Context context) {
		sendEmail(user, subject, templateName, context);
	}
}
