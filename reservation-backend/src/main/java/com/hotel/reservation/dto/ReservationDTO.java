package com.hotel.reservation.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ReservationDTO {
    private Long id;
    private Long userId;
    private Long roomId;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private LocalDateTime createdAt;
}
