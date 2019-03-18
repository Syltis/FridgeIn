package com.fridgein.kris.service;

import com.fridgein.kris.entity.FoodItem;
import com.fridgein.kris.repository.FoodItemJDBCRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {

    private FoodItemJDBCRepository foodItemJDBCRepository;

    public FoodItemService(FoodItemJDBCRepository foodItemJDBCRepository) {
        this.foodItemJDBCRepository = foodItemJDBCRepository;
    }

    public FoodItem readByName(String name) {
        return foodItemJDBCRepository.readByName(name);
    }

    public FoodItem readById(long id) {
        return foodItemJDBCRepository.readById(id); }

    public List<FoodItem> readAllFoodItems() {
        return foodItemJDBCRepository.readAll();
    }

    public void create(FoodItem foodItem) {
        foodItemJDBCRepository.create(foodItem);
    }


}
