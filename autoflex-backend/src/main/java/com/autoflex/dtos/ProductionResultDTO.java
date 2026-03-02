package com.autoflex.dtos;

import java.util.List;

public record ProductionResultDTO(List<ProductionItemDTO> items, Double totalRevenue) {
}
