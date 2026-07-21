package com.backendblog.springblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backendblog.springblog.domain.Article;

public interface BlogRepository extends JpaRepository<Article, Long> {
}
