package com.fridgein.kris.controller;

import com.fridgein.kris.entity.FoodItem;
import com.fridgein.kris.service.FoodItemService;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.sql.SQLOutput;
import java.util.List;

@RestController
@RequestMapping(path = "api/fooditem")
public class FoodItemController {

    private FoodItemService foodItemService;

    public FoodItemController(FoodItemService foodItemService) {
        this.foodItemService = foodItemService;
    }

    @PostMapping(path = "/post")
    public void createFoodItem(@RequestBody FoodItem foodItem) {
        foodItemService.create(foodItem);
    }

    @GetMapping(path = "/readbyname")
    public @ResponseBody FoodItem readFoodItemByName(@RequestParam String name) {
        System.out.println("READNAME CONTROLLER ACCESSES");
        return foodItemService.readByName(name);
    }

    @GetMapping(path = "/readall")
    public List<FoodItem> readAllFoodItems() {
        return foodItemService.readAllFoodItems();
    }
}
