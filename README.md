                       **sweet-shop-FullstackApplication Backend**
                       
This repository contains the backend service for the Sweet Shop Management System.
It is built using Spring Boot, secured with JWT authentication, and supports role-based access control for Admin and User operations.
**Tech Stack**
Java 21
Spring Boot 3
Spring Security (JWT)
Spring Data JPA
MySQL
Hibernate
Maven

**all valid apis**
POST http://localhost:8080/api/auth/register
POST http://localhost:8080/api/auth/login
POST http://localhost:8080/api/sweets (ADMIN only)
GET http://localhost:8080/api/sweets
GET http://localhost:8080/api/sweets/search
http://localhost:8080/api/sweets/search?category=Traditional&minPrice=50&maxPrice=200
PUT http://localhost:8080/api/sweets/{id}(Admin Only)
DELETE http://localhost:8080/api/sweets/{id} (admin only)
POST http://localhost:8080/api/sweets/{id}/purchase
POST http://localhost:8080/api/sweets/{id}/restock (Admin only)


