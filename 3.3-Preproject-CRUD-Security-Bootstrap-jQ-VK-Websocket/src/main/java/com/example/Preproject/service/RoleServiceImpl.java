package com.example.Preproject.service;



import com.example.Preproject.dto.RoleDTO;
import com.example.Preproject.model.Role;
import com.example.Preproject.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RolesRepository roleRepository;
    Role adminRole = new Role("ROLE_ADMIN");
    Role userRole = new Role("ROLE_USER");

    @Override
    public Role save(RoleDTO roleDTO) {
        return roleRepository.save(new Role("ROLE_" + roleDTO.getRole()));
    }

    @Override
    public Role userRole() {
        return userRole;
    }

    @Override
    public Role getRoleByName(String role) {
        return roleRepository.findByRole(role);
    }


}
