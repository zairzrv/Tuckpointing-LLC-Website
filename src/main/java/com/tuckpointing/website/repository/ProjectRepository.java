package com.tuckpointing.website.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tuckpointing.website.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    // SELECT * FROM project ORDER BY created_at DESC
    List<Project> findAllByOrderByCreatedAtDesc();
}