package com.backendblog.springblog.config.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
@ConfigurationProperties(prefix = "jwt") // 자바 클래스에 프로퍼티값 가져와 사용
public class JwtProperties {
    private String issuer; // 발급자
    private String secret_key; // 비밀키
}
