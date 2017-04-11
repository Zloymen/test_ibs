package com.ibs.testwork;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ibs.testwork.data.Bid;
import com.ibs.testwork.data.SendAndReceivCatalog;
import com.ibs.testwork.data.StatusCatalog;
import com.ibs.testwork.resp.ManyBidResp;
import com.ibs.testwork.resp.ManySendAndRecievResp;
import com.ibs.testwork.resp.ManyStatusResp;
import com.ibs.testwork.resp.SingleBidResp;
import com.ibs.testwork.resp.restResponse;
import com.ibs.testwork.service.TestWorkService;


@Controller
@RequestMapping("/")
public class MainController {
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	private TestWorkService service;
	
	@RequestMapping(value = "/old", method = RequestMethod.GET)
	public String home(Model model) {
		logger.info("Open old!");		
		return "index";
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
		logger.info("Open main!");		
		return "main";
	}
	
	@RequestMapping(value="/bids", method=RequestMethod.GET)
	@ResponseBody
	public ManyBidResp getAllIssuers() {
 
	    List<Bid> allBids = service.getBidAll();
	    ManyBidResp extResp = new ManyBidResp(true,"get allBids" ,allBids);
	  
	    return extResp;
	}
	
	@RequestMapping(value="/status", method={RequestMethod.POST, RequestMethod.GET})
	@ResponseBody
	public ManyStatusResp getAllStatus() {
 
	    List<StatusCatalog> allStatus = service.getAllStatus();
	    ManyStatusResp extResp = new ManyStatusResp(true,"get allStatus" ,allStatus);
	  
	    return extResp;
	}
	
	@RequestMapping(value="/users", method=RequestMethod.GET)
	@ResponseBody
	public ManySendAndRecievResp getAllUsers() {
 
	    List<SendAndReceivCatalog> allUsers = service.getAllUsers();
	    ManySendAndRecievResp extResp = new ManySendAndRecievResp(true,"get allUsers" ,allUsers);
	  
	    return extResp;
	}

	@RequestMapping(value="/bids/{id}", method=RequestMethod.GET)
	  @ResponseBody
	  public SingleBidResp getBidById(@PathVariable("id") String id) {
	    Bid myBid = service.getBid(Long.valueOf(id));
	    SingleBidResp resp = null; 
	    if (myBid != null) {
	      logger.info("get Bid, returned: " + myBid.toString());
	      resp = new SingleBidResp(true, "Load Bid id=" + id, myBid);
	    } else {
	      logger.info("get Bid, id: " + id + ", NOT FOUND!");
	      resp = new SingleBidResp(false, "Not found Bid id = " + id, myBid);
	    }	  
	    return resp ;
	  }
	
	@RequestMapping(value="/bids/{id}", method=RequestMethod.DELETE)
	  @ResponseBody
	  public restResponse deleteIssuerByTicker(@PathVariable("id") String id) {
	    restResponse extResp;
	 
	    Bid deleteBid = service.deleteBid(Long.valueOf(id));
	 
	    if (deleteBid != null) {
	      logger.info("Inside delete Bid, deleted: " + deleteBid.toString());
	      extResp = new restResponse(true, "Successfully deleted bid: " + deleteBid.toString());
	    } else {
	      logger.info("Inside delete Bid, item: " + deleteBid + ", NOT FOUND!");
	      extResp = new restResponse(false, "Failed to delete bid: " + deleteBid);
	    }
	 
	    return extResp;
	  }
	
	@RequestMapping(value="/bids/{id}", method=RequestMethod.PUT)
	  @ResponseBody
	  public restResponse updateBidById(@PathVariable("id") String id,@RequestBody Bid newBid) {
	    restResponse extResp;
	    	    
	    Bid bid = service.updateBid(newBid);
	 
	    if (bid != null) {
	      logger.info("Inside update, updated: " + bid.toString());
	      extResp = new restResponse(true, "Successfully updated : " + bid.toString());
	    } else {
	      logger.info("Inside update, id: " + id + ", NOT FOUND!");
	      extResp = new restResponse(false, "Failed to update bid: " + id);
	    }
	 
	    return extResp;
	  }
	@RequestMapping(value="bid/addBid", method=RequestMethod.POST)
	  @ResponseBody
	  public SingleBidResp addBid(@ModelAttribute("bid") Bid bid) {
		SingleBidResp extResp;
		Bid createdBid = service.create(bid);
	    if (createdBid != null ) {
	      logger.info("Inside addBid, adding: " + createdBid.toString());
	      
	      extResp = new SingleBidResp(true, "Successfully added bid: " + bid.getItem(),createdBid);
	    } else {
	      logger.info("Failed to insert...");
	      extResp = new SingleBidResp(false, "Failed to insert...", null);
	    }
	 
	    return extResp;
	  }
}
