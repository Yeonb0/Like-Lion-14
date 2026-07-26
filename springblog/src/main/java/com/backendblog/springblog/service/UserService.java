package com.backendblog.springblog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.backendblog.springblog.domain.User;
import com.backendblog.springblog.dto.AddUserRequest;
import com.backendblog.springblog.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Long save(AddUserRequest dto) {
        return userRepository.save(User.builder()
                .email(dto.getEmail())
                // 패스워드 암호화
                .password(passwordEncoder.encode(dto.getPassword()))
                .build()).getId();
    }
}
