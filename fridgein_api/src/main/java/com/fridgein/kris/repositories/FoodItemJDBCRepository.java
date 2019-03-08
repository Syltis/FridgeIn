package com.fridgein.kris.repositories;

import com.fridgein.kris.entities.FoodItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FoodItemJDBCRepository {

    private JdbcTemplate jdbcTemplate;

    public FoodItemJDBCRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public FoodItem readById(long id) {
        String sql = "select * from food_item where id=?";
        return jdbcTemplate.queryForObject(sql, new Object[] {id},
                new BeanPropertyRowMapper<>(FoodItem.class));
    }

    public List<FoodItem> readAll() {
        String sql = "select * from food_item";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(FoodItem.class));
    }

    public void create(long id, String name, String type) {
        String sql = "INSERT INTO food_item (id, name, type) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, id, name, type);
    }

}
