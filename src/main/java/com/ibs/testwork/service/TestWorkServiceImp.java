package com.ibs.testwork.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ibs.testwork.data.Bid;
import com.ibs.testwork.data.SendAndReceivCatalog;
import com.ibs.testwork.data.StatusCatalog;

@Service("MainService")
public class TestWorkServiceImp implements TestWorkService {

	private static final Logger logger = LoggerFactory.getLogger(TestWorkService.class);
	

	/**
	 * хранилище заявок
	 */
	private HashMap<Long,Bid> mapBid = new HashMap<Long,Bid>();
	/**
	 * хранилище пользователей
	 */
	private HashMap<Long,SendAndReceivCatalog> mapUserCatalog = new HashMap<Long,SendAndReceivCatalog>();
	/**
	 * хранилище статусов
	 */
	private HashMap<Long, StatusCatalog> mapStatusCatalog = new HashMap<Long, StatusCatalog>();

	public List<Bid> getBidAll()
	{
		logger.info("getBidAll");
		
		return new ArrayList<Bid>(mapBid.values());
	}
	
	public Bid getBid(Long id)
	{	
		logger.info("getBid id=" + id);
		return mapBid.get(id);
	}
	
	public Bid deleteBid(Long id)
	{
		logger.info("deleteBid id=" + id);
		return mapBid.remove(id);
	}
	
	public Bid updateBid(Bid newBid)
	{	
		mapBid.replace(newBid.getItem(), newBid);
		logger.info("updateBid id=" + newBid.getItem() + " " +newBid.toString() );
		return mapBid.get(newBid.getItem());
	}
	
	public List<Bid> deleteAll()
	{	
		logger.info("deleteAll");
		List<Bid> arr = new ArrayList<Bid> (mapBid.values());
		mapBid.clear();
		return arr;
	}
	
	public Bid create(Bid bid)
	{			
		Set<Long> setBid = mapBid.keySet();
		Long maxId = Collections.max(setBid);		
		bid.setItem(++maxId);
		mapBid.put(bid.getItem(), bid);
		logger.info("create id =" + maxId + " " + bid.toString());
		return mapBid.get(maxId);
	}
	
	public List<SendAndReceivCatalog> getAllUsers()
	{
		logger.info("getAllUsers");
		return new ArrayList<SendAndReceivCatalog>( mapUserCatalog.values());
	}
	
	public SendAndReceivCatalog getUser(Long id)
	{
		logger.info("getUser id = " + id);
		return  mapUserCatalog.get(id);
	}
	
	public List<StatusCatalog> getAllStatus()
	{
		logger.info("getAllStatus" + mapStatusCatalog.size());
		return new ArrayList<StatusCatalog> (mapStatusCatalog.values());
	}
	
	public StatusCatalog getStatus(Long id)
	{
		logger.info("getStatus id = " + id);
		return  mapStatusCatalog.get(id);
	}
	
	
	@PostConstruct
	void init()
	{
		for(int i = 1; i <= 20; i++)
		{
			mapBid.put(Long.valueOf(i), new Bid(Long.valueOf(i), "Заявка #" + i, Long.valueOf(1 + new Random().nextInt(11)), Long.valueOf(1 + new Random().nextInt(11)), Long.valueOf(1 + new Random().nextInt(4)), "Test" + i));
		}
				
		mapUserCatalog.put(1l,new SendAndReceivCatalog(1l,"Куляница Андрей Леонидович"));
		mapUserCatalog.put(2l,new SendAndReceivCatalog(2l,"Аспидов Вячеслав Владимирович"));
		mapUserCatalog.put(3l,new SendAndReceivCatalog(3l,"Фоминых Станислав Борисович"));
		mapUserCatalog.put(4l,new SendAndReceivCatalog(4l,"Черкасова Вероника Сергеевна"));
		mapUserCatalog.put(5l,new SendAndReceivCatalog(5l,"Абрамов Владимир Львович"));
		mapUserCatalog.put(6l,new SendAndReceivCatalog(6l,"Дмитриев Иван Петрович"));
		mapUserCatalog.put(7l,new SendAndReceivCatalog(7l,"Маркина Екатерина Юрьевна"));
		mapUserCatalog.put(8l,new SendAndReceivCatalog(8l,"Сабанин Антон Анатольевич"));
		mapUserCatalog.put(9l,new SendAndReceivCatalog(9l,"Королёв Анатолий Сергеевич"));
		mapUserCatalog.put(10l,new SendAndReceivCatalog(10l,"Гизатуллин Булат Максутович"));
		mapUserCatalog.put(11l,new SendAndReceivCatalog(11l,"Порошин Олег Владиславович"));
		mapUserCatalog.put(12l,new SendAndReceivCatalog(12l,"Закржевский Ринат Радикович"));
		
		
		mapStatusCatalog.put(1l,new StatusCatalog(1l,"Новая"));
		mapStatusCatalog.put(2l,new StatusCatalog(2l,"Отклонено"));
		mapStatusCatalog.put(3l,new StatusCatalog(3l,"В работе"));
		mapStatusCatalog.put(4l,new StatusCatalog(4l,"Выполнена"));
		mapStatusCatalog.put(5l,new StatusCatalog(5l,"Просрочена"));
	}

}
