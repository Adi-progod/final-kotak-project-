package com.foodmanagement.backend.repository;

import com.foodmanagement.backend.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    boolean existsByItemName(String itemName);
    Optional<Food> findByItemName(String itemName);
    void deleteByItemName(String itemName);
}