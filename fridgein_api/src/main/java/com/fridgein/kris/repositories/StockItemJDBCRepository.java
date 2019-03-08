package com.fridgein.kris.repositories;

import com.fridgein.kris.entities.FoodItem;
import com.fridgein.kris.entities.StockItem;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public class StockItemJDBCRepository {

    private JdbcTemplate jdbcTemplate;

    public StockItemJDBCRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public StockItem readById(long id) {
        String sql = "select * from stock_item where id=?";
        return jdbcTemplate.queryForObject(sql, new Object[] {id},
                new BeanPropertyRowMapper<>(StockItem.class));
    }

    public List<StockItem> readAll() {
        String sql = "select * from stock_item";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(StockItem.class));
    }

    public void create(StockItem stockItem) {
        String sql = "INSERT INTO stock_item (id, name, type, bought_at, expiration_date) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                stockItem.getId(),
                stockItem.getName(),
                stockItem.getType() ,
                stockItem.getBoughtAt(),
                stockItem.getExpirationDate());
    }

}
