package com.backendblog.springblog.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.backendblog.springblog.domain.Article;
import com.backendblog.springblog.dto.AddArticleRequest;
import com.backendblog.springblog.dto.UpdateArticleRequest;
import com.backendblog.springblog.dto.UpdateArticleRequest;
import com.backendblog.springblog.repository.BlogRepository;

import tools.jackson.databind.ObjectMapper;

@SpringBootTest // 테스트용 애플리케이션 컨텍스트
@AutoConfigureMockMvc // MockMvc를 자동으로 설정
class BlogApiControllerTest {

    @Autowired
    private MockMvc mockMvc; 

    @Autowired
    protected ObjectMapper objectMapper; // JSON 직렬화, 역직렬화에 사용

    @Autowired
    private WebApplicationContext context;


    @Autowired
    BlogRepository blogRepository;

    @BeforeEach // 테스트 실행 전 실행 메소드
    public void mockMvcSetUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .build();
        blogRepository.deleteAll();
    }

    @DisplayName("addArticle: 블로그 글 추가에 성공한다.")
    @Test
    public void addArticle() throws Exception {
        // given
        final String url = "/api/articles";
        final String title = "title";
        final String content = "content";
        final AddArticleRequest userRequest = new AddArticleRequest(title, content);

        // 객체 -> JSON 직렬화
        final String requestBody = objectMapper.writeValueAsString(userRequest);

        // when
        // 설정 내용 바탕 요청 전송
        ResultActions result = mockMvc.perform(post(url)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody));

        // then
        result.andExpect(status().isCreated());

        List<Article> articles = blogRepository.findAll();

        assertThat(articles.size()).isEqualTo(1); // 크기 1인지 검증
        assertThat(articles.get(0).getTitle()).isEqualTo(title); 
        assertThat(articles.get(0).getContent()).isEqualTo(content);
    }

    @DisplayName("findAllArticles: 블로그 글 조회에 성공한다.")
    @Test
    public void findAllArticles() throws Exception {
        // given
        final String url = "/api/articles";
        final String title = "title";
        final String content = "content";

        blogRepository.save(Article.builder()
                .title(title)
                .content(content)
                .build());

        // when
        final ResultActions resultActions = mockMvc.perform(get(url)
                .accept(MediaType.APPLICATION_JSON));

        // then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value(title))
                .andExpect(jsonPath("$[0].content").value(content));
    }

    @DisplayName("findArticleById: 블로그 글 조회에 성공한다.")
    @Test
    public void findArticleById() throws Exception {
        // given
        final String url = "/api/articles/{id}";
        final String title = "title";
        final String content = "content";

        Article savedArticle = blogRepository.save(Article.builder()
                .title(title)
                .content(content)
                .build());

        // when
        final ResultActions resultActions = mockMvc.perform(get(url, savedArticle.getId()));

        // then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(title))
                .andExpect(jsonPath("$.content").value(content));
    }

    @DisplayName("deleteArticleById: 블로그 글 삭제에 성공한다.")
    @Test
    public void deleteArticleById() throws Exception {
        // given
        final String url = "/api/articles/{id}";
        final String title = "title";
        final String content = "content";

        Article savedArticle = blogRepository.save(Article.builder()
                .title(title)
                .content(content)
                .build());

        // when
        mockMvc.perform(delete(url, savedArticle.getId()))
                .andExpect(status().isOk()); 
                

        // then
        List<Article> articles = blogRepository.findAll();
        assertThat(articles).isEmpty(); 
    }

    @DisplayName("updateArticle: 블로그 글 수정에 성공한다.")
    @Test
    public void updateArticle() throws Exception {
        // given
        final String url = "/api/articles/{id}";
        final String title = "title";
        final String content = "content";

        Article savedArticle = blogRepository.save(Article.builder()
                .title(title)
                .content(content)
                .build());

        final String newTitle = "new title";
        final String newContent = "new content";

        UpdateArticleRequest request = new UpdateArticleRequest(newTitle, newContent);

        // when
        ResultActions results = mockMvc.perform(put(url, savedArticle.getId())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(request)));
        results.andExpect(status().isOk());

        Article article = blogRepository.findById(savedArticle.getId()).get();

        assertThat(article.getTitle()).isEqualTo(newTitle);
        results.andExpect(status().isOk());

        assertThat(article.getTitle()).isEqualTo(newTitle);
        assertThat(article.getContent()).isEqualTo(newContent);
    }
}
