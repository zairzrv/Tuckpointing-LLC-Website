package com.tuckpointing.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tuckpointing.website.model.EstimateRequest;

public interface EstimateRequestRepository extends JpaRepository<EstimateRequest, Long> {
}