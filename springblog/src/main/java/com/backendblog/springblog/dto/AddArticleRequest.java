package com.backendblog.springblog.dto;

import com.backendblog.springblog.domain.Article;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor  // 기본 생성자 추가
@AllArgsConstructor // 모든 필드 값을 파라미터로 받은 생성자 추가
public class AddArticleRequest {
    
    private String title;
    private String content;
    private String imageUrl;

    public AddArticleRequest(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public Article toEntity() {
        return Article.builder()
                .title(title)
                .content(content)
                .imageUrl(imageUrl)
                .build();
    }
}
