package com.ibs.testwork.resp;

import com.ibs.testwork.data.Bid;

public class SingleBidResp {
	private boolean success;
	private String message;
	private Bid bid;
	
	public SingleBidResp(boolean success, String message, Bid bid) {
		super();
		this.success = success;
		this.message = message;
		this.bid = bid;
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
	public Bid getBid() {
		return bid;
	}
	public void setBid(Bid bid) {
		this.bid = bid;
	}
}
