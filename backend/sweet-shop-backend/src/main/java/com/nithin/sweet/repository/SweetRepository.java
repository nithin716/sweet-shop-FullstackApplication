package com.nithin.sweet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nithin.sweet.entity.Sweet;

public interface SweetRepository extends JpaRepository<Sweet, Long> {

    List<Sweet> findByNameContainingIgnoreCase(String name);

    List<Sweet> findByCategoryIgnoreCase(String category);

    List<Sweet> findByPriceBetween(double minPrice, double maxPrice);
}
