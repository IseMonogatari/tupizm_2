package com.example.Preproject.service;



import com.example.Preproject.dto.UserDTO;
import com.example.Preproject.model.User;
import com.example.Preproject.repository.RolesRepository;
import com.example.Preproject.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RoleService roleService;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;



    @Override
    public User save(UserDTO userDTO) {
        User user = usersRepository.findByName(userDTO.getName());
        if (user != null && user.getRoles().contains(rolesRepository.findByRole("ROLE_ADMIN"))) {
            user.getRoles().add(roleService.getRoleByName(userDTO.getRole()));
        } else if (user != null && user.getRoles().contains(rolesRepository.findByRole("ROLE_USER"))) {
            return null;
        } else {
            user = new User();
            user.setLastName(userDTO.getLastName());
            user.setName(userDTO.getName());
            user.setEmail(userDTO.getEmail());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.setRoles(Collections.singleton(roleService.getRoleByName(userDTO.getRole())));
        }

        return usersRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = usersRepository.findByName(username);
        if (user == null) {
            throw new UsernameNotFoundException("Неверный логин или пароль.");
        }
        return user;
    }

    public User findUserById(Integer id) {
        //TODO родной метод getById(id) делает ленивую загрузку,
        // поэтому и выдавало ошибку выгрузки пользователя.
        // Нужно реализовать свой собственный метод получения пользоватебя из БД -- findUserById(id).
        return usersRepository.findUserById(id);
    }

    public List<User> allUsers() {
        return usersRepository.findAll();
    }

    public User update(UserDTO userDTO) {
        User updatedUser = findUserById(Integer.valueOf(userDTO.getId()));
        updatedUser = checkRoleData(updatedUser, userDTO, "ROLE_ADMIN", "ROLE_USER");
        if (updatedUser == null) {
            return null;
        }
        return usersRepository.save(updatedUser);
    }

    private User checkRoleData(User user, UserDTO userDTO, String fistRole, String secondRole) {
        if (user.getRoles().contains(rolesRepository.findByRole(fistRole))) {
            user.setLastName(userDTO.getLastName());
            user.setName(userDTO.getName());
            user.setEmail(userDTO.getEmail());
            checkChangePassword(user, userDTO);
            checkEqualRole(user, userDTO, fistRole);
        } else if (equalsUserDataWithoutRole(user, userDTO)) {  //условие для добавления роли АДМИН через кнопку
            user.getRoles().add(rolesRepository.findByRole(userDTO.getRole()));
        } else if (user.getRoles().contains(rolesRepository.findByRole(secondRole))
                && (checkEqualRole(user, userDTO, fistRole) == null)) {
            return null;
        } else {
            user.setLastName(userDTO.getLastName());
            user.setName(userDTO.getName());
            user.setEmail(userDTO.getEmail());
            checkChangePassword(user, userDTO);
        }
        return user;
    }

    private void checkChangePassword(User user, UserDTO userDTO) {
        if (!userDTO.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
    }

    private User checkEqualRole(User user, UserDTO userDTO, String ROLE) {
        if (!Objects.equals(userDTO.getRole(), ROLE)) {
            user.getRoles().add(rolesRepository.findByRole(userDTO.getRole()));
            return user;
        }
        return null;
    }

    private boolean equalsUserDataWithoutRole(User user, UserDTO userDTO) {
        return userDTO.toStringWithoutPassAndRole().equals(user.toStringWithoutPassAndRole())
                && userDTO.getPassword() == null;
    }

    public boolean deleteUser(Integer id) {
        if (usersRepository.findById(id).isPresent()) {
            usersRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
