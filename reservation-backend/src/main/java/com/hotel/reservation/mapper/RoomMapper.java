package com.hotel.reservation.mapper;

import com.hotel.reservation.dto.RoomDTO;
import com.hotel.reservation.model.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Map;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    RoomDTO toDto(Room room);
    Room toEntity(RoomDTO dto);
}
