package com.fridgein.kris.repositories;

import com.fridgein.kris.entities.FoodItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FoodItemJDBCRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public FoodItem findById(long id) {

        String sql = "select * from FOOD_ITEM where ID=?";
        return jdbcTemplate.queryForObject(sql, new Object[] {id},
                new BeanPropertyRowMapper<>(FoodItem.class));
    }

    public List<FoodItem> getAll() {
        String sql = "select * from FOOD_ITEM";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(FoodItem.class));
    }

}
