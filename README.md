                       **sweet-shop-FullstackApplication Backend**
                       
# sweet-shop-FullstackApplication
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
**Database**
MySQL
Persistent database (not in-memory)
Tables:
users
sweets

 How to Make a User ADMIN (Manual SQL)
 
By default, every registered user is a USER.
To promote a user to ADMIN, run this SQL query:

**UPDATE users
SET role = 'ADMIN'
WHERE email = 'admin@gmail.com';**

**Authentication & Authorization**
We implemented JWT (JSON Web Token) based authentication.
How it works:
User logs in using email & password
Backend generates a JWT token
Token contains:
email
role (USER or ADMIN)
Frontend sends this token in the Authorization header:
Authorization: Bearer <JWT_TOKEN>
**Role	Permissions**
USER-	View sweets, search, purchase
ADMIN-	Add, update, delete, restock sweets
Backend validates the token for every protected API
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
**"My AI Usage"**
i used Chat.GPT as my AI campanion
**How you used them**
i use Chat.GPT to write test for my backend . and also for chechking the JWT tokens. and when i got an error which is taking more time to rectify i used AI to know about the reasons for the error.

                                              **React + Vite FrontEnd**

Sweet Shop – Frontend

# React + Vite

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

**Features**
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
**My AI Usage**
i used chat.GPT for styling my frontend pages and also when i faced a issue with the getting token from frontend i used AI to clear that error .as i had all my backend API's, AI made easier me to make the frontend application.
Admin dashboard visible only for ADMIN users
