package com.foodmanagement.backend.service;

import com.foodmanagement.backend.model.Food;
import com.foodmanagement.backend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    public List<Food> getAllFood() {
        return foodRepository.findAll();
    }

    public String addFood(Food food) {
        if (foodRepository.existsByItemName(food.getItemName())) {
            return "Item already exists";
        }
        food.setQuantity(0); // Default to 0
        foodRepository.save(food);
        return "Item added successfully";
    }

    public Food updateFoodQuantity(String itemName, String action) {
        Food food = foodRepository.findByItemName(itemName)
                .orElseThrow(() -> new RuntimeException("Item not found: " + itemName));

        if ("increase".equalsIgnoreCase(action)) {
            food.setQuantity(food.getQuantity() + 1);
        } else if ("decrease".equalsIgnoreCase(action)) {
            int newQuantity = Math.max(0, food.getQuantity() - 1);
            food.setQuantity(newQuantity);
        }
        return foodRepository.save(food);
    }

    @Transactional
    public void deleteFood(String itemName) {
        if (!foodRepository.existsByItemName(itemName)) {
            throw new RuntimeException("Item not found");
        }
        foodRepository.deleteByItemName(itemName);
    }
}