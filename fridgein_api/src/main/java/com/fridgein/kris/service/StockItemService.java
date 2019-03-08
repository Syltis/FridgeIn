package com.fridgein.kris.service;

import com.fridgein.kris.entities.StockItem;
import com.fridgein.kris.repositories.StockItemJDBCRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockItemService {

    private StockItemJDBCRepository stockItemJDBCRepository;

    public StockItemService(StockItemJDBCRepository stockItemJDBCRepository) {
        this.stockItemJDBCRepository = stockItemJDBCRepository;
    }

    public List<StockItem> getAllStockItems() {
       return stockItemJDBCRepository.readAll();
    }

    public StockItem getById(long id) {
        return stockItemJDBCRepository.readById(id);
    }

    public void create(StockItem stockItem) {
        stockItemJDBCRepository.create(stockItem);
    }

}
