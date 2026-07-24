package com.backendblog.springblog.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backendblog.springblog.domain.Article;
import com.backendblog.springblog.dto.AddArticleRequest;
import com.backendblog.springblog.dto.UpdateArticleRequest;
import com.backendblog.springblog.repository.BlogRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor // final 이 붙거나 @NotNull 이 붙은 필드의 생성자를 자동으로 생성
@Service // 빈으로 등록
public class BlogService {
    
    private final BlogRepository blogRepository; 

    // 블로그 글 추가 메소드
    public Article save(AddArticleRequest request) {
        return blogRepository.save(request.toEntity());
    }

    // 블로그 글 조회 메소드
    public List<Article> findAll() {
        return blogRepository.findAll();
    }

    // 블로그 글 단건 조회 메소드
    public Article findById(long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found: " + id));
    }

    // 블로그 글 삭제 메소드
    public void deleteById(long id) {
        blogRepository.deleteById(id);
    }

    // 블로그 글 수정 메소드
    @Transactional
    public Article update(long id, UpdateArticleRequest request) {
        Article article = blogRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found: " + id));

        article.update(request.getTitle(), request.getContent(), request.getImageUrl());
        
        return article;
    }
}
