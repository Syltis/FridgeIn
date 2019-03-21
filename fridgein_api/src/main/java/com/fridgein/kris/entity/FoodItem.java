package com.fridgein.kris.entity;

import javax.persistence.*;
import java.util.List;

/**
 * DTO for a a food-item in the fridge
 *
 * @author Kristoffer Sylte Dahl
 */
@Entity
public class FoodItem {

    @Id
    @Column(name = "foodItem_id")
    @GeneratedValue
    private long foodItem_id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "foodItem")
    private List<StockItem> stockItems;

    private String name;
    private String type;

    public long getFoodItem_id() {
        return foodItem_id;
    }

    public void setFoodItem_id(long foodItem_id) {
        this.foodItem_id = foodItem_id;
    }

    public List<StockItem> getStockItems() {
        return stockItems;
    }

    public void setStockItems(List<StockItem> stockItems) {
        this.stockItems = stockItems;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
