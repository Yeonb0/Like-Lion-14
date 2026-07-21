package com.backendblog.springblog.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UpdateArticleRequest {
    private String title;
    private String content;
}
