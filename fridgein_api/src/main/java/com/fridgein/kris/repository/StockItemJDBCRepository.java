package com.fridgein.kris.repository;

import com.fridgein.kris.entity.StockItem;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StockItemJDBCRepository {

    private JdbcTemplate jdbcTemplate;

    public StockItemJDBCRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public StockItem readById(long id) {
        String sql = "select * from stockitem where id=?";
        return jdbcTemplate.queryForObject(sql, new Object[] {id},
                new BeanPropertyRowMapper<>(StockItem.class));
    }

    public List<StockItem> readAll() {
        String sql = "select * from stockitem";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(StockItem.class));
    }

    public void create(StockItem stockItem) {
        String sql = "INSERT INTO stockitem (id, foodid, name, type, purchase_date, expiration_date) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                stockItem.getId(),
                stockItem.getFoodId(),
                stockItem.getName(),
                stockItem.getType() ,
                stockItem.getPurchaseDate(),
                stockItem.getExpirationDate());
    }

}
