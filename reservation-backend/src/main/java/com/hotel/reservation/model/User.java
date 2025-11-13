package com.hotel.reservation.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import javax.management.ConstructorParameters;
import java.time.LocalDateTime;
@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;

    private String firstName;
    private String lastName;
    private String phone;

    @Column(name = "email")
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;
    private LocalDateTime createdAt;

}
