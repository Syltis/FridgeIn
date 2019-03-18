package com.fridgein.kris.entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class StockItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private int fooditem_id;
    private String name;
    private String type;
    private Date purchaseDate;
    private Date expirationDate;

    public StockItem() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getFooditem_id() {
        return fooditem_id;
    }

    public void setFooditem_id(int fooditem_id) {
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

    public Date getPurchaseDate() { return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) { this.purchaseDate = purchaseDate;
    }

    public Date getExpirationDate() { return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) { this.expirationDate = expirationDate;
    }
}
