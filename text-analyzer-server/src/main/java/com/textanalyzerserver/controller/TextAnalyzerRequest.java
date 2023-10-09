package com.textanalyzerserver.controller;

import lombok.Data;

@Data
public class TextAnalyzerRequest {
    private String mode;
    private String text;
}
