package com.springboot.blogproject;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AccessLevel;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id; // DB table 의 'id' 컬럼과 매칭

    @Column(name = "name", nullable = false)
    private String name; // DB table 의 'name' 컬럼과 매칭

    public Member(String name) {
        this.name = name;
    }
}
