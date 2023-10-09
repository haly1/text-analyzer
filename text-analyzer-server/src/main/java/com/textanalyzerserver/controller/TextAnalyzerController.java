package com.textanalyzerserver.controller;

import com.textanalyzerserver.service.TextAnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;

@RestController
@RequestMapping("api/")
public class TextAnalyzerController {

    @Autowired
    private ApplicationContext context;

    @PostMapping("analyze")
    @CrossOrigin(origins = "http://localhost:4200")
    public Map<Character, Integer> getAnalysis(@RequestBody TextAnalyzerRequest request) {
        TextAnalyzerService service = context.getBean(TextAnalyzerService.class);

        try {
            return service.analyzeText(request.getText(), request.getMode());
        }
        catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
