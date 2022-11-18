package com.example.backend.implementation;

import com.example.backend.entity.Amount;
import com.example.backend.entity.BasketProduct;
import com.example.backend.entity.Book;
import com.example.backend.entity.User;
import com.example.backend.exception.UserException;
import com.example.backend.repo.UserRepository;
import com.example.backend.repo.implementation.BookImplementation;
import com.example.backend.service.BasketService;
import com.example.backend.util.JwtGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class BasketServiceImplementation implements BasketService {

    @Autowired
    private JwtGenerator generator;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookImplementation bookImplementation;

    public User booksInBasket(Book book, User user) {
        long amount = 1;
        BasketProduct product = new BasketProduct();
        Amount AmountsOfBooks = new Amount();
        ArrayList<Book> booklist = new ArrayList<>();
        booklist.add(book);
        product.setCreatedAt(LocalDateTime.now());
        product.setBooksList(booklist);
        ArrayList<Amount> amountDetails = new ArrayList<Amount>();
        AmountsOfBooks.setbooksAmount(amount);
        AmountsOfBooks.setCost(book.getCost());
        amountDetails.add(AmountsOfBooks);
        product.setBooksAmount(amountDetails);
        user.getBooksInBasket().add(product);
        return user;
    }

    @Transactional
    @Override
    public List<BasketProduct> addBookToBasket(String token, long bookId) {

        Long userId = generator.parseJWT(token);

        User user = userRepository.findById(userId).orElse(null);

        Book book = bookImplementation.findById(bookId).get();
        if(book != null) {
            Long i = book.getQuantityOfBooks();
            int j = i.intValue();
            if(i>0) {
                List<Book> books = null;
                for (BasketProduct d : user.getBooksInBasket()) {
                    books = d.getBooksList();
                }

                if (books == null) {
                    User userDesc = this.booksInBasket(book, user);
                    return userRepository.save(userDesc).getBooksInBasket();
                }
                Optional<Book> bookInBasket = books.stream().filter(t -> t.getBookId() == bookId).findFirst();
                if (bookInBasket.isPresent()) {
                    throw null;
                } else {
                    User userDesc = this.booksInBasket(book, user);
                    return userRepository.save(userDesc).getBooksInBasket();
                }
            }
            throw new UserException("Brak książek");
        }
        return null;
    }

    @Override
    public List<BasketProduct> getBooksFromBasket(String token) {
        Long id = (long) generator.parseJWT(token);
        User user = userRepository.findById(id).get();
        if (user != null) {
            List<BasketProduct> basketProduct = new ArrayList<>();
            for (BasketProduct bookInBasket : user.getBooksInBasket()) {
                if (!(bookInBasket.getBooksList().isEmpty())) {
                    basketProduct.add(bookInBasket);
                }
            }
            return basketProduct;
        }

        return null;
    }

    @Override
    public int getBookSumUp(String token) {
        Long id = generator.parseJWT(token);
        int counterBooks = 0;
        User user = userRepository.findById(id).get();
        if(user != null) {
            List<BasketProduct> basketProducts = user.getBooksInBasket();
            for (BasketProduct prod: basketProducts) {
                if (!prod.getBooksList().isEmpty()) {
                    counterBooks = counterBooks + 1;
                }
            }
            return counterBooks;
        }
        return 0;
    }

}
