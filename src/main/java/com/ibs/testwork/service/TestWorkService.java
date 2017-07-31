package com.ibs.testwork.service;

import java.util.List;

import com.ibs.testwork.data.Bid;
import com.ibs.testwork.data.SendAndReceivCatalog;
import com.ibs.testwork.data.StatusCatalog;

public interface TestWorkService {

	List<Bid> getBidAll();
	Bid getBid(Long id);
	Bid deleteBid(Long id);
	Bid updateBid(Bid newBid);
	List<Bid> deleteAll();
	Bid create(Bid bid);
	List<SendAndReceivCatalog> getAllUsers();
	SendAndReceivCatalog getUser(Long id);
	List<StatusCatalog> getAllStatus();
	StatusCatalog getStatus(Long id);
}
