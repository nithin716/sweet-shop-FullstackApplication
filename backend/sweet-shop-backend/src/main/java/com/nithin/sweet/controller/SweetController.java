package com.nithin.sweet.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nithin.sweet.entity.Sweet;
import com.nithin.sweet.service.SweetService;

@RestController
@RequestMapping("/api/sweets")
public class SweetController {

    private final SweetService sweetService;

    public SweetController(SweetService sweetService) {
        this.sweetService = sweetService;
    }

    // ✅ USER + ADMIN
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public List<Sweet> getAllSweets() {
        return sweetService.getAllSweets();
    }

    // 🔐 ADMIN ONLY
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Sweet addSweet(@RequestBody Sweet sweet) {
        return sweetService.addSweet(sweet);
    }
    

    // ADMIN ONLY
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteSweet(@PathVariable Long id) {
        sweetService.deleteSweet(id);
        return "Sweet deleted successfully";
    }
    @GetMapping("/search")
    public List<Sweet> searchSweets(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {

        return sweetService.searchSweets(name, category, minPrice, maxPrice);
    }
    @PostMapping("/{id}/purchase")
    public ResponseEntity<Sweet> purchaseSweet(
            @PathVariable Long id,
            @RequestParam int quantity) {

        return ResponseEntity.ok(sweetService.purchaseSweet(id, quantity));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/restock")
    public Sweet restockSweet(
            @PathVariable Long id,
            @RequestParam int quantity) {

        return sweetService.restockSweet(id, quantity);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> updateSweet(
            @PathVariable Long id,
            @RequestBody Sweet sweet) {

        Sweet updated = sweetService.updateSweet(id, sweet);
        return ResponseEntity.ok(updated);
    }

}
