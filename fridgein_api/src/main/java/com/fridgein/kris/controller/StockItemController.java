package com.fridgein.kris.controller;

import com.fridgein.kris.entity.StockItem;
import com.fridgein.kris.service.StockItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StockItemController {

    private StockItemService stockItemService;

    public StockItemController(StockItemService stockItemService) {
        this.stockItemService = stockItemService;
    }

    @PostMapping("/stockitem")
    public void createStockItem(@RequestBody StockItem stockItem) { stockItemService.create(stockItem); }

    @GetMapping("/stockitems")
    public List<StockItem> getAllStockItems() { return stockItemService.getAllStockItems(); }
}
