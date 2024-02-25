package com.school.portal.service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.school.portal.domain.User;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;
    
    public void sendEmail(User user, String subject, String templateName, Context context) {
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

	public void sendForgotPassEmail(User user, String subject, String templateName, Context context) {
		sendEmail(user, subject, templateName, context);
	}
	
	public void sendOneTimePasswordOnUserCreation(User user, String subject, String templateName, Context context) {
		sendEmail(user, subject, templateName, context);
	}
}
