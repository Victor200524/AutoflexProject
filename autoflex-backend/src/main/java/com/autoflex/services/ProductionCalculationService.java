package com.autoflex.services;


import com.autoflex.dtos.ProductionItemDTO;
import com.autoflex.dtos.ProductionResultDTO;
import com.autoflex.entities.Product;
import com.autoflex.entities.ProductRawMaterial;
import com.autoflex.entities.ProductionLog;
import com.autoflex.entities.RawMaterial;
import com.autoflex.repositories.ProductRawMaterialRepository;
import com.autoflex.repositories.ProductRepository;
import com.autoflex.repositories.ProductionLogRepository;
import com.autoflex.repositories.RawMaterialRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductionCalculationService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private RawMaterialRepository rawMaterialRepository;
    @Autowired
    private ProductRawMaterialRepository productRawMaterialRepository;
    @Autowired
    private ProductionLogRepository productionLogRepository;

    public ProductionResultDTO calculateMaxProduction() {

        Map<Long, Integer> virtualStock = new HashMap<>();
        List<RawMaterial> allMaterials = rawMaterialRepository.findAll();
        for (RawMaterial rm : allMaterials) {
            virtualStock.put(rm.getId(), rm.getStockQuantity());
        }

        List<Product> productsSortedByPrice = productRepository.findAllByOrderByValueDesc();

        List<ProductionItemDTO> productionList = new ArrayList<>();
        double totalRevenue = 0.0;

        for (Product product : productsSortedByPrice) {

            List<ProductRawMaterial> recipe = productRawMaterialRepository.findByProductId(product.getId());

            if (!recipe.isEmpty()) {

                int maxPossibleToMake = Integer.MAX_VALUE;

                for (ProductRawMaterial item : recipe) {
                    Long rawMaterialId = item.getRawMaterial().getId();
                    int requiredQuantity = item.getQuantityNeeded();
                    int currentStock = virtualStock.getOrDefault(rawMaterialId, 0);

                    if (requiredQuantity != 0) {
                        int canMakeWithThisMaterial = currentStock / requiredQuantity;

                        if (canMakeWithThisMaterial < maxPossibleToMake) {
                            maxPossibleToMake = canMakeWithThisMaterial;
                        }
                    }
                }

                if (maxPossibleToMake > 0 && maxPossibleToMake != Integer.MAX_VALUE) {

                    for (ProductRawMaterial item : recipe) {
                        Long rawMaterialId = item.getRawMaterial().getId();
                        int usedQuantity = item.getQuantityNeeded() * maxPossibleToMake;
                        int newStock = virtualStock.get(rawMaterialId) - usedQuantity;
                        virtualStock.put(rawMaterialId, newStock);
                    }

                    double unitValue = product.getValue();
                    double subtotal = maxPossibleToMake * unitValue;
                    totalRevenue += subtotal;

                    productionList.add(new ProductionItemDTO(product.getName(), maxPossibleToMake, unitValue));
                }
            }
        }
        return new ProductionResultDTO(productionList, totalRevenue);
    }

    @Transactional
    public void confirmProduction() {
        ProductionResultDTO result = calculateMaxProduction();

        for (ProductionItemDTO itemDTO : result.items()) {
            Product product = productRepository.findByName(itemDTO.productName());

            if (product != null) {
                ProductionLog log = new ProductionLog();
                log.setProductName(itemDTO.productName());
                log.setQuantityProduced(itemDTO.quantityToProduce());

                double revenue = itemDTO.quantityToProduce() * (itemDTO.unitValue() != null ? itemDTO.unitValue() : 0.0);
                log.setRevenueGenerated(revenue);

                productionLogRepository.save(log);

                List<ProductRawMaterial> recipe = productRawMaterialRepository.findByProductId(product.getId());

                for (ProductRawMaterial recipeItem : recipe) {
                    RawMaterial material = recipeItem.getRawMaterial();

                    int usedQuantity = recipeItem.getQuantityNeeded() * itemDTO.quantityToProduce();

                    int newStock = material.getStockQuantity() - usedQuantity;
                    material.setStockQuantity(Math.max(0, newStock));

                    rawMaterialRepository.save(material);
                }
            }
        }
    }
}
