package com.autoflex.services;

import com.autoflex.entities.Product;
import com.autoflex.entities.ProductRawMaterial;
import com.autoflex.entities.ProductRawMaterialKey;
import com.autoflex.entities.RawMaterial;
import com.autoflex.repositories.ProductRawMaterialRepository;
import com.autoflex.repositories.ProductRepository;
import com.autoflex.repositories.RawMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductRawMaterialService {
    @Autowired
    private ProductRawMaterialRepository productRawMaterialRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    //Metod for creat link
    public ProductRawMaterial linkProductAndRawMaterial(Long productId, Long rawMaterialId, Integer quantityNeeded) {

        Product product = productRepository.findById(productId).orElse(null);
        RawMaterial rawMaterial = rawMaterialRepository.findById(rawMaterialId).orElse(null);

        if (product != null && rawMaterial != null) {
            ProductRawMaterial association = new ProductRawMaterial();

            ProductRawMaterialKey key = new ProductRawMaterialKey();
            key.setProductId(productId);
            key.setRawMaterialId(rawMaterialId);

            association.setId(key);
            association.setProduct(product);
            association.setRawMaterial(rawMaterial);
            association.setQuantityNeeded(quantityNeeded);

            return productRawMaterialRepository.save(association);
        }

        return null;
    }
}
