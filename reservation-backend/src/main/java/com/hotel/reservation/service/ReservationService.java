package com.hotel.reservation.service;

import com.hotel.reservation.dto.ReservationDTO;
import com.hotel.reservation.mapper.ReservationMapper;
import com.hotel.reservation.model.Reservation;
import com.hotel.reservation.model.Role;
import com.hotel.reservation.model.Room;
import com.hotel.reservation.model.User;
import com.hotel.reservation.repository.ReservationRepository;
import com.hotel.reservation.repository.RoomRepository;
import com.hotel.reservation.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    public List<ReservationDTO> getAllReservations() {
        return reservationRepository.findAll().stream().map(reservationMapper::toDTO).collect(Collectors.toList());
    }


    public ReservationDTO getReservationById(Long id) {
        return reservationRepository.findById(id)
                .map(reservationMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id " + id));
    }

    public List<ReservationDTO> getReservationForUser(Long userId) {
        return reservationRepository.findById(userId).stream().map(reservationMapper::toDTO).collect(Collectors.toList());
    }

    public ReservationDTO createReservation(ReservationDTO reservationDTO) {
        //User user = userRepository.findById(reservationDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        User user = userRepository.findByEmail(reservationDTO.getEmail()).orElseGet(()->createGuestUser(reservationDTO));
        Room room = roomRepository.findById(reservationDTO.getRoomId()).orElseThrow(() -> new RuntimeException("Room not found"));

        boolean isOccupied = !reservationRepository.findReservationsForRoomBetween(room.getId(), reservationDTO.getCheckIn(), reservationDTO.getCheckOut()).isEmpty();

        if (isOccupied) {
            throw new RuntimeException("Room is already booked for that period!");
        }

        Reservation reservation = Reservation.builder()
                .user(user)
                .room(room)
                .checkIn(reservationDTO.getCheckIn())
                .checkOut(reservationDTO.getCheckOut())
                .createdAt(LocalDateTime.now())
                .build();
        reservation = reservationRepository.save(reservation);
        return reservationMapper.toDTO(reservation);
    }

    private User createGuestUser(ReservationDTO reservationDTO) {
        return userRepository.save(User.builder()
                .email(reservationDTO.getEmail())
                .firstName(reservationDTO.getFirstName())
                .lastName(reservationDTO.getLastName())
                .phone(reservationDTO.getPhone())
                .role(Role.GUEST) // ✅ Маркира като guest
                .build());
    }

    public List<ReservationDTO> getReservationsForUser(Long userId) {
        return reservationRepository.findByUserId(userId).stream()
                .map(reservationMapper::toDTO)
                .collect(Collectors.toList());
    }

}
