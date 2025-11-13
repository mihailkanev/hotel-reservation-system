package com.hotel.reservation.repository;

import com.hotel.reservation.model.Reservation;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUserId(Long userId);

    @Query("SELECT r FROM Reservation r WHERE r.room.id = :roomId AND " +
            "r.checkIn < :end AND r.checkOut > :start")
    List<Reservation> findReservationsForRoomBetween(
            @Param("roomId") Long roomId,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end);
}
