package com.example.backend.implementation;

import com.example.backend.dto.BasketDTO;
import com.example.backend.entity.Amount;
import com.example.backend.entity.BasketProduct;
import com.example.backend.entity.Book;
import com.example.backend.entity.User;
import com.example.backend.exception.UserException;
import com.example.backend.repo.UserRepository;
import com.example.backend.repo.implementation.AmountRepository;
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

    @Autowired
    private AmountRepository amountRepository;

    public User booksInBasket(Book book, User user) {
        long amount = 1;
        BasketProduct product = new BasketProduct();
        Amount AmountsOfBooks = new Amount();
        ArrayList<Book> booklist = new ArrayList<>();
        booklist.add(book);
        product.setCreatedAt(LocalDateTime.now());
        product.setBooksList(booklist);
        ArrayList<Amount> amountDetails = new ArrayList<Amount>();
        AmountsOfBooks.setBooksAmount(amount);
        AmountsOfBooks.setTotalCost(book.getCost());
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
                    throw new UserException("Książka już jest w koszyku!");
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

    @Transactional
    @Override
    public BasketProduct minusBook(String token, Long bookId, BasketDTO bookAmount) {
        Long id = generator.parseJWT(token);
        Long amountId = bookAmount.getAmountId();
        Long amount = bookAmount.getAmountOfBook();

        User user = userRepository.findById(id).get();
        if (user != null) {
            Book book = bookImplementation.findById(bookId).get();
            if(user != null) {
                double totalCost = book.getCost() * (amount - 1);
                boolean notExist = false;
                for (BasketProduct prod: user.getBooksInBasket()) {
                    if(!prod.getBooksList().isEmpty()) {
                        notExist = prod.getBooksList().stream().noneMatch(books -> books.getBookId().equals(bookId));
                        if(!notExist) {
                            Amount amountDetails = amountRepository.findById(amountId).orElseThrow(null);
                            amountDetails.setBooksAmount(amount - 1);
                            amountDetails.setTotalCost(totalCost);
                            Long ile = amountDetails.getBooksAmount();
                            int i = ile.intValue();
                            if(i>=0) {
                                if (i==0) {
                                    deleteBook(token, bookId);
                                }
                                amountRepository.save(amountDetails);
                                return prod;
                            }
                            throw new UserException("Zła ilość.");
                        }
                    }
                }
            }
        }
        return null;
    }

    @Transactional
    @Override
    public boolean deleteBook(String token, Long bookId) {
        Long id = generator.parseJWT(token);
        User user = userRepository.findById(id).get();
        if (user != null) {
            Book book = bookImplementation.findById(bookId).get();
            if (book != null) {
                Optional<Amount> amount = amountRepository.findById(id);
                for (BasketProduct prod : user.getBooksInBasket()) {
                    boolean exitsBookInCart = prod.getBooksList().stream()
                            .noneMatch(books -> books.getBookId().equals(bookId));
                    if (!exitsBookInCart) {
                        userRepository.save(user);
                        prod.getBooksAmount().remove(amount);
                        prod.getBooksList().remove(book);
                        prod.getBooksAmount().clear();
                        boolean users = userRepository.save(user).getBooksInBasket() != null ? true : false;
                        if (user != null) {
                            return users;
                        }
                    }

                }
            }
        }
        return false;
    }

    @Transactional
    @Override
    public BasketProduct plusBook(String token, Long bookId, BasketDTO bookAmount) {
        Long id = generator.parseJWT(token);

        Long amountId = bookAmount.getAmountId();
        Long amount = bookAmount.getAmountOfBook();
        User user = userRepository.findById(id).get();
        if(user != null) {
            Book book = bookImplementation.findById(bookId).get();
            if(book != null) {
                double totalCost = book.getCost() * (amount + 1);
                boolean notExist = false;
                for (BasketProduct prod : user.getBooksInBasket()) {
                    if (!prod.getBooksList().isEmpty()) {
                        notExist = prod.getBooksList().stream().noneMatch(books -> books.getBookId().equals(bookId));

                        if(!notExist) {
                            Amount amountDetails = amountRepository.findById(amountId).orElseThrow(null);
                            amountDetails.setBooksAmount(amount + 1);
                            amountDetails.setTotalCost(totalCost);
                            if (amountDetails.getBooksAmount()<= book.getQuantityOfBooks()) {
                                amountRepository.save(amountDetails);
                                return prod;
                            }
                            throw new UserException("Nie ma wystarczającej ilości książek");
                        }
                    }
                }
            }
        }
        return null;
    }

}
