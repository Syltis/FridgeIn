package com.fridgein.kris.controller;

import com.fridgein.kris.entity.StockItem;
import com.fridgein.kris.service.StockItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stockitem")
public class StockItemController {

    private StockItemService stockItemService;

    public StockItemController(StockItemService stockItemService) {
        this.stockItemService = stockItemService;
    }

    @PostMapping("/post")
    public void createStockItem(@RequestBody StockItem stockItem) { stockItemService.create(stockItem); }

    @GetMapping("/readAll")
    public List<StockItem> readAllStockItems() { return stockItemService.readAllStockItems(); }
}
