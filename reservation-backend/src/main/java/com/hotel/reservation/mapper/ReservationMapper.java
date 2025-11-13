package com.hotel.reservation.mapper;

import com.hotel.reservation.dto.ReservationDTO;
import com.hotel.reservation.model.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ReservationMapper {
    @Mapping(source = "user.id",target = "userId")
    @Mapping(source = "room.id",target = "roomId")
    ReservationDTO toDTO(Reservation reservation);

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "roomId", target = "room.id")
    Reservation toEntity(ReservationDTO dto);
}
