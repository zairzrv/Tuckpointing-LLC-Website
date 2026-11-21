package com.tuckpointing.website.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity   //estimate_request table
public class EstimateRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)   // MySQL auto-increment
    private Long id;

    private String name;
    private String phone;
    private String town;
    private String problemArea;

    @Column(length = 2000)  
    private String details;

    private String contactPref;          // "text" or "call"
    private String status;               // "new", "contacted", "done"
    private LocalDateTime createdAt;
    
    // Getters and setters
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getTown() {
		return town;
	}
	public void setTown(String town) {
		this.town = town;
	}
	public String getProblemArea() {
		return problemArea;
	}
	public void setProblemArea(String problemArea) {
		this.problemArea = problemArea;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	public String getContactPref() {
		return contactPref;
	}
	public void setContactPref(String contactPref) {
		this.contactPref = contactPref;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
}