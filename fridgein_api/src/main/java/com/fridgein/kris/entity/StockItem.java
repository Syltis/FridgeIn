package com.fridgein.kris.entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class StockItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String type;
    private Date boughtAt;
    private Date expirationDate;

    public StockItem() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Date getBoughtAt() { return boughtAt;
    }

    public void setBoughtAt(Date boughtAt) { this.boughtAt = boughtAt;
    }

    public Date getExpirationDate() { return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) { this.expirationDate = expirationDate;
    }


}