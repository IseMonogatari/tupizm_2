package com.example.Preproject.repository;


import com.example.Preproject.model.Status;
import com.example.Preproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepository extends JpaRepository<Status, Integer> {
    Status findStatusById(Integer id);
    List<Status> findStatusByStatus(boolean status);
    Status findStatusByUserId(Integer userId);
    @Query(value = "SELECT user_id FROM status WHERE status = ?1", nativeQuery = true)
    List<Integer> findUserIdsByStatus(boolean status);
}
