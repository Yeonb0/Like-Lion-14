package com.backendblog.springblog.service;

import com.backendblog.springblog.dto.UploadResponse;

public interface FileStorageService {
    UploadResponse storeFile(byte[] bytes, String filename);
}
