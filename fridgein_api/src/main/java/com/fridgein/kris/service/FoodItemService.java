package com.fridgein.kris.service;

import com.fridgein.kris.entities.FoodItem;
import com.fridgein.kris.repositories.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public void insert(FoodItem foodItem) {
        foodItemRepository.save(foodItem);
    }
}
