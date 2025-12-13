package com.nithin.auth.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.nithin.user.entity.User;
import com.nithin.user.repository.UserRepository;
import com.nithin.user.service.AuthService;


@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void shouldFailWhenEmailAlreadyExists() {
        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(mock(User.class)));

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> authService.register("test@gmail.com", "password")
        );

        assertEquals("Email already registered", exception.getMessage());
    }

    @Test
    void shouldRegisterUserWithEncodedPasswordAndUserRole() {
        when(userRepository.findByEmail("new@gmail.com"))
                .thenReturn(Optional.empty());

        when(passwordEncoder.encode("password"))
                .thenReturn("encodedPassword");

        User savedUser = authService.register("new@gmail.com", "password");

        assertEquals("new@gmail.com", savedUser.getEmail());
        assertEquals("encodedPassword", savedUser.getPassword());
        assertEquals("USER", savedUser.getRole());
    }
}
