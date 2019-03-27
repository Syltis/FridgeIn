package com.fridgein.kris.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "stockitem")
public class StockItem {

    @Id
    @Column(name = "stockitem_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stockItem_id;

    @ManyToOne()
    @JoinColumn(name = "fooditem_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="foodItem_id")
    private FoodItem foodItem;

    @Column(name = "purchase_date")
    private Date purchaseDate;
    @Column(name = "expiration_date")
    private Date expirationDate;

    public long getStockItem_id() {
        return stockItem_id;
    }
    public void setStockItem_id(long stockItem_id) {
        this.stockItem_id = stockItem_id;
    }

    public FoodItem getFoodItem() {
        return foodItem;
    }
    public void setFoodItem(FoodItem foodItem) {
        this.foodItem = foodItem;
    }

    public Date getPurchaseDate() { return purchaseDate;
    }
    public void setPurchaseDate(Date purchaseDate) { this.purchaseDate = purchaseDate;
    }

    public Date getExpirationDate() { return expirationDate;
    }
    public void setExpirationDate(Date expirationDate) { this.expirationDate = expirationDate;
    }

    /**
     * Get the FoodItem's ID
     * @return the Long (ID) of the FoodItem
     */
    @JsonIgnore
    public long getFoodItemId() {
        return foodItem.getFoodItem_id();
    }
}
