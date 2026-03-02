package com.autoflex.repositories;

import com.autoflex.entities.ProductionLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductionLogRepository extends JpaRepository<ProductionLog, Long> {
}
