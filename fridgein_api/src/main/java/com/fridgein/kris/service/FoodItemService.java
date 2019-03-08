package com.fridgein.kris.service;

import com.fridgein.kris.entities.FoodItem;
import com.fridgein.kris.repositories.FoodItemJDBCRepository;
import com.fridgein.kris.repositories.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;
    @Autowired
    private FoodItemJDBCRepository foodItemJDBCRepository;

    public List<FoodItem> getAllFoodItems() {
        return foodItemJDBCRepository.getAll();
    }

    public FoodItem getById(long id) {
        return foodItemJDBCRepository.findById(id); }

    public void insert(FoodItem foodItem) {
        foodItemRepository.save(foodItem);
    }
}
