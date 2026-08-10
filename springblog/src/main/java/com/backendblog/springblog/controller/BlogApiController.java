package com.backendblog.springblog.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backendblog.springblog.domain.Article;
import com.backendblog.springblog.dto.AddArticleRequest;
import com.backendblog.springblog.dto.ArticleResponse;
import com.backendblog.springblog.dto.UpdateArticleRequest;
import com.backendblog.springblog.service.BlogService;
import com.backendblog.springblog.dto.WritingSuggestionRequest;
import com.backendblog.springblog.dto.WritingSuggestionResponse;
import com.backendblog.springblog.service.WritingAssistantService;
import com.backendblog.springblog.dto.GeneratorThumbnailRequest;
import com.backendblog.springblog.dto.GeneratorThumbnailResponse;
import com.backendblog.springblog.service.ThumbnailGeneratorService;

import lombok.RequiredArgsConstructor;

@RestController // HTTP Response Body 에 객체 데이터를 JSON 형식으로 반환
@RequiredArgsConstructor
public class BlogApiController {

    private final BlogService blogService;
    private final WritingAssistantService writingAssistantService;
    private final ThumbnailGeneratorService thumbnailGeneratorService;

    // HTTP 메소드가 POST 일때 전달받은 URL과 동일하면 메소드로 매칭
    @PostMapping("/api/articles")
    // @RequestBody : HTTP 요청 Body에 담긴 JSON 데이터를 Java 객체로 변환
    public ResponseEntity<Article> addArticle(@RequestBody AddArticleRequest request,
        Principal principal
    ) {
        Article savedArticle = blogService.save(request, principal.getName());

        // 요청한 자원이 성공적으로 생성되었으며 저장된 블로그 글 정보를 응답 객체에 담아 전송
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedArticle);
    }

    @GetMapping("/api/articles")
    public ResponseEntity<List<ArticleResponse>> findAllArticles() {
        List<ArticleResponse> articles = blogService.findAll()
                .stream()
                .map(ArticleResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(articles);
    }

    @GetMapping("/api/articles/{id}")
    public ResponseEntity<ArticleResponse> findArticleById(@PathVariable long id) {
        Article article = blogService.findById(id);

        return ResponseEntity.ok()
                .body(new ArticleResponse(article));
    }

    @DeleteMapping("/api/articles/{id}")
    public ResponseEntity<Void> deleteArticleById(@PathVariable long id) {
        blogService.delete(id);

        return ResponseEntity.ok()
                .build();
    }

    @PutMapping("/api/articles/{id}")
    public ResponseEntity<ArticleResponse> updateArticle(@PathVariable long id, @RequestBody UpdateArticleRequest request) {
        Article updatedArticle = blogService.update(id, request);

        return ResponseEntity.ok()
                .body(new ArticleResponse(updatedArticle));
    }

    @PostMapping("/api/ai-suggestions")
    public ResponseEntity<WritingSuggestionResponse> writingAssist(@RequestBody WritingSuggestionRequest request) {
        WritingSuggestionResponse response = writingAssistantService.getWritingAssist(request);

        return ResponseEntity.ok()
                .body(response);
    }

    @PostMapping("/api/ai-thumbnails")
    public ResponseEntity<GeneratorThumbnailResponse> thumbnailGenerator(@RequestBody GeneratorThumbnailRequest request) {
        GeneratorThumbnailResponse response = thumbnailGeneratorService.generateThumbnail(request);

        return ResponseEntity.ok()
                .body(response);
    }
}
