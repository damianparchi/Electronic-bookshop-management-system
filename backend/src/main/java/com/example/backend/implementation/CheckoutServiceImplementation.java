package com.example.backend.implementation;

import com.example.backend.entity.*;
import com.example.backend.exception.UserException;
import com.example.backend.repo.IUserRepository;
import com.example.backend.repo.UserRepository;
import com.example.backend.repo.implementation.BookImplementation;
import com.example.backend.repo.implementation.CheckoutRepository;
import com.example.backend.response.EmailCheckout;
import com.example.backend.service.BasketService;
import com.example.backend.service.ICheckoutService;
import com.example.backend.util.EmailDeliverService;
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
public class CheckoutServiceImplementation implements ICheckoutService {
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

    @Autowired
    private IUserRepository iUserRepository;

    @Autowired
    EmailCheckout emailCheckout;

    @Autowired
    private EmailDeliverService emailDeliverService;

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
            log.info("ksiazka z koszyka: " + basketprod);

            List<Book> userBasketBooks = null;
            for (BasketProduct userBasket : basketprod) {
                log.info("user z koszyka: " + userBasket);
                userBasketBooks = userBasket.getBooksList();
                for (Book book : userBasketBooks) {
                    log.info("bookid: " + book);
                    if (book.getBookId().equals(bookId)) {
                        long checkoutId;
                        for (Amount bookamount : userBasket.getBooksAmount()) {
                            log.info("ilosc: " + bookamount);
                            Long amountOfBooks = book.getQuantityOfBooks() - bookamount.getBooksAmount();
                            book.setQuantityOfBooks(amountOfBooks);
                            Book book1 = bookImplementation.save(book);
                            try {
                                list.add(book1);
                                checkoutId = random.nextInt(10000);
                                if (checkoutId < 0) {
                                    checkoutId = checkoutId * -1;
                                }
                                double totalcost = book.getCost() * (bookamount.getBooksAmount());
                                checkout.setInTotalCost(totalcost);
                                amounts.add(bookamount);
                                checkout.setCheckoutId(checkoutId);
                                checkout.setAmountOfBooks(amounts);
                                checkout.setCheckoutTime(LocalDateTime.now());
                                checkout.setCheckoutStatus("W oczekiwaniu na przyjęcie...");
                                checkout.setUserdataId(userdataId);
                                checkout.setBooksList(list);
                                desc.add("Nr zamówienia: " + checkoutId + "<br>"
                                        + "Tytuł: " + book.getBookName() + "<br>"
                                        + "Ilość: " + bookamount.getBooksAmount() + "<br>"
                                        + "Całość do zapłaty: " + bookamount.getTotalCost());
                            } catch (Exception e) {
                                throw new UserException("płatność niepowiodła się");
                            }
                        }
                    }
                }
            }
            user.getCheckoutBooksDesc().add(checkout);
            String data = "";
            for (String dt : desc) {
                data = data + dt + " <br>";
                log.info("\n " + dt);
            }

            Book book = bookImplementation.findById(bookId).orElse(null);

//                    "<!DOCTYPE html>"+
//"<html lang"+"=\"+'" +'pl'>+'<head>'+
//    <meta charset="UTF-8">
//    <meta http-equiv="X-UA-Compatible" content="IE=edge">
//    <meta name="viewport" content="width=device-width, initial-scale=1.0">
//    <title>Document</title>
//</head>
//<body>
//
//</body>
//</html>"

            String message = "<html lang='pl'>"+"<head> <meta charset=\"utf-8\"> </head>" +
                            "<body  style=\"background-color:#C4C4C4; display: column; margin:auto; text-aling:center;\">\n" +
                    "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"+ "<tr>" + "<td style=\"text-align: center;\">" +
                    "<div style=\"display: column; margin:auto; text-aling:center; font-size: 32px; background-color: #403f3f; color: #fff; width: 100%;\" >\n " + "Księgarnia"  + "</div>\n" +
                            "<br>" +"Witaj, " + user.getUsername() +"!"+ " <br>" + "Twoje zamówienie zostało złożone.<br>Sprawdzaj status swojej przesyłki na naszej stronie internetowej w zakładce <b>Historia zamówień.</b>"+
            " <br><br>" + "<b>Szczegóły zamówienia:</b> <br>" + " \n" + data + "\n"
                    + "Oceń książkę wchodząc w link poniżej:<br>" + "\n"
                    + "http://localhost:4200/books/info/" + book.getBookId()+ "<br><br></div>"
                    +"</td>" + " </tr> " +  "</table>"

                    + "</body>"
                    + " </html>";

            emailCheckout.setEmail(user.getEmail());
            emailCheckout.setTemat("Twoje zamówienie zostało złożone!");
            emailCheckout.setMessage(message);
            emailDeliverService.sendMail(emailCheckout.getEmail(), emailCheckout.getTemat(), emailCheckout.getMessage());

            System.out.println("emailData.getEmail() " + emailCheckout.getEmail());
            System.out.println("emailData.getSubject() " + emailCheckout.getTemat());
            System.out.println("emailData.getBody() " + emailCheckout.getMessage());
            emailDeliverService.sendMail(emailCheckout.getEmail(), emailCheckout.getTemat(), emailCheckout.getMessage());

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
    public boolean deleteOrderFromHistory(long checkoutId, String token) {
        long userId = generator.parseJWT(token);
        User userInfo = iUserRepository.getUserById(userId);
        if (userInfo != null) {
            String userRole = userInfo.getRole();
            if (userRole.equals("seller") || userRole.equals("admin") || userRole.equals("user")) {
                Checkout info = checkoutRepository.getOne(checkoutId);
                if (info != null) {
                    checkoutRepository.deleteByCheckoutId(checkoutId);
                    checkoutRepository.deleteeByCheckoutId(checkoutId);
                    return true;
                }
            } else {
                throw new UserException("Twoje konto nie posiada roli sprzedawcy lub admina lub usera!");
            }
        } else {
            throw new UserException("User nie istnieje");
        }
        return false;
    }

    @Transactional
    @Override
    public List<Checkout> getCheckoutList(String token) {
        long id = generator.parseJWT(token);
        User userdetails = userRepository.findById(id)
                .orElseThrow(null);

        return userdetails.getCheckoutBooksDesc();

    }

    @Transactional
    @Override
    public int updateCheckoutStatus(String status, long checkoutId) {
        int changedCheckoutStatus = checkoutRepository.CheckoutStatusDefault(status, checkoutId);
        System.out.println(changedCheckoutStatus);
        return changedCheckoutStatus;
    }

    @Override
    public List<Checkout> getallCheckouts() {
        List<Checkout> checkoutIds = checkoutRepository.getCheckout();
        return checkoutIds;
    }


}
