package com.example.backend.repo.implementation;


import com.example.backend.entity.User;
import com.example.backend.repo.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import org.hibernate.Session;

import javax.persistence.EntityManager;

import org.hibernate.query.Query;

import java.util.List;


@Repository
public class UserRepositoryImplementation implements IUserRepository {

    @Autowired
    private EntityManager entityManager;

    @Override
    public User save(User users) {
        Session session = entityManager.unwrap(Session.class);
        session.saveOrUpdate(users);
        return users;
    }

    @Override
    public User getUser(String email) {
        Session session = entityManager.unwrap(Session.class);
        @SuppressWarnings("rawtypes")
        Query q = session.createQuery(" FROM User where email=:email");
        q.setParameter("email", email);
        return (User) q.uniqueResult();
    }
    @Override
    public List<User> getUser() {
        Session currentsession = entityManager.unwrap(Session.class);
        List<User> usersList = currentsession.createQuery("from User").getResultList();
        return  usersList;
    }

    @Override
    public User getUserById(Long userId) {
        Session session = entityManager.unwrap(Session.class);
        Query query = session.createQuery("FROM User where userId=:userId");
        query.setParameter("userId", userId);
        return (User) query.uniqueResult();

    }


}
