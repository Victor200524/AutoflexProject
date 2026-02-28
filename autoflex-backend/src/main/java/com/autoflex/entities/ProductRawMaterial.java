package com.autoflex.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "product_raw_material")
public class ProductRawMaterial {
    @EmbeddedId
    private ProductRawMaterialKey id = new ProductRawMaterialKey();

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @MapsId("rawMaterialId")
    @JoinColumn(name = "raw_material_id")
    private RawMaterial rawMaterial;

    @Column(name = "quantity_needed")
    private int quantityNeeded;

    public ProductRawMaterial() {
        this(null, null, null, 0);
    }

    public ProductRawMaterial(ProductRawMaterialKey id, Product product, RawMaterial rawMaterial, Integer quantityNeeded) {
        this.id = id;
        this.product = product;
        this.rawMaterial = rawMaterial;
        this.quantityNeeded = quantityNeeded;
    }

    public ProductRawMaterialKey getId() {
        return id;
    }

    public void setId(ProductRawMaterialKey id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public RawMaterial getRawMaterial() {
        return rawMaterial;
    }

    public void setRawMaterial(RawMaterial rawMaterial) {
        this.rawMaterial = rawMaterial;
    }

    public int getQuantityNeeded() {
        return quantityNeeded;
    }

    public void setQuantityNeeded(int quantityNeeded) {
        this.quantityNeeded = quantityNeeded;
    }
}
