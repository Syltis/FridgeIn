package com.fridgein.kris.entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class StockItem {

    @Id
    @Column(name = "stockItem_id")
    @GeneratedValue
    private long stockItem_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "foodItem_id")
    private FoodItem foodItem;

    private String name;
    private String type;
    private Date purchaseDate;
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

    public Date getPurchaseDate() { return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) { this.purchaseDate = purchaseDate;
    }

    public Date getExpirationDate() { return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) { this.expirationDate = expirationDate;
    }
}
