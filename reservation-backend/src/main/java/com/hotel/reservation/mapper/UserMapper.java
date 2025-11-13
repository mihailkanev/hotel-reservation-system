package com.hotel.reservation.mapper;

import com.hotel.reservation.dto.UserDTO;
import com.hotel.reservation.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDto(User user);
    User toEntity(UserDTO userDTO);
}
