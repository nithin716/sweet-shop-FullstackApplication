package com.nithin.user.entity;

public class User {

    private String email;
    private String password;
    private String role;

    public User(String email, String password, String role) {
        if (email == null) {
            throw new IllegalArgumentException("Email cannot be null");
        }
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
