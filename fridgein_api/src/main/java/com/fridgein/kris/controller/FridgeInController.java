package com.fridgein.kris.controller;

import com.fridgein.kris.entity.FoodItem;
import com.fridgein.kris.entity.StockItem;
import com.fridgein.kris.service.FoodItemService;
import com.fridgein.kris.service.StockItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FridgeInController {

    /**
     * The service retrieving getAllFoodItems
     */
    private FoodItemService foodItemService;
    private StockItemService stockItemService;

    public FridgeInController(FoodItemService foodItemService, StockItemService stockItemService) {
        this.foodItemService = foodItemService;
        this.stockItemService = stockItemService;
    }

    @PostMapping("/fooditem")
    public void createFoodItem(@RequestBody FoodItem foodItem) {
        foodItemService.create(foodItem);
    }

    @GetMapping("/fooditems")
    public List<FoodItem> getAllFoodItems() {
        return foodItemService.getAllFoodItems();
    }

    @PostMapping("/stockitem")
    public void createStockItem(@RequestBody StockItem stockItem) { stockItemService.create(stockItem); }

    @GetMapping("/stockitems")
    public List<StockItem> getAllStockItems() { return stockItemService.getAllStockItems(); }


}
