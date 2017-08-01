package com.ibs.testwork;

import com.ibs.testwork.data.Bid;
import com.ibs.testwork.data.SendAndReceivCatalog;
import com.ibs.testwork.data.StatusCatalog;
import com.ibs.testwork.resp.*;
import com.ibs.testwork.service.TestWorkService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping("/")
public class MainController {
    private static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);

    @Autowired
    private TestWorkService service;

    @RequestMapping(value = "/old", method = RequestMethod.GET)
    public String home(Model model) {
        LOGGER.debug("Open old!");
        return "main";
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home() {
        LOGGER.debug("Open main!");
        return "index";
    }

    @RequestMapping(value = "/bids", method = RequestMethod.GET)
    @ResponseBody
    public ManyBidResp getAllIssuers() {
        List<Bid> allBids = service.getBidAll();
        return new ManyBidResp(true, "get allBids", allBids);
    }

    @RequestMapping(value = "/status", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public ManyStatusResp getAllStatus() {
        List<StatusCatalog> allStatus = service.getAllStatus();
        return new ManyStatusResp(true, "get allStatus", allStatus);
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    @ResponseBody
    public ManySendAndRecievResp getAllUsers() {

        List<SendAndReceivCatalog> allUsers = service.getAllUsers();
        return new ManySendAndRecievResp(true, "get allUsers", allUsers);
    }

    @RequestMapping(value = "/bids/{id}", method = RequestMethod.GET)
    @ResponseBody
    public SingleBidResp getBidById(@PathVariable("id") String id) {
        Bid myBid = service.getBid(Long.valueOf(id));
        if (myBid != null) {
            LOGGER.debug("get Bid, returned: " + myBid.toString());
            return new SingleBidResp(true, "Load Bid id=" + id, myBid);
        } else {
            LOGGER.debug("get Bid, id: " + id + ", NOT FOUND!");
            return new SingleBidResp(false, "Not found Bid id = " + id, null);
        }
    }

    @RequestMapping(value = "/bids/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public restResponse deleteIssuerByTicker(@PathVariable("id") String id) {
        Bid deleteBid = service.deleteBid(Long.valueOf(id));

        if (deleteBid != null) {
            LOGGER.debug("Inside delete Bid, deleted: " + deleteBid.toString());
            return new restResponse(true, "Successfully deleted bid: " + deleteBid.toString());
        } else {
            LOGGER.debug("Inside delete Bid, item: " + id + ", NOT FOUND!");
            return new restResponse(false, "Failed to delete bid: " + id);
        }

    }

    @RequestMapping(value = "/bids/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public restResponse updateBidById(@PathVariable("id") String id, @RequestBody Bid newBid) {

        Bid bid = service.updateBid(newBid);

        if (bid != null) {
            LOGGER.debug("Inside update, updated: " + bid.toString());
            return new restResponse(true, "Successfully updated : " + bid.toString());
        } else {
            LOGGER.debug("Inside update, id: " + id + ", NOT FOUND!");
            return new restResponse(false, "Failed to update bid: " + id);
        }

    }

    @RequestMapping(value = "bid/addBid", method = RequestMethod.POST)
    @ResponseBody
    public SingleBidResp addBid(@ModelAttribute("bid") Bid bid) {
        Bid createdBid = service.create(bid);
        if (createdBid != null) {
            LOGGER.debug("Inside addBid, adding: " + createdBid.toString());
            return new SingleBidResp(true, "Successfully added bid: " + bid.getItem(), createdBid);
        } else {
            LOGGER.debug("Failed to insert...");
            return new SingleBidResp(false, "Failed to insert...", null);
        }

    }
}
