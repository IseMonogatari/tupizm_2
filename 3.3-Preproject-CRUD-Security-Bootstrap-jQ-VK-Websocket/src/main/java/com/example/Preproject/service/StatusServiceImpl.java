package com.example.Preproject.service;

import com.example.Preproject.model.Status;
import com.example.Preproject.model.User;
import com.example.Preproject.repository.StatusRepository;
import com.example.Preproject.repository.UsersRepository;
import com.example.Preproject.service.API.VkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatusServiceImpl implements StatusService {

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private UsersRepository usersRepository;


    @Autowired
    private VkService vkService;

    @Override
    public void postCommentAdnChangeStatus(Integer userId, boolean status) {
        vkService.sendCommentToVK("Я, " + userId +
                ", хочу стать администратором Вашего сайта.");
        saveStatus(userId, status);
    }

    @Override
    public List<User> getUsersByStatus() {
        return statusRepository.findUserIdsByStatus(true)
                .stream()
                .map(userId -> usersRepository.findUserById(userId))
                .collect(Collectors.toList());
    }

    @Override
    public void saveStatus(Integer userId, boolean status) {
        statusRepository.save(new Status(status, userId));
    }

    @Override
    public void editStatus(Integer userId, boolean status) {
        Status editStatus = statusRepository.findStatusByUserId(userId);
        editStatus.setStatus(status);
        statusRepository.save(editStatus);
    }


    @Override
    public boolean getUserStatus(Integer userId) {
        Status status = statusRepository.findStatusByUserId(userId);
        if (status != null) {
            return status.isStatus();
        }
        return false;
    }


}
