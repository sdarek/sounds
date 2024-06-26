package com.surdel.sounds.service;

import com.surdel.sounds.controller.auth.AuthenticationRequest;
import com.surdel.sounds.controller.auth.AuthenticationResponse;
import com.surdel.sounds.controller.auth.RegisterRequest;
import com.surdel.sounds.controller.auth.UserResponse;
import com.surdel.sounds.model.Role;
import com.surdel.sounds.model.User;
import com.surdel.sounds.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Użytkownik " + request.getEmail() + " już istnieje");
        }
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPasswordHash()))
                .role(Role.USER)
                .createdAt(Timestamp.from(Instant.now()))
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);

        UserResponse userResponse = UserResponse.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(String.valueOf(user.getRole()))
                .build();

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .user(userResponse)
                .build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));
        var jwtToken = jwtService.generateToken(user);

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(String.valueOf(user.getRole()))
                .build();

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .user(userResponse)
                .build();
    }
}
