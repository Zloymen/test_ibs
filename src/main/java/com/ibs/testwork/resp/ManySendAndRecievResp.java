package com.ibs.testwork.resp;

import java.util.List;

import com.ibs.testwork.data.SendAndReceivCatalog;

public class ManySendAndRecievResp {
	private boolean success;
	private String message;
	private List<SendAndReceivCatalog> sendAndReceivCatalogs;
	
	public ManySendAndRecievResp(boolean success, String message, List<SendAndReceivCatalog> sendAndReceivCatalogs) {
		super();
		this.success = success;
		this.message = message;
		this.sendAndReceivCatalogs = sendAndReceivCatalogs;
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
	public List<SendAndReceivCatalog> getSendAndReceivCatalogs() {
		return sendAndReceivCatalogs;
	}
	public void setSendAndReceivCatalogs(List<SendAndReceivCatalog> sendAndReceivCatalogs) {
		this.sendAndReceivCatalogs = sendAndReceivCatalogs;		
	}
	public Integer getCount() {
		return (sendAndReceivCatalogs == null) ? 0 : sendAndReceivCatalogs.size();
	}
	
}
