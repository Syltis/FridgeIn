package com.fridgein.kris.repository;

import com.fridgein.kris.entity.FoodItem;
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

    public void create(FoodItem foodItem) {
        String sql = "INSERT INTO food_item (id, name, type) VALUES (?, ?, ?)";
        jdbcTemplate.update(
                sql,
                foodItem.getId(),
                foodItem.getName(),
                foodItem.getType());
    }

}
