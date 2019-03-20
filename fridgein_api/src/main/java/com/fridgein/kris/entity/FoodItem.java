package com.fridgein.kris.entity;

import javax.persistence.*;

/**
 * DTO for a a food-item in the fridge
 *
 * @author Kristoffer Sylte Dahl
 */
@Entity
public class FoodItem {

    @Id
    @Column(name = "fooditem_id")
    @GeneratedValue
    private long fooditem_id;

    private String name;
    private String type;

    public long getFooditem_id() {
        return fooditem_id;
    }

    public void setFooditem_id(long fooditem_id) {
        this.fooditem_id = fooditem_id;
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
