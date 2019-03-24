package com.fridgein.kris.service;

import com.fridgein.kris.config.NotFoundException;
import com.fridgein.kris.entity.FoodItem;
import com.fridgein.kris.repository.FoodItemJPARepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {

    private FoodItemJPARepository foodItemJPARepository;

    public FoodItemService(FoodItemJPARepository foodItemJPARepository) {
        this.foodItemJPARepository = foodItemJPARepository;
    }

    public FoodItem readByName(String name) {
        return foodItemJPARepository.findByName(name);
    }

    public FoodItem readById(long id) {
        return foodItemJPARepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public List<FoodItem> readAllFoodItems() {
        return foodItemJPARepository.findAll();
    }

    public void create(FoodItem foodItem) {
        foodItemJPARepository.save(foodItem);
    }


}
