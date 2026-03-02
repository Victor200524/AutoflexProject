package com.autoflex.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "production_log")
public class ProductionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private Integer quantityProduced;
    private Double revenueGenerated;
    private LocalDateTime createdAt;

    public ProductionLog() {
        this.createdAt = LocalDateTime.now();
    }
}