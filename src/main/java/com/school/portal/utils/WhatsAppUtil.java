package com.school.portal.utils;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

public class WhatsAppUtil {

    private static final String API_URL = "https://web-schoolportal.onrender.com/send-message";

    // Reuse RestTemplate instance
    private static final RestTemplate restTemplate = new RestTemplate();

    public static String sendWhatsAppMessage(String number, String message) {
        try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			Map<String, Object> body = new HashMap<>();
			body.put("number", number);
			body.put("message", message);
			HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
			ResponseEntity<String> response = restTemplate.postForEntity(API_URL, entity, String.class);
			if (response.getStatusCode() == HttpStatus.OK) {
				return response.getBody();
			} 
		} catch (Exception e) {
			// TODO: handle exception
		}finally {
			// TODO: handle finally clause
		}
		return null;
    }
}
