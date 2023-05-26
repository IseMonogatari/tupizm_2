package com.example.Preproject.service;


import com.example.Preproject.dto.RoleDTO;
import com.example.Preproject.model.Role;

public interface RoleService {
    Role save(RoleDTO roleDTO);
    Role userRole();

    Role getRoleByName(String role);
}
