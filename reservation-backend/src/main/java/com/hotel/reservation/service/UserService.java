package com.hotel.reservation.service;

import com.hotel.reservation.dto.UserDTO;
import com.hotel.reservation.mapper.UserMapper;
import com.hotel.reservation.model.Role;
import com.hotel.reservation.model.User;
import com.hotel.reservation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(userMapper::toDto).collect(Collectors.toList());
    }

    public UserDTO geUserById(Long id) {
        return userRepository.findById(id).map(userMapper::toDto).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        return userMapper.toDto(userRepository.save(user));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public UserDTO createUser(UserDTO userDTO) {
        User user = User.builder()
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .role(userDTO.getRole())
                .email(userDTO.getEmail())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .phone(userDTO.getPhone())
                .build();
        user = userRepository.save(user);
        userDTO.setId(user.getId());
        userDTO.setPassword(null);
        return userDTO;
    }
}