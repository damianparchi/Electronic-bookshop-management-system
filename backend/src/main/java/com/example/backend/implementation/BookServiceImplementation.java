package com.example.backend.implementation;

import com.example.backend.dto.BookDto;
import com.example.backend.dto.BookEditDTO;
import com.example.backend.dto.RateDTO;
import com.example.backend.entity.Rate;
import com.example.backend.entity.User;
import com.example.backend.entity.Book;
import com.example.backend.exception.BookisExisting;
import com.example.backend.repo.implementation.RateRepository;
import com.example.backend.service.IBookService;
import com.example.backend.repo.implementation.BookImplementation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.util.JwtGenerator;
import com.example.backend.repo.IUserRepository;
import com.example.backend.exception.UserException;

import java.util.List;
import java.util.Optional;

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

    @Autowired
    RateRepository rateRepository;

    @Transactional
    @Override
    public boolean addBooks(String bookCover,BookDto information,String token)
    {
        Long id;

        id = generator.parseJWT(token);
        User userInfo = iUserRepository.getUserById(id);
        if(userInfo != null)
        {
            String userRole = userInfo.getRole();
            System.out.println("Aktualna rola: " + userRole);
            if (userRole.equals("seller") || (userRole.equals("admin")))
            {
                Book book=bookImplementation.fetchbyBookName(information.getBookName());
                System.out.println("Książka: "+information.getBookName());
                if(book == null)
                {
                    bookinfo = modelMapper.map(information, Book.class);
                    bookinfo.setUserId(id);
                    bookinfo.setBookName(information.getBookName());
                    bookinfo.setAuthor(information.getAuthor());
                    bookinfo.setStatus("W oczekiwaniu...");
                    bookinfo.setBookCover(bookCover);
                    bookinfo.setCost(information.getCost());
                    bookinfo.setQuantityOfBooks(information.getQuantityOfBooks());
                    bookImplementation.save(bookinfo);
                    return true;
                }
                else
                {
                    throw new BookisExisting("Książka już istnieje");
                }
            }
            else
            {
                throw new UserException("Konto nie posiada roli sprzedawcy");
            }

        } else {
            throw new UserException("User nie istnieje");
        }

    }

    @Transactional
    @Override
    public boolean deleteBook(long bookId, String token) {
        long userId = generator.parseJWT(token);
        User userInfo = iUserRepository.getUserById(userId);
        if (userInfo != null) {
            String userRole = userInfo.getRole();

            if (userRole.equals("seller") || (userRole.equals("admin")) ) {
                Book info = bookImplementation.fetchbyId(bookId);
                if (info != null) {
                    bookImplementation.deleteByBookId(bookId);
//                    bookImplementation.deleteByBookIdd(bookId);
//                    bookImplementation.deleteByBookIddd(bookId);
                    return true;
                }
            } else {
                throw new UserException("Twoje konto nie posiada roli sprzedawcy lub admina!");
            }
        } else {
            throw new UserException("User nie istnieje");
        }

        return false;
    }

    @Override

    public boolean editBook(long bookId, BookEditDTO information, String token) {

        long userId = generator.parseJWT(token);
        User userInfo = iUserRepository.getUserById(userId);
        if(userInfo != null)
        {
            String userRole = userInfo.getRole();
            String fetchRole = userRole;

            if (fetchRole.equals("seller") || (fetchRole.equals("admin")))
            {
                Book info = bookImplementation.fetchbyId(bookId);
                if(info!=null)
                {
                    info.setBookId(bookId);
                    info.setBookName(information.getBookName());
                    info.setQuantityOfBooks(information.getQuantityOfBooks());
                    info.setCost(information.getCost());
                    info.setAuthor(information.getAuthor());
                    info.setBookDesc(information.getBookDesc());

                    bookImplementation.save(info);
                    return true;
                }
            }
            else
            {
                throw new UserException("Twoje konto nie posiada roli sprzedawcy lub admina!");
            }
        }
        else {
            throw new UserException("User nie istnieje");
        }

        return false;
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
            throw new UserException("User nie istnieje");
        }

    }

    @Override
    public List<Book> getAllConfirmedBooks() {
        List<Book> approvedBooks = bookImplementation.getAllConfirmedBooks();
        return approvedBooks;
    }


    @Override
    public Page<Book> getBookConfirm(Optional<String> searchByBookName, Optional<Integer> page, Optional<String> sortBy, Optional<String> order) {
        if (order.equals(Optional.ofNullable("asc"))) {
            return bookImplementation.findByBookName(searchByBookName.orElse("_"),
                    PageRequest.of(page.orElse(0), 10, Sort.Direction.ASC, sortBy.orElse("book_id")));
        } else {
            return bookImplementation.findByBookName(searchByBookName.orElse("_"),
                    PageRequest.of(page.orElse(0), 10, Sort.Direction.DESC, sortBy.orElse("book_id")));
        }
    }

    @Override
    @Transactional
    public boolean editBookStatus(long bookId, String status, String token) {
        long userId = generator.parseJWT(token);

        User user = iUserRepository.getUserById(userId);
        if(user != null) {
            Book info = bookImplementation.fetchbyId(bookId);
            if(info != null) {
                bookImplementation.updateBookStatusByBookId(status, bookId);
                return true;
            }
        } else {
            throw new UserException("User nie istnieje!");
        }
        return false;
    }

    @Override
    public boolean rateBook(String token, RateDTO rateDTO, Long bookId) {
        Long userId = generator.parseJWT(token);
        User user = iUserRepository.getUserById(userId);
        Rate rate = rateRepository.getBookReview(bookId, user.getUsername());
        if(rate==null) {
            Rate rate1 = new Rate(rateDTO);
            rate1.setBookId(bookId);
            rate1.setRate(rateDTO.getRate());
            rate1.setComment(rateDTO.getComment());
            rate1.setUsername(user.getUsername());
            rateRepository.save(rate1);
            return true;

        } else {
            throw new UserException("Możesz ocenić i skomentować tylko raz!");
        }
//        return false;

    }

    @Override
    public List<Rate> getRate(Long bookId) {
        return rateRepository.getreviews(bookId);
    }

    @Override
    public double averageRate(long bookId) {
        double ocena=0.0;
        try {
            ocena = bookImplementation.averageRate(bookId);
            System.out.println("rate getted:"+ocena);
        }catch(Exception e)
        {
            System.out.println("No rating");
        }
        return ocena;
    }

    @Override
    public Book getBookbyId(Long bookId) {
        Book book = bookImplementation.fetchbyId(bookId);
        if (book != null) {
            return book;
        }
        return null;
    }

    @Override
    public List<Rate> getRatingsOfBook() {
        return rateRepository.getreviewss();
    }

    @Override
    public double averageRateOfAll() {
        double ocena=0.0;

        try {
            ocena = bookImplementation.averageRatee();
            System.out.println("rate getted:"+ocena);
        }catch(Exception e)
        {
            System.out.println("No rating");
        }
        return ocena;
    }

    @Override
    public List<Book> getBookConfirmm() {
        List<Book> approvedBooks = bookImplementation.getAllConfirmedBooks();
        return approvedBooks;
    }

    @Override
    public List<Rate> getRatingssOfBook(Long bookId) {
        return rateRepository.getreviews(bookId);
    }
}
