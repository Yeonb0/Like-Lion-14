package com.backendblog.springblog.dto;

import java.time.LocalDateTime;
import com.backendblog.springblog.domain.Article;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ArticleViewResponse {
    
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String imageUrl;

    public ArticleViewResponse(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.imageUrl = article.getImageUrl();
        this.createdAt = article.getCreatedAt();
    }
}
