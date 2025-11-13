package com.hotel.reservation.dto;

import com.hotel.reservation.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String password;

    private String firstName;
    private String lastName;
    private String phone;
    private Role role;
    private LocalDateTime createdAt;
}
