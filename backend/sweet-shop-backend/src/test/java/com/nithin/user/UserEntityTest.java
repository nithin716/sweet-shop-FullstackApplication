package com.nithin.user;

import com.nithin.user.entity.User;   // ✅ THIS WAS MISSING

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class UserEntityTest {

    @Test
    void shouldFailWhenEmailIsNull() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            new User(null, "password123", "USER");
        });

        assertEquals("Email cannot be null", exception.getMessage());
    }
}
