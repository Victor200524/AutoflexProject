package com.autoflex.services;

import com.autoflex.entities.Product;
import com.autoflex.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;;

    public List<Product> getAll(){
        return productRepository.findAll();
    }

    public Product getById(long id){
        return productRepository.findById(id).orElse(null);
    }

    public Product save(Product product) {
        try{
            Product newProduct = productRepository.save(product);
            return newProduct;
        }
        catch(Exception e){
            return null;
        }
    }

    public void deleteProduct(Long id) {
        try{
            productRepository.deleteById(id);
        }
        catch (Exception e){}
    }
}
