package com.foodmanagement.backend.controller;

import com.foodmanagement.backend.model.Food;
import com.foodmanagement.backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping
    public List<Food> getAllFood() {
        return foodService.getAllFood();
    }

    @PostMapping
    public ResponseEntity<String> addFood(@RequestBody Food food) {
        String response = foodService.addFood(food);
        if (response.equals("Item already exists")) {
            return ResponseEntity.status(409).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{itemName}")
    public ResponseEntity<Food> updateFoodQuantity(@PathVariable String itemName, @RequestParam String action) {
        try {
            return ResponseEntity.ok(foodService.updateFoodQuantity(itemName, action));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{itemName}")
    public ResponseEntity<String> deleteFood(@PathVariable String itemName) {
        try {
            foodService.deleteFood(itemName);
            return ResponseEntity.ok("Item deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}