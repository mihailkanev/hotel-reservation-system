package com.hotel.reservation.service;

import com.hotel.reservation.dto.RoomDTO;
import com.hotel.reservation.mapper.RoomMapper;
import com.hotel.reservation.mapper.UserMapper;
import com.hotel.reservation.model.Room;
import com.hotel.reservation.repository.RoomRepository;
import com.hotel.reservation.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    public RoomDTO getRoomById(Long id) {
        return roomRepository.findById(id)
                .map(roomMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Room not found with id " + id));
    }

    public List<RoomDTO> getAllRooms() {
        return roomRepository.findAll()
                .stream()
                .map(roomMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<RoomDTO> getAvailableRooms() {
        return roomRepository.findByIsAvailableTrue()
                .stream()
                .map(roomMapper::toDto)
                .collect(Collectors.toList());
    }

    public RoomDTO createRoom(RoomDTO roomDTO) {
        Room room = Room.builder()
                .number(roomDTO.getRoomNumber())
                .type(roomDTO.getType())
                .price(roomDTO.getPrice())
                .isAvailable(true)
                .build();

        room = roomRepository.save(room);
        roomDTO.setId(roomDTO.getId());
        return roomDTO;
    }
}
