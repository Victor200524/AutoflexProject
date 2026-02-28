package com.autoflex.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable //class is built-in as key others in entities
public class ProductRawMaterialKey implements Serializable {

    @Column(name =  "product_id")
    private Long productId;

    @Column(name = "raw_material_id")
    private Long rawMaterialId;

    public ProductRawMaterialKey() {
        this(0L, 0L);
    }

    public ProductRawMaterialKey(Long productId, Long rawMaterialId) {
        this.productId = productId;
        this.rawMaterialId = rawMaterialId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getRawMaterialId() {
        return rawMaterialId;
    }

    public void setRawMaterialId(Long rawMaterialId) {
        this.rawMaterialId = rawMaterialId;
    }
}
