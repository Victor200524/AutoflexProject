package com.autoflex.restControllers;

import com.autoflex.entities.ProductionLog;
import com.autoflex.repositories.ProductionLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "production-logs")
public class ProductionLogRestController {

    @Autowired
    private ProductionLogRepository repository;

    @GetMapping
    public List<ProductionLog> getAllLogs() {
        return repository.findAll();
    }
}