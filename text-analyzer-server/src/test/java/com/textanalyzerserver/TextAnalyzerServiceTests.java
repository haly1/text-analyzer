package com.textanalyzerserver;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.textanalyzerserver.constants.Constants;
import com.textanalyzerserver.service.TextAnalyzerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
class TextAnalyzerServiceTests {

    @Autowired
    private TextAnalyzerService service;

    //region Test Data
    private final String testString1 = "abc abc abc def ghi jkl mno pqrs tuv tuv wxyz ABC DEF GHIIII JKL MNO PQRS TUV WXYZ !\"§ $%& /() =?* '<> #|; ²³~ " +
            "@`´ ©«» ¤¼× {} abc def ghi jkl mnooo pqrs tuv wxyz ABC DEF GHI JKL MNO MNO MNO PQRS TUV WXYZ !\"§ $%& /() =?* '<> #";
    private final String testString2 = "<p>abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !\"§ $%& /() =?* '<> #|; ²³~ @`´ ©«» ¤¼× {} " +
            "abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !\"§ $%& /() =?* '<> #|; ²³~ @`´ ©«» ¤¼× {} abc def ghi jkl mno pqrs " +
            "tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !\"§ $%& /(</p>";
    private final String testString3 = "<p>abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI </p>";
    //endregion

    @Test
    void givenTextWithoutCorrespondingChars_whenAnalyzeText_ThenEmptyMap() {
        var result = service.analyzeText("aeiou", Constants.MODE_CONSONANTS);
        assertThat(result).isNotNull();
        assertThat(result.size()).isEqualTo(0);

        result = service.analyzeText("bcdfg hklp", Constants.MODE_VOWELS);
        assertThat(result).isNotNull();
        assertThat(result.size()).isEqualTo(0);
    }

    @Test
    void givenModeConsonants_whenAnalyzeText_ThenMap() throws JsonProcessingException {
        var objectMapper = new ObjectMapper();
        var expected1 = "{\"b\":6,\"c\":6,\"d\":4,\"f\":4,\"g\":4,\"h\":4,\"j\":4,\"k\":4," +
                "\"l\":4,\"m\":6,\"n\":6,\"p\":4,\"q\":4,\"r\":4,\"s\":4,\"t\":5,\"v\":5,\"w\":4,\"x\":4,\"y\":4,\"z\":4}";
        var expected2 = "{\"b\":6,\"c\":6,\"d\":6,\"f\":6,\"g\":6,\"h\":6,\"j\":6,\"k\":6," +
                "\"l\":6,\"m\":6,\"n\":6,\"p\":8,\"q\":6,\"r\":6,\"s\":6,\"t\":6,\"v\":6,\"w\":6,\"x\":6,\"y\":6,\"z\":6}";
        var expected3 = "{\"b\":2,\"c\":2,\"d\":2,\"f\":2,\"g\":2,\"h\":2,\"j\":1,\"k\":1," +
                "\"l\":1,\"m\":1,\"n\":1,\"p\":3,\"q\":1,\"r\":1,\"s\":1,\"t\":1,\"v\":1,\"w\":1,\"x\":1,\"y\":1,\"z\":1}";

        var result = service.analyzeText(testString1, Constants.MODE_CONSONANTS);
        var resultAsJson = objectMapper.writeValueAsString(result);
        assertThat(resultAsJson).isEqualTo(expected1);

        result = service.analyzeText(testString2, Constants.MODE_CONSONANTS);
        resultAsJson = objectMapper.writeValueAsString(result);
        assertThat(resultAsJson).isEqualTo(expected2);

        result = service.analyzeText(testString3, Constants.MODE_CONSONANTS);
        resultAsJson = objectMapper.writeValueAsString(result);
        assertThat(resultAsJson).isEqualTo(expected3);
    }

    @Test
    void givenModeVowels_whenAnalyzeText_ThenMap() throws JsonProcessingException {
        var objectMapper = new ObjectMapper();
        var expected1 = "{\"a\":6,\"e\":4,\"u\":5,\"i\":7,\"o\":8}";
        var expected2 = "{\"a\":6,\"e\":6,\"u\":6,\"i\":6,\"o\":6}";
        var expected3 = "{\"a\":2,\"e\":2,\"u\":1,\"i\":2,\"o\":1}";

        var result = service.analyzeText(testString1, Constants.MODE_VOWELS);
        var resultAsJson = objectMapper.writeValueAsString(result);
        assertThat(resultAsJson).isEqualTo(expected1);

        result = service.analyzeText(testString2, Constants.MODE_VOWELS);
        resultAsJson = objectMapper.writeValueAsString(result);
        assertThat(resultAsJson).isEqualTo(expected2);

        result = service.analyzeText(testString3, Constants.MODE_VOWELS);
        resultAsJson = objectMapper.writeValueAsString(result);
        assertThat(resultAsJson).isEqualTo(expected3);
    }

    @Test
    void givenModeBoth_whenAnalyzeText_ThenMp() throws JsonProcessingException {
        var objectMapper = new ObjectMapper();
        var expected1 = "{\"a\":6,\"b\":6,\"c\":6,\"d\":4,\"e\":4,\"f\":4,\"g\":4,\"h\":4,\"i\":7,\"j\":4,\"k\":4," +
                "\"l\":4,\"m\":6,\"n\":6,\"o\":8,\"p\":4,\"q\":4,\"r\":4,\"s\":4,\"t\":5,\"u\":5,\"v\":5,\"w\":4,\"x\":4,\"y\":4,\"z\":4}";
        var result = service.analyzeText(testString1, Constants.MODE_BOTH);
        var resultAsJson = objectMapper.writeValueAsString(result);

        assertThat(resultAsJson).isEqualTo(expected1);
    }

    @Test
    void givenModeInvalid_whenAnalyzeText_ThenException() throws IllegalArgumentException {
        assertThrows(IllegalArgumentException.class, () -> {
            service.analyzeText(testString1, "Nothing");
        });
    }

    @Test
    void givenTextEmpty_whenAnalyzeText_ThenException() throws IllegalArgumentException {
        assertThrows(IllegalArgumentException.class, () -> {
            service.analyzeText("", Constants.MODE_BOTH);
        });
    }

}
