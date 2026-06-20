```markdown
# 🍔 Food Item Menu Manager

A modern, full-stack web application designed to manage restaurant menu items. This project features a robust RESTful API backend connected to a MySQL database, paired with a highly responsive, beautifully styled React frontend.

## ✨ Features

* **Full-Stack CRUD Operations:** Create, Read, Update, and Delete food items in real-time.
* **Instant Search:** Filter menu items instantly by name.
* **Modern UI/UX:** Built with a beautiful "glassmorphism" aesthetic, custom background imagery, and accessible components.
* **Localization:** Automatic currency formatting using the Indian Rupee (₹) standard.
* **Responsive Design:** Fully optimized for desktop, tablet, and mobile viewing.

## 🛠️ Tech Stack

**Frontend:**
* **Framework:** React 19 + TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4
* **UI Components:** Shadcn UI (built on Radix Primitives)
* **HTTP Client:** Axios

**Backend:**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MySQL (using `mysql2` promise wrapper)
* **Middleware:** CORS, Express JSON parser

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/)

### 1. Database Setup
Open your MySQL workbench or terminal and run the following SQL command to create the necessary table:

```sql
CREATE DATABASE restaurant_db;
USE restaurant_db;

CREATE TABLE fooditem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

```

### 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install

```

Create a `.env` file in the root of the `backend` folder and add your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=restaurant_db
PORT=5000

```

Start the backend server:

```bash
node server.js

```

*The server should now be running on `http://localhost:5000`.*

### 3. Frontend Setup

Open a **second terminal** and navigate to the frontend directory:

```bash
cd frontend
npm install

```

Start the Vite development server:

```bash
npm run dev

```

*The frontend should now be running on `http://localhost:5173`.*

---

## 📡 API Endpoints

The Express backend exposes the following RESTful endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/fooditem` | Retrieves all food items (supports `?Name=` search query) |
| `POST` | `/api/fooditem` | Creates a new food item |
| `PUT` | `/api/fooditem/:id` | Updates an existing food item by ID |
| `DELETE` | `/api/fooditem/:id` | Deletes a food item by ID |

---

## 💡 Acknowledgments

* Built as a comprehensive full-stack development exercise covering database architecture, API routing, and modern frontend design patterns.

```

```