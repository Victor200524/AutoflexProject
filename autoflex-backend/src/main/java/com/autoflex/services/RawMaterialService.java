package com.autoflex.services;

import com.autoflex.entities.RawMaterial;
import com.autoflex.repositories.RawMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RawMaterialService {
    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    public List<RawMaterial> getAllRawMaterials() {
        return rawMaterialRepository.findAll();
    }

    public RawMaterial getRawMaterialById(Long id) {
        return rawMaterialRepository.findById(id).orElse(null);
    }

    public RawMaterial save(RawMaterial rawMaterial) {
        try {
            RawMaterial newRawMaterial = rawMaterialRepository.save(rawMaterial);
            return newRawMaterial;
        }catch (Exception e) {
            return null;
        }
    }

    public void deleteRawMaterial(Long id) {
        try {
            rawMaterialRepository.deleteById(id);
        }catch (Exception e) {}
    }
}
