package com.example.Preproject.controller;

import com.example.Preproject.dto.UserDTO;
import com.example.Preproject.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/registration")
@AllArgsConstructor
public class UserRegistrationController {

    @Autowired
    private UserService userService;

    //сохраняем данные из 46 строчки в registration
    @ModelAttribute("user")
    public UserDTO userRegistrationDTO() {
        return new UserDTO();
    }

    @GetMapping
    public String showRegistrationForm() {
        return "registration";
    }

    @PostMapping
    public String registerUserAccount(@ModelAttribute("user") UserDTO userRegistrationDTO) {
        if (userService.save(userRegistrationDTO) == null) {
            return "redirect:/registration?mistake";
        }
        return "redirect:/registration?success";
    }
}
