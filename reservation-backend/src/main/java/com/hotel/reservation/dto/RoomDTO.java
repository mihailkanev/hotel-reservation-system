package com.hotel.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomDTO {
    private Long id;
    private String roomNumber;
    private String type;
    private BigDecimal price;
}
