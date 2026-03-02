package com.autoflex.restControllers;

import com.autoflex.dtos.ProductionResultDTO;
import com.autoflex.services.ProductionCalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "productions")
public class ProductionCalculationRestController {

    @Autowired
    private ProductionCalculationService calculationService;

    @GetMapping(value = "/calculate")
    public ResponseEntity<ProductionResultDTO> calculateMaxProduction() {

        ProductionResultDTO result = calculationService.calculateMaxProduction();
        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/confirm")
    public ResponseEntity<Object> confirmProduction() {
        try {
            calculationService.confirmProduction();
            return ResponseEntity.ok("Production confirmed and stock updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating stock: " + e.getMessage());
        }
    }
}
