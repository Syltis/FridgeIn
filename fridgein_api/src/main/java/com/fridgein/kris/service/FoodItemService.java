package com.fridgein.kris.service;

import com.fridgein.kris.entities.FoodItem;
import com.fridgein.kris.repositories.FoodItemJDBCRepository;
import com.fridgein.kris.repositories.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {

    private FoodItemRepository foodItemRepository;
    private FoodItemJDBCRepository foodItemJDBCRepository;

    public FoodItemService(FoodItemRepository foodItemRepository, FoodItemJDBCRepository foodItemJDBCRepository) {
        this.foodItemRepository = foodItemRepository;
        this.foodItemJDBCRepository = foodItemJDBCRepository;
    }

    public List<FoodItem> getAllFoodItems() {
        return foodItemJDBCRepository.readAll();
    }

    public FoodItem getById(long id) {
        return foodItemJDBCRepository.readById(id); }

    public void insert(FoodItem foodItem) {
        foodItemRepository.save(foodItem);
    }
}
