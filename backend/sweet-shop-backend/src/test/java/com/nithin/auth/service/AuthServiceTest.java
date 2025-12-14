package com.nithin.auth.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
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

        // ✅ VERY IMPORTANT: stub save()
        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        User savedUser = authService.register("new@gmail.com", "password");

        assertEquals("new@gmail.com", savedUser.getEmail());
        assertEquals("encodedPassword", savedUser.getPassword());
        assertEquals("USER", savedUser.getRole());

        verify(userRepository, times(1)).save(any(User.class));
    }
    @Test
    void shouldLoginSuccessfullyWithValidCredentials() {
        // Arrange
        User user = new User("test@gmail.com", "encodedPassword", "USER");

        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("password", "encodedPassword"))
                .thenReturn(true);

        // Act
        User loggedInUser = authService.login("test@gmail.com", "password");

        // Assert
        assertEquals("test@gmail.com", loggedInUser.getEmail());
        assertEquals("USER", loggedInUser.getRole());
    }
    @Test
    void shouldFailLoginWhenPasswordIsInvalid() {
        // Arrange
        User user = new User("test@gmail.com", "encodedPassword", "USER");

        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("wrongPassword", "encodedPassword"))
                .thenReturn(false);

        // Act + Assert
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> authService.login("test@gmail.com", "wrongPassword")
        );

        assertEquals("Invalid credentials", exception.getMessage());
    }

}
