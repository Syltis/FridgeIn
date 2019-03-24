package com.fridgein.kris.service;

import com.fridgein.kris.config.NotFoundException;
import com.fridgein.kris.entity.StockItem;
import com.fridgein.kris.repository.StockItemJPARepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockItemService {

    private StockItemJPARepository stockItemJPARepository;

    public StockItemService(StockItemJPARepository stockItemJPARepository) {
        this.stockItemJPARepository = stockItemJPARepository;
    }

    public List<StockItem> readAllStockItems() {
       return stockItemJPARepository.findAll();
    }

    public StockItem readById(long id) {
        return stockItemJPARepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public void create(StockItem stockItem) {
        stockItemJPARepository.save(stockItem);
    }

}
