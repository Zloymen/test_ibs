package com.ibs.testwork.data;

/**
 * ����������
 * @author girko
 *
 */
public class Сatalog {
	private Long id;
	private String description;	
	
	public Сatalog() {
		super();
	}
	public Сatalog(Long id, String description) {
		super();
		this.id = id;
		this.description = description;
	}
	@Override
	public String toString() {
		return "Сatalog [id=" + id + ", description=" + description + "]";
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
