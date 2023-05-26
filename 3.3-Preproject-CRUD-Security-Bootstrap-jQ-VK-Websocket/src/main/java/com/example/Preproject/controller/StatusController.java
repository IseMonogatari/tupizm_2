package com.example.Preproject.controller;

import com.example.Preproject.model.User;
import com.example.Preproject.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StatusController {

    @Autowired
    private StatusService statusService;

    @PostMapping("/post_I_WANT_TO_BE_A_ADMIN")
    public ResponseEntity<String> changeStatusToTrueAndPostCommentInVK(@RequestParam("user_id") Integer userId,
                                                                       @RequestParam("status") boolean status) {
        statusService.postCommentAdnChangeStatus(userId, status);
        return new ResponseEntity<>("Выполнили POST запрос.", HttpStatus.OK);
    }

    @GetMapping("/get_users_which_WANT_TO_BE_A_ADMIN")
    public List<User> getUserWhichWantToBeAAdmin() {
        return statusService.getUsersByStatus();
    }

    @PostMapping("/edit_user_status")
    public ResponseEntity<String> changeUserStatus(@RequestParam("user_id") Integer userId,
                                                   @RequestParam("status") boolean status) {
        statusService.editStatus(userId, status);
        return new ResponseEntity<>("Статус пользователя с ID = " +
                userId + " был успешно изменён на " +
                status + ".", HttpStatus.OK);
    }

    @GetMapping("/get_user_status")
    public boolean getUserStatus(@RequestParam("user_id") Integer userId) {
        return statusService.getUserStatus(userId);
    }
}
