package com.example.backend.implementation;

import com.example.backend.exception.UserException;
import com.example.backend.repo.*;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import com.example.backend.request.LoginInfo;
import com.example.backend.service.UserServices;
import com.example.backend.util.JwtGenerator;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
