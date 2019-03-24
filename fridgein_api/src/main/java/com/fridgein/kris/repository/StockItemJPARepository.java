package com.fridgein.kris.repository;

import com.fridgein.kris.entity.StockItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockItemJPARepository extends JpaRepository<StockItem, Long> {
}
