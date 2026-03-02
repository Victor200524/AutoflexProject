package com.autoflex.restControllers;

import com.autoflex.entities.Product;
import com.autoflex.entities.ProductRawMaterial;
import com.autoflex.entities.RawMaterial;
import com.autoflex.services.ProductRawMaterialService;
import com.autoflex.services.ProductService;
import com.autoflex.services.RawMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "product-raw-materials")
public class ProductRawMaterialRestController {
    @Autowired
    private ProductRawMaterialService productRawMaterialService;
    public record LinkRequestDTO(Long productId, Long rawMaterialId, Integer quantityNeeded){}


    @PostMapping
    public ResponseEntity<Object> linkProductAndRawMaterial(@RequestBody LinkRequestDTO request) {
        ProductRawMaterial linked = productRawMaterialService.linkProductAndRawMaterial(request.productId, request.rawMaterialId, request.quantityNeeded);
        if(linked != null)
            return ResponseEntity.status(HttpStatus.CREATED).body(linked);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Link of Product and Raw Material not created");
    }
}
