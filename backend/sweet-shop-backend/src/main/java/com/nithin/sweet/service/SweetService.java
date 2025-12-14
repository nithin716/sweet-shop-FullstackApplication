package com.nithin.sweet.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nithin.sweet.entity.Sweet;
import com.nithin.sweet.repository.SweetRepository;

import jakarta.transaction.Transactional;

@Service
public class SweetService {

    private final SweetRepository sweetRepository;

    public SweetService(SweetRepository sweetRepository) {
        this.sweetRepository = sweetRepository;
    }

    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }

    public Sweet addSweet(Sweet sweet) {
        return sweetRepository.save(sweet);
    }

    public void deleteSweet(Long id) {
        sweetRepository.deleteById(id);
    }
    public List<Sweet> searchSweets(
            String name,
            String category,
            Double minPrice,
            Double maxPrice) {

        if (name != null) {
            return sweetRepository.findByNameContainingIgnoreCase(name);
        }

        if (category != null) {
            return sweetRepository.findByCategoryIgnoreCase(category);
        }

        if (minPrice != null && maxPrice != null) {
            return sweetRepository.findByPriceBetween(minPrice, maxPrice);
        }

        return sweetRepository.findAll();
    }
    @Transactional
    public Sweet purchaseSweet(Long id, int quantity) {

        Sweet sweet = sweetRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Sweet not found"));

        if (sweet.getQuantity() < quantity) {
            throw new RuntimeException("Not enough stock");
        }

        sweet.setQuantity(sweet.getQuantity() - quantity);
        return sweetRepository.save(sweet);
    }
    @Transactional
    public Sweet restockSweet(Long id, int quantity) {

        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        sweet.setQuantity(sweet.getQuantity() + quantity);

        return sweetRepository.save(sweet);
    }
    @Transactional
    public Sweet updateSweet(Long id, Sweet updatedSweet) {

        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        sweet.setName(updatedSweet.getName());
        sweet.setCategory(updatedSweet.getCategory());
        sweet.setPrice(updatedSweet.getPrice());
        sweet.setQuantity(updatedSweet.getQuantity());

        return sweetRepository.save(sweet);
    }

}
