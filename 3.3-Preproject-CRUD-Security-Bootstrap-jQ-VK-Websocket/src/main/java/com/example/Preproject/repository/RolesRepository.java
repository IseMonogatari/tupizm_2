package com.example.Preproject.repository;



import com.example.Preproject.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends JpaRepository<Role, Integer> {
    Role findByRole(String role);
}
