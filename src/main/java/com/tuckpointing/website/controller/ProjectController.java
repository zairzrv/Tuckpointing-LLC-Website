package com.tuckpointing.website.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tuckpointing.website.model.Project;
import com.tuckpointing.website.repository.ProjectRepository;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository repo;

    public ProjectController(ProjectRepository repo) {
        this.repo = repo;
    }

    //work.js asks for every project, newest first.
    @GetMapping
    public List<Project> list() {
        return repo.findAllByOrderByCreatedAtDesc();
    }
}