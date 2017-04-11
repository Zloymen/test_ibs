package com.ibs.testwork.service;

import java.util.List;

import com.ibs.testwork.data.Bid;
import com.ibs.testwork.data.SendAndReceivCatalog;
import com.ibs.testwork.data.StatusCatalog;

public interface TestWorkService {

	public List<Bid> getBidAll();
	public Bid getBid(Long id);
	public Bid deleteBid(Long id);
	public Bid updateBid(Bid newBid);
	public List<Bid> deleteAll();
	public Bid create(Bid bid);
	public List<SendAndReceivCatalog> getAllUsers();
	public SendAndReceivCatalog getUser(Long id);
	public List<StatusCatalog> getAllStatus();
	public StatusCatalog getStatus(Long id);
}
