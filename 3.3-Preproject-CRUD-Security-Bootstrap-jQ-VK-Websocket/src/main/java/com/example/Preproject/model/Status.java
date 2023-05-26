package com.example.Preproject.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="status")
@Getter
@Setter
@NoArgsConstructor
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    @Column(name = "status")
    private boolean status;
    @Column(name = "user_id")
    private Integer userId;

    public Status(boolean status, Integer userId) {
        this.status = status;
        this.userId = userId;
    }

    public Status(boolean status) {
        this.status = status;
    }
}
