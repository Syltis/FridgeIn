package com.fridgein.kris.controller;

import com.fridgein.kris.entity.FoodItem;
import com.fridgein.kris.entity.StockItem;
import com.fridgein.kris.service.FoodItemService;
import com.fridgein.kris.service.StockItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

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

    // Rest service-testing -> https://spring.io/guides/gs/rest-service-cors/
    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @CrossOrigin(origins = "http://localhost:9000")
    @GetMapping("/greeting")
    public FoodItem greeting(@RequestParam(required = false, defaultValue = "World") String name) {
        System.out.println("==== in greeting ====");
        return new FoodItem(counter.incrementAndGet(), String.format(template, name), "test");
    }

}
