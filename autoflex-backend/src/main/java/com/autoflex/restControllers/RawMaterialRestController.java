package com.autoflex.restControllers;

import com.autoflex.entities.Product;
import com.autoflex.entities.RawMaterial;
import com.autoflex.services.RawMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "raw-materials")
public class RawMaterialRestController {
    @Autowired
    private RawMaterialService rawMaterialService;

    @GetMapping(value = "")
    public ResponseEntity<Object> getAllRawMaterials(){
        List <RawMaterial> rawMaterialList = rawMaterialService.getAllRawMaterials();
        if(rawMaterialList != null && !rawMaterialList.isEmpty())
            return ResponseEntity.ok(rawMaterialList);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Raw material not found");
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getRawMaterialById(@PathVariable(name = "id") Long id){
        RawMaterial rawMaterial = rawMaterialService.getRawMaterialById(id);
        if(rawMaterial != null)
            return ResponseEntity.ok(rawMaterial);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Raw Materials as Id="+id+" not found");
    }

    @PostMapping
    public ResponseEntity<Object> addRawMaterial(@RequestBody RawMaterial rawMaterial){
        if(rawMaterial != null){
            RawMaterial newRawMaterial = rawMaterialService.save(rawMaterial);
            return   ResponseEntity.status(HttpStatus.CREATED).body(newRawMaterial);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Raw material not found");
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Object> updateRawMaterial(@PathVariable Long id, @RequestBody RawMaterial rawMaterial){
        RawMaterial rawMaterial1 = rawMaterialService.getRawMaterialById(id);
        if(rawMaterial1 != null){
            rawMaterial.setId(id);
            rawMaterial1 = rawMaterialService.save(rawMaterial);
            return ResponseEntity.ok(rawMaterial1);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Raw Material not found");
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> deleteRawMaterial(@PathVariable(name = "id") Long id){
        RawMaterial rawMaterial = rawMaterialService.getRawMaterialById(id);
        if(rawMaterial != null){
            rawMaterialService.deleteRawMaterial(id);
            return ResponseEntity.status(HttpStatus.OK).body("Raw material deleted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Raw material not found");
    }
}
