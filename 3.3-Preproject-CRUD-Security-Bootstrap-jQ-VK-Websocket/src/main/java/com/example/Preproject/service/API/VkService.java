package com.example.Preproject.service.API;

import org.springframework.http.ResponseEntity;

public interface VkService {
    //TODO Из ВК
    ResponseEntity<String> sendCommentToVK(String message);
    ResponseEntity<String> getCommentsFromVK();
    ResponseEntity<String> editCommentFromVK(String commentId, String message);
    ResponseEntity<String> deleteCommentFromVK(String commentId);
}
