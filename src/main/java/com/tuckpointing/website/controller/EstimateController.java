package com.tuckpointing.website.controller;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tuckpointing.website.model.EstimateRequest;
import com.tuckpointing.website.repository.EstimateRequestRepository;

@RestController                   
@RequestMapping("/api/estimates")  
public class EstimateController {

    private final EstimateRequestRepository repo;

   
    public EstimateController(EstimateRequestRepository repo) {
        this.repo = repo;
    }

    //contact.js sends the form here as JSON.
    @PostMapping
    public ResponseEntity<?> create(@RequestBody EstimateRequest req) {
        
        if (isBlank(req.getName()) || isBlank(req.getTown())
                || isBlank(req.getProblemArea()) || isBlank(req.getPhone())
                || req.getPhone().replaceAll("\\D", "").length() != 10) {
            return ResponseEntity.badRequest().body("Missing or invalid fields.");
        }

        req.setId(null);
        req.setStatus("new");
        req.setCreatedAt(LocalDateTime.now());

        EstimateRequest saved = repo.save(req);   // INSERT INTO estimate_request ...
        return ResponseEntity.ok(saved);
    }

    private boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }
}