package com.example.backend.implementation;

import com.example.backend.exception.UserException;
import com.example.backend.repo.*;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import com.example.backend.request.ChangePassword;
import com.example.backend.request.LoginInfo;
import com.example.backend.response.EmailResponse;
import com.example.backend.response.SendEmail;
import com.example.backend.service.UserServices;
import com.example.backend.util.EmailDeliverService;
import com.example.backend.util.JwtGenerator;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@Log4j2
public class UserServiceImplementation implements UserServices {
    private User users = new User();

    @Autowired
    private IUserRepository iUserRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private JwtGenerator generator;
    @Autowired
    private SendEmail sendEmail;

    @Autowired
    private EmailDeliverService emailDeliverService;

    @Autowired
    private EmailResponse emailResponse;

    @Override
    public List<User> getUser() {
        return null;
    }

    @Override
    @Transactional
    public boolean register(UserDto information) {

        User user = iUserRepository.getUser(information.getEmail());

        if (user == null) {
            users = modelMapper.map(information, User.class);
            users.setCreatedDate(LocalDateTime.now());
            String ppassword = encoder.encode(information.getPassword());
            users.setPassword(ppassword);
            users.setVerified(false);
            users = iUserRepository.save(users);
            System.out.println("wygenerowany token:" + generator.jwtToken(users.getUserId()));
            String emailResponse = "http://localhost:8080/user/verify/"+generator.jwtToken(users.getUserId());
            sendEmail.setEmail(users.getEmail());
            sendEmail.setSubject("Zarejestrowano twoje konto!");
            sendEmail.setBody(emailResponse);
            emailDeliverService.sendMail(sendEmail.getEmail(), sendEmail.getSubject(), sendEmail.getBody());
            System.out.println(emailResponse);


            return true;
        } else {
            throw new UserException("Uzytkownik o takim emailu juz istnieje");
        }
    }

    @Override
    public User login(LoginInfo information){
        User users = iUserRepository.getUser(information.getEmail());
        if(users!=null) {
            String userRole = information.getRole();
            String fetchRole = users.getRole();
            String fetchEmail = users.getEmail();
            String userEmail = information.getEmail();
            if(fetchEmail.equals(userEmail) && users.getRole().equals("user")) {
                User userInfo = verifyPassword(users, information);
                log.info("zalogowano jako: "+ users.getRole());
                return userInfo;
            } else if (fetchEmail.equals(userEmail) && users.getRole().equals("seller")) {
                User userinfo = verifyPassword(users, information);
                log.info("zalogowano jako: "+ users.getRole());
                return userinfo;
            } else if (fetchEmail.equals(userEmail) && users.getRole().equals("admin")) {
                User userInfo = verifyPassword(users, information);
                log.info("zalogowano jako: " +users.getRole());
                return userInfo;

            } else {
                throw new UserException("Podane dane nie mają przydzielonej roli");
            }

        } else {
            throw new UserException("Konto nie istnieje, podaj prawidłowy adres email");
        }
    }

    @Override
    public boolean isUserAlive(String email) {
        try {
            User user = iUserRepository.getUser(email);
            if (user.isVerified() == true) {
                String mailResponse = emailResponse.formMessage("http://localhost:4200/update-password",
                        generator.jwtToken(user.getUserId()));
                System.out.println(mailResponse);
                emailDeliverService.sendMail(user.getEmail(), "Zresetuj swoje hasło!", mailResponse);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new UserException("Użytkownik o podanym e-mail nie istnieje!");
        }
    }

    @Transactional
    @Override
    public boolean verify(String token) {
        Long id = (long) generator.parseJWT(token);
        System.out.println("User id: " + id);
        iUserRepository.verify(id);
        return true;
    }

    @Transactional
    @Override
    public boolean updatePassword(ChangePassword credentials, String token) {
        System.out.println("User information" + credentials.toString());

        if(credentials.getNewPassword().equals(credentials.getConfirmPassword())){
            Long id = null;
            try {
                id = (long) generator.parseJWT(token);
//                System.out.println("token is:"+token);
                System.out.println("User id " + id);
                User updatepassword = iUserRepository.getUser(credentials.getEmail());
                System.out.println("updated user info" + updatepassword);
                if(id == updatepassword.getUserId()){
                    String epassword = encoder.encode(credentials.getConfirmPassword());
                    credentials.setConfirmPassword(epassword);
                    return iUserRepository.changePassword(credentials, id);
                } else {
                    throw new UserException("Podaj poprawny adres e-mail!");
                }

            } catch (Exception e) {
                throw new UserException("Złe dane!");
            }
        } else {
            System.out.println("Hasła nie są takie same!");
            throw new UserException("Hasła nie są takie same!");
        }
    }

    public User verifyPassword(User users, LoginInfo info) {
        if((users.isVerified() == true)) {
            if(encoder.matches(info.getPassword(), users.getPassword())) {
                System.out.println("token: " + generator.jwtToken(users.getUserId()));
                return users;
            } else {
                throw new UserException("Złe hasło!");
            }
        } else {
            System.out.println("weryfikacja");
            throw new UserException("Weryfikuj email id");
        }
    }

    @Transactional
    @Override
    public String getUserInfo(String token) {
        long id = generator.parseJWT(token);
        User userinfo = userRepository.findById(id)
                .orElseThrow(null);

        return userinfo.getRole();

    }
}
