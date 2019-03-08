package com.fridgein.kris.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.sql.Date;

@Entity
@DiscriminatorValue("N")
public class FoodItemNExpiring extends FoodItem {

    Date boughtAt;

    public Date getBoughtAt() {
        return boughtAt;
    }

    public void setBoughtAt(Date boughtAt) {
        this.boughtAt = boughtAt;
    }
}
