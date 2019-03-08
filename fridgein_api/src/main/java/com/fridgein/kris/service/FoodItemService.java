package com.fridgein.kris.service;

import com.fridgein.kris.entities.FoodItem;
import com.fridgein.kris.repositories.FoodItemJDBCRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {

    private FoodItemJDBCRepository foodItemJDBCRepository;

    public FoodItemService(FoodItemJDBCRepository foodItemJDBCRepository) {
        this.foodItemJDBCRepository = foodItemJDBCRepository;
    }

    public List<FoodItem> getAllFoodItems() {
        return foodItemJDBCRepository.readAll();
    }

    public FoodItem getById(long id) {
        return foodItemJDBCRepository.readById(id); }

    public void create(FoodItem foodItem) {
        foodItemJDBCRepository.create(foodItem);
    }
}
