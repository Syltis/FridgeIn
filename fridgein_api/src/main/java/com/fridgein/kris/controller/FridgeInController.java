package com.fridgein.kris.controller;

import com.fridgein.kris.entities.FoodItem;
import com.fridgein.kris.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FridgeInController {

    /**
     * The service retrieving foodItems
     */
    @Autowired
    private FoodItemService foodItemService;

    /**
     * Retrieve all foodItems in the repository {@link com.fridgein.kris.repositories.FoodItemRepository}
     *
     * @return  A list of all foodItems
     */
    @GetMapping("/fooditems")
    public List<FoodItem> foodItems() {
        return foodItemService.getAllFoodItems();
    }

    /**
     * Publish a foodItem to the repository {@link com.fridgein.kris.repositories.FoodItemRepository}
     *
     * @param foodItem
     */
    @PostMapping("/fooditem")
    public void publishFoodItem(@RequestBody FoodItem foodItem) {
        foodItemService.insert(foodItem);
    }


}
