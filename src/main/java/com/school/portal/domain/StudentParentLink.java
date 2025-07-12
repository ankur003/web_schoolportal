package com.school.portal.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "student_parent_link")
public class StudentParentLink implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2316171045512254035L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "student_parent_id")
	private Long studentParentId;

	@Column(name = "student_id", nullable = false)
	private Long studentId;

	@Column(name = "parent_id", nullable = false)
	private Long parentId;

	@Column(name = "created_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;

	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date updatedAt;

	// Constructors
	public StudentParentLink() {
	}

	public StudentParentLink(Long studentId, Long parentId) {
		this.studentId = studentId;
		this.parentId = parentId;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	// Getters and Setters
	public Long getStudentParentId() {
		return studentParentId;
	}

	public void setStudentParentId(Long studentParentId) {
		this.studentParentId = studentParentId;
	}

	public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	@PrePersist
	protected void onCreate() {
		createdAt = new Date();
		updatedAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		updatedAt = new Date();
	}

}