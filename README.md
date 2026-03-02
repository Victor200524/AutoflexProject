# 🚀 Autoflex Inventory & Production System

A comprehensive **Inventory Management and Production Planning** solution developed as a technical assessment for Autoflex. The system provides precise control over raw materials and optimizes manufacturing output based on real-time stock availability.

---

## 📋 Problem Description
The challenge was to build a platform that manages raw material inventory and suggests an ideal production plan. The core technical differentiator is the **Smart Prioritization Logic**: the system calculates maximum production by prioritizing high-value products first, ensuring the best financial return for the operation.

## ✨ Key Features

* **Raw Material Management:** Full CRUD operations and real-time stock balance tracking.
* **Product Management:** Complete CRUD for final products including market value definition.
* **Dynamic Recipes:** Association of multiple raw materials to a single product with specific required quantities.
* **Production Dashboard:** Interactive interface listing the suggested production plan and estimated total revenue.
* **Automatic Stock Deduction:** Upon confirmation, the system automatically subtracts the consumed materials from the PostgreSQL database.
* **Production History:** Persistent logging of every production cycle, including timestamps, quantities, and generated revenue.
* **PDF Exporting:** Generation of professional PDF reports for production orders and historical audits.

---

## 🛠️ Tech Stack & Architecture

The project follows high-standard development requirements:

* **Back-end (API):** Built with **Java 17** and **Spring Boot**, using JPA/Hibernate for persistence.
* **Front-end:** Developed with **Next.js (React)** for a fast, modern user experience.
* **Database:** **PostgreSQL** (hosted via Neon Console).
* **Styling:** **Tailwind CSS** for full responsiveness across mobile and desktop devices.
* **API Documentation:** **Swagger (OpenAPI)** implementation for easy endpoint testing and integration.

---

## 🏗️ Requirements Compliance (RNFs & RFs)

The system fully meets the assessment criteria:
* **RNF007:** All coding (variables, classes, tables) is written in **English**.
* **RNF002:** Clear decoupling between **Back-end (API)** and **Front-end**.
* **RF004:** Production suggestion logic based strictly on stock levels and value-based prioritization.

---

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/autoflex-inventory.git](https://github.com/your-username/autoflex-inventory.git)
    ```

2.  **Back-end Setup:**
    * Ensure **JDK 17** is installed.
    * Configure database credentials in `application.properties`.
    * Run via IDE or terminal: `./mvnw spring-boot:run`.

3.  **Front-end Setup:**
    * Navigate to the frontend directory.
    * Install dependencies: `npm install`.
    * Start the development server: `npm run dev`.

---

## 👨‍💻 Developer

**Victor**
**Computer Science Student (7th Term)** at **Unoeste**. 
Technical background from **SENAI** (Machining Mechanics). Currently focused on developing ERP solutions and innovative **Computer Vision** applications for bodybuilding pose analysis (Senior Project/TCC).

---
*This project was developed as part of the technical selection process for Autoflex.*
