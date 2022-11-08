package com.example.backend.repo.implementation;

import org.hibernate.Session;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import com.example.backend.entity.Book;
import org.springframework.stereotype.Repository;

@Repository
public class IBookImple implements IBook{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Book save(Book bookinformation) {
        Session session = entityManager.unwrap(Session.class);
        session.saveOrUpdate(bookinformation);
        return bookinformation;
    }

    @Override
    public List<Book> getUsers() {
        Session currentSession = entityManager.unwrap(Session.class);
        List BookList = currentSession.createQuery("from Book").getResultList();
        return BookList;
    }
}
