package com.hotel.reservation.controller;

import com.hotel.reservation.dto.ReservationDTO;
import com.hotel.reservation.service.ReservationService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    @GetMapping("/all")
    public List<ReservationDTO> getAllReservations(){
        return reservationService.getAllReservations();
    }

    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO) {
        return ResponseEntity.ok(reservationService.createReservation(reservationDTO));
    }

    @GetMapping("/{id}")
    public ReservationDTO getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id);
    }

    @GetMapping("/user/{userId}")
    public List<ReservationDTO> getReservationsForUser(@PathVariable Long userId) {
        return reservationService.getReservationsForUser(userId);
    }
}
