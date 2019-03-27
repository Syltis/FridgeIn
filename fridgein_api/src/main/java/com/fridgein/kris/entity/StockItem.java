package com.fridgein.kris.entity;

import com.fasterxml.jackson.annotation.*;
import io.micrometer.core.lang.Nullable;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "stockitem")
public class StockItem {

    @Id
    @Column(name = "stockitem_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stockItem_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fooditem_id")
    /*@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="foodItem_id")*/
    @JsonBackReference
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

    @JsonIgnore
    public FoodItem getFoodItem() {
        return foodItem;
    }
    @JsonIgnore
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

    public long getFoodItemId() {
        return foodItem.getFoodItem_id();
    }

    public String getFoodItemName() {
        return foodItem.getName();
    }

    public String getFoodItemType() {
        return foodItem.getType();
    }
}
