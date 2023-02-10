package com.example.backend.repo.implementation;


import com.example.backend.entity.User;
import com.example.backend.repo.IUserRepository;
import com.example.backend.request.ChangePassword;
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

    @Override
    public boolean verify(Long id) {
        Session session = entityManager.unwrap(Session.class);
        Query q = session.createQuery("update User set is_verified=:p" + " " + " " + "where id=:i");
        q.setParameter("p", true);
        q.setParameter("i", id);

        int status = q.executeUpdate();
        if (status > 0) {
            return true;
        } else {
            return false;
        }

    }

    @Override
    public boolean changePassword(ChangePassword information, Long id) {
        Session session = entityManager.unwrap(Session.class);
        Query q = session.createQuery("update User set password=:p" + " " + " " + "where id=:i");
        q.setParameter("p", information.getConfirmPassword());
        q.setParameter("i", id);

        int status = q.executeUpdate();
        if (status > 0) {
            return true;
        } else {
            return false;
        }
    }


}
