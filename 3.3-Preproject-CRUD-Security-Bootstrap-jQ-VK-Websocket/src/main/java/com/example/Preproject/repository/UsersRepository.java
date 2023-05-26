package com.example.Preproject.repository;



import com.example.Preproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<User, Integer> {
    User findByName(String name);
    User findUserById(Integer id);
}
