package com.example.backend.implementation;

import com.example.backend.entity.*;
import com.example.backend.exception.UserException;
import com.example.backend.repo.UserRepository;
import com.example.backend.repo.implementation.BookImplementation;
import com.example.backend.repo.implementation.CheckoutRepository;
import com.example.backend.service.BasketService;
import com.example.backend.service.CheckoutService;
import com.example.backend.util.JwtGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Slf4j
public class CheckoutServiceImplementation implements CheckoutService {
    @Autowired
    private BasketService basketService;
    @Autowired
    private JwtGenerator generator;

    @Autowired
    private BookImplementation bookImplementation;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private UserRepository userRepository;
    @Override
    public Checkout checkout(String token, Long bookId, Long userdataId) {
        Long id = generator.parseJWT(token);
        User user = userRepository.findById(id).get();
        if (user != null) {
            Checkout checkout = new Checkout();
            Random random = new Random();
            ArrayList<Book> list = new ArrayList<>();
            ArrayList<Amount> amounts = new ArrayList<>();
            ArrayList<String> desc = new ArrayList<>();

            List<BasketProduct> basketprod = user.getBooksInBasket();
            log.info("ksiazka z koszyka: "+basketprod);

            List<Book> userBasketBooks = null;
            for(BasketProduct userBasket : basketprod) {
                log.info("user z koszyka: "+userBasket);
                userBasketBooks = userBasket.getBooksList();
                for(Book book : userBasketBooks) {
                    log.info("bookid: "+book);
                    if(book.getBookId().equals(bookId)) {
                        long checkoutId;
                        for(Amount bookamount:userBasket.getBooksAmount()) {
                            log.info("ilosc: "+bookamount);
                            Long amountOfBooks = book.getQuantityOfBooks() - bookamount.getBooksAmount();
                            book.setQuantityOfBooks(amountOfBooks);
                            Book book1 = bookImplementation.save(book);
                            try {
                                list.add(book1);
                                checkoutId = random.nextInt(10000);
                                if(checkoutId<0) {
                                    checkoutId = checkoutId * -1;
                                }
                                double totalcost = book.getCost() * (bookamount.getBooksAmount());
                                checkout.setInTotalCost(totalcost);
                                amounts.add(bookamount);
                                checkout.setCheckoutId(checkoutId);
                                checkout.setAmountOfBooks(amounts);
                                checkout.setCheckoutTime(LocalDateTime.now());
                                checkout.setCheckoutStatus("W oczekiwaniu...");
                                checkout.setUserdataId(userdataId);
                                checkout.setBooksList(list);
                                desc.add("Nr zamówienia:" + checkoutId + "\n"
                                        + "Tytuł:" + book.getBookName() + "\n"
                                        + "Ilość:" + bookamount.getBooksAmount() + "\n"
                                        + "Całość do zapłaty:" + bookamount.getTotalCost());
                            } catch (Exception e) {
                                throw new UserException("płatność niepowiodła się");
                            }
                        }
                    }
                }
            }
            user.getCheckoutBooksDesc().add(checkout);
            String data = "";
            for(String dt:desc) {
                data=data+dt;
                log.info("\n "+dt);
            }

            if (basketService.deleteBook(token, bookId)) {
                userRepository.save(user);
                return checkout;
            }
        }
        throw new UserException("brak uzytkownika");
    }

    public List<Checkout> getCheckouts() {

        List<Checkout> checkoutIds = checkoutRepository.getCheckout();
        return checkoutIds;
    }

    @Transactional
    @Override
    public List<Checkout> getOrderList(String token) {
        long id = generator.parseJWT(token);
        User userdetails = userRepository.findById(id)
                .orElseThrow(null);

        return userdetails.getCheckoutBooksDesc();

    }


}
