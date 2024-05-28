package com.surdel.sounds.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@Schema(description = "Tabela users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unikalny identyfikator użytkownika", example = "1")
    private Integer id;

    @Column(name = "first_name")
    @Schema(description = "Imię użytkownika", example = "Daro")
    private String firstName;

    @Column(name = "last_name")
    @Schema(description = "Nazwisko użytkownika", example = "Surdl")
    private String lastName;

    @Column(unique = true)
    @Schema(description = "Adres email użytkownika", example = "jan.kowalski@example.com")
    private String email;

    @Schema(description = "Numer telefonu użytkownika", example = "123456789")
    private String phone;

    @Column(name = "password_hash")
    @Schema(description = "Hash hasła użytkownika")
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Rola użytkownika w systemie", example = "ADMIN")
    private Role role;

    @Column(name = "created_at")
    @Schema(description = "Data utworzenia konta użytkownika")
    private Timestamp createdAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Getters and Setters

}
