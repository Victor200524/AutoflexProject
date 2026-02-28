package com.autoflex.restControllers;

import com.autoflex.entities.Product;
import com.autoflex.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "products")
public class ProductRestController {
    @Autowired
    private ProductService productService;

    @GetMapping(value = "")
    public ResponseEntity<Object> getAll(){
        List<Product> productList = productService.getAll();
        if(productList != null && !productList.isEmpty())
            return ResponseEntity.ok(productList);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getById(@PathVariable(name = "id") Long id){
        Product product = productService.getById(id);
        if(product != null)
            return ResponseEntity.ok(product);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product as Id= " + id + " not find");
    }

    @PostMapping
    public ResponseEntity<Object> addProduct(@RequestBody Product product){
        Product newProduct = productService.save(product);
        if(product!=null)
            return ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not save");
    }

    @PutMapping
    public ResponseEntity<Object> updateProduct(@RequestBody Product product){
        Product searcedProduct = productService.getById(product.getId());
        if(searcedProduct != null){
            searcedProduct = productService.save(product);
            return ResponseEntity.ok(searcedProduct);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable(name = "id") Long id){
        Product product = productService.getById(id);
        if(product != null){
            productService.deleteProduct(id);
            return ResponseEntity.ok("Product deleted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    }
}
