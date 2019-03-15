package com.fridgein.kris.controller;

import com.fridgein.kris.entity.FoodItem;
import com.fridgein.kris.entity.StockItem;
import com.fridgein.kris.service.FoodItemService;
import com.fridgein.kris.service.StockItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("api/")
public class FoodItemController {

    private FoodItemService foodItemService;

    public FoodItemController(FoodItemService foodItemService) {
        this.foodItemService = foodItemService;
    }

    @PostMapping("/fooditem")
    public void createFoodItem(@RequestBody FoodItem foodItem) {
        foodItemService.create(foodItem);
    }

    @GetMapping("/fooditems")
    public List<FoodItem> getAllFoodItems() {
        return foodItemService.getAllFoodItems();
    }
}
