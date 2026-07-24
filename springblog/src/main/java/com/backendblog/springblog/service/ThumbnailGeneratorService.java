package com.backendblog.springblog.service;

import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.backendblog.springblog.dto.GeneratorThumbnailRequest;
import com.backendblog.springblog.dto.GeneratorThumbnailResponse;
import com.backendblog.springblog.dto.UploadResponse;
import com.google.genai.Client;
import com.google.genai.types.GenerateImagesConfig;
import com.google.genai.types.GenerateImagesResponse;
import com.google.genai.types.Image;

@Service
public class ThumbnailGeneratorService {

    private final Client client;
    private final PromptTemplate template;
    private final FileStorageService fileStorageService;
    private final String model;

    public ThumbnailGeneratorService(
            Client client,
            FileStorageService fileStorageService,
            @Value("classpath:prompts/thumbnail-generator.st") Resource promptResource,
            @Value("${spring.ai.google.genai.image.model:imagen-3.0-generate-002}") String model) {
        this.client = client;
        this.fileStorageService = fileStorageService;
        this.template = new PromptTemplate(promptResource);
        this.model = model;
    }

    public GeneratorThumbnailResponse generateThumbnail(GeneratorThumbnailRequest request) {
        String prompt = template.create(request.toMap()).getContents();

        GenerateImagesConfig config = GenerateImagesConfig.builder()
                .numberOfImages(1)
                .build();

        GenerateImagesResponse response = client.models.generateImages(model, prompt, config);

        Image image = response.images().stream().findFirst()
                .orElseThrow(() -> new IllegalStateException("이미지 생성에 실패했습니다."));
        byte[] bytes = image.imageBytes()
                .orElseThrow(() -> new IllegalStateException("생성된 이미지에 데이터가 없습니다."));

        // 로컬에 이미지 저장
        UploadResponse saved = fileStorageService.storeFile(bytes, "thumbnail.png");
        return new GeneratorThumbnailResponse(saved.imageUrl());
    }
}
