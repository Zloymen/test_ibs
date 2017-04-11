package com.ibs.testwork.resp;

import java.util.List;

import com.ibs.testwork.data.Bid;

public class ManyBidResp {
	private boolean success;
	private String message;
	private List<Bid> bids;
	private Integer count;
	

	public ManyBidResp(boolean success, String message, List<Bid> listBid) {
		super();
		this.success = success;
		this.message = message;
		this.bids = listBid;
		this.setCount(this.bids.size());
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
	
	public List<Bid> getBids() {
		return bids;
	}
	
	public void setBids(List<Bid> listBid) {
		this.bids = listBid;
		this.setCount(this.bids.size());
	}

	public Integer getCount() {
		return count;
	}

	private void setCount(Integer count) {
		this.count = count;
	}
}
