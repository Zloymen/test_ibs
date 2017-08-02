package com.ibs.testwork.service;

import com.ibs.testwork.data.Bid;
import com.ibs.testwork.data.SendAndReceivCatalog;
import com.ibs.testwork.data.StatusCatalog;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@Service("MainService")
public class TestWorkServiceImp implements TestWorkService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestWorkService.class);


    /**
     * хранилище заявок
     */
    private static Map<Long, Bid> mapBid = new HashMap<>();
    /**
     * хранилище пользователей
     */
    private static Map<Long, SendAndReceivCatalog> mapUserCatalog = new HashMap<>();
    /**
     * хранилище статусов
     */
    private static Map<Long, StatusCatalog> mapStatusCatalog = new HashMap<>();

    public List<Bid> getBidAll() {
        LOGGER.info("getBidAll");
        return new ArrayList<>(mapBid.values());
    }

    public Bid getBid(Long id) {
        LOGGER.info("getBid id=" + id);
        return mapBid.get(id);
    }

    public Bid deleteBid(Long id) {
        LOGGER.info("deleteBid id=" + id);
        return mapBid.remove(id);
    }

    public Bid updateBid(Bid newBid) {
        mapBid.replace(newBid.getItem(), newBid);
        LOGGER.info("updateBid id=" + newBid.getItem() + " " + newBid.toString());
        return mapBid.get(newBid.getItem());
    }

    public List<Bid> deleteAll() {
        LOGGER.info("deleteAll");
        List<Bid> arr = new ArrayList<>(mapBid.values());
        mapBid.clear();
        return arr;
    }

    public Bid create(Bid bid) {
        Set<Long> setBid = mapBid.keySet();
        Long maxId = Collections.max(setBid);
        bid.setItem(++maxId);
        mapBid.put(bid.getItem(), bid);
        LOGGER.info("create id =" + maxId + " " + bid.toString());
        return mapBid.get(maxId);
    }

    public List<SendAndReceivCatalog> getAllUsers() {
        LOGGER.info("getAllUsers");
        return new ArrayList<>(mapUserCatalog.values());
    }

    public SendAndReceivCatalog getUser(Long id) {
        LOGGER.info("getUser id = " + id);
        return mapUserCatalog.get(id);
    }

    public List<StatusCatalog> getAllStatus() {
        LOGGER.info("getAllStatus" + mapStatusCatalog.size());
        return new ArrayList<>(mapStatusCatalog.values());
    }

    public StatusCatalog getStatus(Long id) {
        LOGGER.info("getStatus id = " + id);
        return mapStatusCatalog.get(id);
    }


    @PostConstruct
    void init() {
        for (int i = 1; i <= new Random().nextInt(200); i++) {
            long l = (long)i;
            mapBid.put(l, new Bid(l, "Заявка #" + i, (long) (1 + new Random().nextInt(11)), (long) (1 + new Random().nextInt(11)), (long) (1 + new Random().nextInt(4)), "Test" + i));
        }

        mapUserCatalog.put(1L, new SendAndReceivCatalog(1L, "Куляница Андрей Леонидович"));
        mapUserCatalog.put(2L, new SendAndReceivCatalog(2L, "Аспидов Вячеслав Владимирович"));
        mapUserCatalog.put(3L, new SendAndReceivCatalog(3L, "Фоминых Станислав Борисович"));
        mapUserCatalog.put(4L, new SendAndReceivCatalog(4L, "Черкасова Вероника Сергеевна"));
        mapUserCatalog.put(5L, new SendAndReceivCatalog(5L, "Абрамов Владимир Львович"));
        mapUserCatalog.put(6L, new SendAndReceivCatalog(6L, "Дмитриев Иван Петрович"));
        mapUserCatalog.put(7L, new SendAndReceivCatalog(7L, "Маркина Екатерина Юрьевна"));
        mapUserCatalog.put(8L, new SendAndReceivCatalog(8L, "Сабанин Антон Анатольевич"));
        mapUserCatalog.put(9L, new SendAndReceivCatalog(9L, "Королёв Анатолий Сергеевич"));
        mapUserCatalog.put(10L, new SendAndReceivCatalog(10L, "Гизатуллин Булат Максутович"));
        mapUserCatalog.put(11L, new SendAndReceivCatalog(11L, "Порошин Олег Владиславович"));
        mapUserCatalog.put(12L, new SendAndReceivCatalog(12L, "Закржевский Ринат Радикович"));


        mapStatusCatalog.put(1L, new StatusCatalog(1L, "Новая"));
        mapStatusCatalog.put(2L, new StatusCatalog(2L, "Отклонено"));
        mapStatusCatalog.put(3L, new StatusCatalog(3L, "В работе"));
        mapStatusCatalog.put(4L, new StatusCatalog(4L, "Выполнена"));
        mapStatusCatalog.put(5L, new StatusCatalog(5L, "Просрочена"));
    }

}
