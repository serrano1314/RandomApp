package com.tgsi.randomapp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "base")
@Data
public class BaseConfig {
    private String url;
}
