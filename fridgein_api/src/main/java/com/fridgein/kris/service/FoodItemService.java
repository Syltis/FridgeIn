package com.fridgein.kris.service;

import com.fridgein.kris.config.NotFoundException;
import com.fridgein.kris.entity.FoodItem;
import com.fridgein.kris.entity.StockItem;
import com.fridgein.kris.repository.FoodItemJPARepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {

    private FoodItemJPARepository foodItemJPARepository;
    private StockItemService stockItemService;

    public FoodItemService(FoodItemJPARepository foodItemJPARepository, StockItemService stockItemService) {
        this.foodItemJPARepository = foodItemJPARepository;
        this.stockItemService = stockItemService;
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

    /**
     * Attempt to add a FoodItem with StockItems. If the FoodItem already exists, the StockItems are added with the FoodItem as a parent.
     *
     * @param foodItem  the FoodItem to add
     */
    public void create(FoodItem foodItem) {
        try {
            foodItemJPARepository.save(foodItem);
        }
        // If FoodItem already exists TODO: Can i check that this is the specific cause of the exception?
        catch (DataIntegrityViolationException dive) {
            // Get existing parent
            FoodItem existingParent = foodItemJPARepository.findByName(foodItem.getName());
            // Get StockItem to be inserted with existing parent
            if (foodItem.getStockItems() != null && !foodItem.getStockItems().isEmpty()) {
                StockItem child = foodItem.getStockItems().get(0);
                // Set parent and save
                child.setFoodItem(existingParent);
                stockItemService.create(child);
            }
        }
    }
}
