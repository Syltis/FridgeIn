package com.fridgein.kris.service;

import com.fridgein.kris.entity.StockItem;
import com.fridgein.kris.repository.StockItemJDBCRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockItemService {

    private StockItemJDBCRepository stockItemJDBCRepository;

    public StockItemService(StockItemJDBCRepository stockItemJDBCRepository) {
        this.stockItemJDBCRepository = stockItemJDBCRepository;
    }

    public List<StockItem> readAllStockItems() {
       return stockItemJDBCRepository.readAll();
    }

    public StockItem readById(long id) {
        return stockItemJDBCRepository.readById(id);
    }

    public void create(StockItem stockItem) {
        stockItemJDBCRepository.create(stockItem);
    }

}
