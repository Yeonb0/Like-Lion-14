package com.backendblog.springblog.config.jwt;

import com.backendblog.springblog.domain.User;
import com.backendblog.springblog.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import java.time.Duration;
import java.util.Date;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.Map;
import io.jsonwebtoken.Jwts;

@SpringBootTest
class TokenProviderTest {
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private JwtProperties jwtProperties;
    @Autowired
    private UserRepository userRepository;

    // 1. generateToken() 검증 테스트
    @DisplayName("generateToken() : 유저 정보와 만료 기간을 전달해 토큰을 만들 수 있다.")
    @Test
    void generateToken() {
        // given
        User testUser = userRepository.save(User.builder()
                .email("user@gmail.com")
                .password("test")
                .build());
        // when
        String token = tokenProvider.generateToken(testUser, Duration.ofDays(14));
        // then
        Long userId = Jwts.parser()
                .setSigningKey(jwtProperties.getSecret_key())
                .parseClaimsJws(token)
                .getBody()
                .get("id", Long.class);

        assertThat(userId).isEqualTo(testUser.getId());   
    }
    
    // 2. validateToken() 검증 테스트
    @DisplayName("validateToken() : 만료된 토큰인 때에 유효성 검증에 실패한다.")
    @Test
    void validateToken() {
        // given
        String token = JwtFactory.builder()
                .expiredAt(new Date(new Date().getTime() - Duration.ofDays(7).toMillis())) // 만료된 토큰
                .build()
                .createToken(jwtProperties);
        // when
        boolean result = tokenProvider.validateToken(token);
        // then
        assertThat(result).isFalse();
    }

    @DisplayName("validateToken() : 유효한 토큰인 때에 유효성 검증에 성공한다.")
    @Test
    void validateToken_ValidToken() {
        // given
        String token = JwtFactory.withDefaultValues()
                .createToken(jwtProperties);
        // when
        boolean result = tokenProvider.validateToken(token);
        // then
        assertThat(result).isTrue();
    }

    // 3. getAuthentication() 검증 테스트
    @DisplayName("getAuthentication() : 토큰 기반으로 인증 정보를 가져올 수 있다.")
    @Test
    void getAuthentication() {
        // given
        String userEmail = "user@email.com";
        String token = JwtFactory.builder()
                .subject(userEmail)
                .build()
                .createToken(jwtProperties);
        // when
        Authentication authentication = tokenProvider.getAuthentication(token);
        // then
        assertThat(((UserDetails) authentication.getPrincipal()).getUsername()).isEqualTo(userEmail);
    }

    // 4. getUserId() 검증 테스트
    @DisplayName("getUserId() : 토큰 기반으로 유저 ID를 가져올 수 있다.")
    @Test
    void getUserId() {
        // given
        Long userId = 1L;
        String token = JwtFactory.builder()
                .claims(Map.of("id", userId))
                .build()
                .createToken(jwtProperties);
        // when
        Long resultUserId = tokenProvider.getUserId(token);
        // then
        assertThat(resultUserId).isEqualTo(userId);
    }
}
