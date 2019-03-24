package com.fridgein.kris.repository;

import com.fridgein.kris.entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FoodItemJPARepository extends JpaRepository<FoodItem, Long> {

    @Query(
            value = "SELECT * FROM fooditem WHERE fooditem.name = ?1",
            nativeQuery = true)
    FoodItem findByName(String name);

}
