package com.hotel.reservation.controller;

import com.hotel.reservation.dto.RoomDTO;
import com.hotel.reservation.model.Room;
import com.hotel.reservation.service.RoomService;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/rooms")
@Data
public class RoomController {
    private final RoomService roomService;

    @PostMapping
    public RoomDTO createRoom(@RequestBody RoomDTO roomDTO) {
        return roomService.createRoom(roomDTO);

    }

    @GetMapping
    public List<RoomDTO> getAllRooms(){
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public RoomDTO getRoomById(@PathVariable Long id){
        return roomService.getRoomById(id);
    }

    @GetMapping("/available")
    public List<RoomDTO> getAvailableRooms() {
        return roomService.getAvailableRooms();
    }
}
