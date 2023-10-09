package com.textanalyzerserver.service;

import com.textanalyzerserver.constants.Constants;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;


@Service
public class TextAnalyzerService {
    public Map<Character, Integer> analyzeText(String text, String mode) {
        validateInput(text, mode);
        return countCharsInString(text, getCharactersToCount(mode));
    }

    private void validateInput(String text, String mode) {
        if (text == null || mode == null || text.isEmpty()) {
            throw new IllegalArgumentException("Text and mode must not be null or empty");
        }

        if (!isValidMode(mode.toLowerCase())) {
            throw new IllegalArgumentException("Invalid mode");
        }
    }

    private boolean isValidMode(String mode) {
        return Constants.MODE_VOWELS.equals(mode)
                || Constants.MODE_CONSONANTS.equals(mode)
                || Constants.MODE_BOTH.equals(mode);
    }

    private String getCharactersToCount(String mode) {
        return switch (mode.toLowerCase()) {
            case Constants.MODE_VOWELS -> "aeiou";
            case Constants.MODE_CONSONANTS -> "bcdfghjklmnpqrstvwxyz";
            case Constants.MODE_BOTH -> "aeioubcdfghjklmnpqrstvwxyz";
            default -> "";
        };
    }

    private Map<Character, Integer> countCharsInString(String text, String charsToCount) {
        Map<Character, Integer> chatCount = new HashMap<>();

        for (char ch : text.toLowerCase().toCharArray()) {
            if (charsToCount.indexOf(ch) != -1) {
                chatCount.put(ch, chatCount.getOrDefault(ch, 0) + 1);
            }
        }

        return chatCount;
    }
}