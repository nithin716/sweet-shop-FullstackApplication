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

                                              **React + Vite FrontEnd**

Sweet Shop – Frontend

A modern, responsive React single-page application (SPA) for the Sweet Shop Management System, built using React + Vite + Bootstrap, and integrated with a Spring Boot backend secured with JWT authentication.

This frontend allows users to browse, search, and purchase sweets, while admin users can manage sweets and inventory.

**Tech Stack**
React (Vite)
JavaScript (ES6+)
React Router DOM
Axios
Bootstrap 5
React Toastify
JWT Decode
**Authentication**
User Registration
User Login using JWT
Token stored securely in localStorage
Role-based UI rendering (USER / ADMIN)
**User Features**
View all available sweets
Search sweets by:
Name
Category
Price range
Purchase sweets
Purchase button disabled when stock is zero
**Admin Features**
Add new sweets
Update sweet details
Delete sweets
Restock sweets

