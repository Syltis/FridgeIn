package com.fridgein.kris.controller;

import com.fridgein.kris.entity.FoodItem;
import com.fridgein.kris.service.FoodItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/fooditem")
public class FoodItemController {

    private FoodItemService foodItemService;

    public FoodItemController(FoodItemService foodItemService) {
        this.foodItemService = foodItemService;
    }

    @PostMapping("/post")
    public void createFoodItem(@RequestBody FoodItem foodItem) {
        foodItemService.create(foodItem);
    }

    @GetMapping("/readByName")
    public FoodItem readFoodItemByName(String name) {
        return foodItemService.readByName(name); }

    @GetMapping("/readAll")
    public List<FoodItem> readAllFoodItems() {
        return foodItemService.readAllFoodItems();
    }
}
