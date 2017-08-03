package com.ibs.testwork.data;

/**
 * ����������
 * @author girko
 *
 */
public class Catalog {
	private Long id;
	private String description;	
	
	public Catalog() {
		super();
	}
	public Catalog(Long id, String description) {
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
