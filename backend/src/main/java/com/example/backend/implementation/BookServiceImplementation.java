package com.example.backend.implementation;

import com.example.backend.dto.BookDto;
import com.example.backend.entity.User;
import com.example.backend.entity.Book;
import com.example.backend.exception.BookisExisting;
import com.example.backend.service.IBookService;
import com.example.backend.repo.implementation.BookImplementation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.util.JwtGenerator;
import com.example.backend.repo.IUserRepository;
import com.example.backend.exception.UserException;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class BookServiceImplementation implements IBookService {

    private Book bookinfo = new Book();
    private ModelMapper modelMapper = new ModelMapper();
    @Autowired
    private JwtGenerator generator;

    @Autowired
    IUserRepository iUserRepository;

    @Autowired
    BookImplementation bookImplementation;

    @Transactional
    @Override
    public boolean addBooks(String imageName,BookDto information,String token)
    {
        Long id;

        id = (long) generator.parseJWT(token);
        User userInfo = iUserRepository.getUserById(id);
        if(userInfo != null)
        {
            String userRole = userInfo.getRole();
            System.out.println("actual Role is " + userRole);
            String fetchRole = userRole;
            if (fetchRole.equals("seller") )
            {
                Book book=bookImplementation.fetchbyBookName(information.getBookName());
                System.out.println("Book name "+information.getBookName());
                if(book ==null)
                {
                    bookinfo = modelMapper.map(information, Book.class);
                    bookinfo.setBookName(information.getBookName());
                    bookinfo.setAuthor(information.getAuthor());
                    bookinfo.setCost(information.getCost());
                    bookinfo.setImage(imageName);
                    //bookinfo.set("OnHold");
                    bookinfo.setQuantityOfBooks(information.getQuantityOfBooks());
                    //bookinfo.setCreatedDateAndTime(LocalDateTime.now());
                    bookinfo.setUserId(id);
                    bookImplementation.save(bookinfo);
                    return true;
                }
                else
                {
                    throw new BookisExisting("Book is already exist Exception..");
                }
            }
            else
            {
                throw new UserException("Your are not Authorized User");
            }

        } else {
            throw new UserException("User doesn't exist");
        }

    }

    @Transactional
    @Override
    public List<Book> getBookInfo(String token) {
        Long id;

        id = (long) generator.parseJWT(token);
        User userInfo = iUserRepository.getUserById(id);
        if (userInfo != null) {
            List<Book> books = bookImplementation.getAllBooks(id);
            return books;
        } else {
            throw new UserException("User doesn't exist");
        }

    }
}
