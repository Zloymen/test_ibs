package com.ibs.testwork.data;

/**
 *
 * @author girko
 *
 */
public class Bid {
	
	private Long item;
	private String name;
	private Long idReceiver;
	private Long idSender;
	private Long idStatus;
	private String descBid;
	
	public Bid() {
		super();
	}
	
	public Bid(Long item, String name, Long idReceiver, Long idSender, Long idStatus, String descBid) {
		super();
		this.item = item;
		this.name = name;
		this.idReceiver = idReceiver;
		this.idSender = idSender;
		this.idStatus = idStatus;
		this.descBid = descBid;
	}

	@Override
	public String toString() {
		return "Bid [item=" + item + ", name=" + name + ", idReceiver=" + idReceiver + ", idSender=" + idSender
				+ ", idStatus=" + idStatus + ", descBid=" + descBid + "]";
	}

	public Long getItem() {
		return item;
	}
	public void setItem(Long item) {
		this.item = item;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getIdReceiver() {
		return idReceiver;
	}
	public void setIdReceiver(Long idReceiver) {
		this.idReceiver = idReceiver;
	}
	public Long getIdSender() {
		return idSender;
	}
	public void setIdSender(Long idSender) {
		this.idSender = idSender;
	}
	public Long getIdStatus() {
		return idStatus;
	}
	public void setIdStatus(Long idStatus) {
		this.idStatus = idStatus;
	}
	public String getDescBid() {
		return descBid;
	}
	public void setDescBid(String descBid) {
		this.descBid = descBid;
	}
	
	

}
