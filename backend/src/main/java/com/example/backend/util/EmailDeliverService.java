package com.example.backend.util;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import java.util.Properties;

@Component
public class EmailDeliverService {
    public  void sendMail(String emailContact, String emailSubject, String body) {

        String fromEmail =System.getenv("email");
        String password =System.getenv("password");
        Properties property = new Properties();
        property.put("mail.smtp.auth", "true");
        property.put("mail.smtp.starttls.enable", "true");
        property.put("mail.smtp.host", "smtp.gmail.com");
        property.put("mail.smtp.port", "587");
        property.put("mail.smtp.charset", "UTF-8");

        Authenticator auth = new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, password);
            }
        };


        Session session = Session.getInstance(property, auth);

        //send(session, fromEmail, emailContact, emailSubject, body);


        sendHtml(session, fromEmail, emailContact, emailSubject, body);
    }// end of send mail

    private void send(Session session, String fromEmail, String emailContact, String emailSubject, String body) {
        try {

            MimeMessage mimeMessage = new MimeMessage(session);

            mimeMessage.addHeader("Content-type", "text/HTML; charset=UTF-8");

            mimeMessage.addHeader("format", "flowed");

            mimeMessage.addHeader("Content-Transfer-Encoding", "8bit");

            mimeMessage.setFrom(new InternetAddress(fromEmail, "Księgarnia"));

            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(emailContact));

            mimeMessage.setText(body,"utf-8");

            Transport.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("exception occured while sending mail");

        }
    }

    //for html content


    private void sendHtml(Session session, String fromEmail, String emailContact, String emailSubject, String body) {
        try {
            MimeMessage mimeMessage = new MimeMessage(session);
            mimeMessage.addHeader("Content-type", "text/HTML; charset=UTF-8");

            mimeMessage.addHeader("format", "flowed");

            mimeMessage.addHeader("Content-Transfer-Encoding", "8bit");

            mimeMessage.setFrom(new InternetAddress(fromEmail, "Księgarnia"));

            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(emailContact));


            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom(new InternetAddress(fromEmail, "Księgarnia"));
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(emailContact));
            helper.setSubject("my subject");
            helper.setText(body, true);
//            helper.addInline("myLogo", new ClassPathResource("C:/Users/kamil/Desktop/pracDyplomowa/library system/pracaDyplomowa/frontend-ksiegarnia/src/assets/okladki/tamgdziepsy.png"));
//            helper.addAttachment("myDocument.pdf", new ClassPathResource("doc/myDocument.pdf"));
            helper.setTo(emailContact);
            helper.setSubject(emailSubject);
//            helper.setText(body, true);
//            mimeMessage.setText(body,"utf-8");


            Transport.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("exception occured while sending mail");

        }
    }





}