package com.fridgein.kris.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.List;

/**
 * DTO for a a food-item in the fridge
 *
 * @author Kristoffer Sylte Dahl
 */
@Entity
@Table(name = "fooditem")
public class FoodItem {

    @Id
    @Column(name = "fooditem_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long foodItem_id;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "foodItem")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="stockItem_id")
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

    private void setStockItems(List<StockItem> stockItems) {
        this.stockItems = stockItems;
    }

    public void addStockItem(StockItem stockItem) {
        stockItems.add(stockItem);
        stockItem.setFoodItem(this);
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
