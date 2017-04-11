package com.ibs.testwork.resp;

import java.util.List;

import com.ibs.testwork.data.StatusCatalog;

public class ManyStatusResp {
	private boolean success;
	private String message;
	private List<StatusCatalog> statusCatalogs;
	private Integer count;
	
	public ManyStatusResp(boolean success, String message, List<StatusCatalog> statusCatalogs) {
		super();
		this.success = success;
		this.message = message;
		this.statusCatalogs = statusCatalogs;
		this.count = (statusCatalogs == null)? 0 : statusCatalogs.size();		
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public List<StatusCatalog> getStatusCatalogs() {
		return statusCatalogs;
	}
	public void setStatusCatalogs(List<StatusCatalog> statusCatalogs) {		
		this.statusCatalogs = statusCatalogs;
		this.count =(statusCatalogs == null) ? 0 : statusCatalogs.size();
	}
	public Integer getCount() {
		return count;
	}
	@Override
	public String toString() {
		return "ManyStatusResp [success=" + success + ", message=" + message + ", statusCatalogs=" + statusCatalogs
				+ ", count=" + count + "]";
	}	
}
