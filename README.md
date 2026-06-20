# 🍔 Food Item Menu Manager

A modern, full-stack web application built as a technical assessment for managing restaurant menu items. It features a robust RESTful Node.js API backend connected to a scalable cloud database (TiDB), paired with a highly responsive, elegantly styled React frontend.

## 🔗 Live Deployment

* **Frontend (Vercel):** https://food-app-ivory-delta.vercel.app/
* **Backend API (Render):** https://food-manager-api.onrender.com

*(**Note:** The backend API is hosted on Render's free tier. If the service has been idle for 15 minutes, it may take up to 50 seconds to "wake up" upon the first initial page load. All subsequent requests will be instantaneous.)*

---

## ✨ Key Features

* **Full-Stack CRUD:** Seamlessly Create, Read, Update, and Delete food items.
* **Real-time Search:** Instantly filter available menu items by keyword.
* **Modern UI/UX:** Built with a clean "glassmorphism" aesthetic, custom background imagery, and accessible components.
* **Localization:** Automatic currency formatting utilizing the Indian Rupee (₹) standard via the `Intl.NumberFormat` API.
* **Fully Responsive:** Optimized for all screen sizes (Mobile, Tablet, and Desktop).

---

## 🛠️ Technology Stack

**Frontend (`/frontend`)**
* **Framework:** React 19 + TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4
* **HTTP Client:** Axios

**Backend (`/backend`)**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MySQL (Hosted on TiDB Cloud Serverless)
* **Packages:** `mysql2` (Connection Pool), `cors`, `dotenv`

---

## 📂 Repository Structure

This project is organized as a monorepo containing both the client and server codebases:

```text
├── backend/                # Node.js/Express API server
│   ├── server.js           # Main application entry point & route definitions
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Example environment variables
└── frontend/               # React/Vite UI application
    ├── src/                # React components, styles, and logic
    ├── public/             # Static assets (backgrounds, icons)
    └── package.json        # Frontend dependencies

```

---

## 🚀 Local Installation & Setup

If you wish to run this application locally, follow these steps:

### Prerequisites

* [Node.js](https://www.google.com/search?q=https://nodejs.org/) (v18 or higher)
* Git

### 1. Clone the Repository

```bash
git clone [https://github.com/Meet-02/Food-app.git](https://github.com/Meet-02/Food-app.git)
cd Food-app

```

### 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install

```

Create a `.env` file in the `backend` directory. *(Note: The live database is currently hosted on TiDB Cloud. You can use your own local MySQL credentials or the provided cloud credentials if shared privately)*:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=food_menu_db
DB_PORT=3306
PORT=5000

```

Start the backend server:

```bash
node server.js

```

*The API will run at `http://localhost:5000`.*

### 3. Frontend Setup

Open a **second terminal** and navigate to the frontend directory:

```bash
cd frontend
npm install

```

In `frontend/src/App.tsx`, ensure the `API_URL` points to your local server for testing:

```typescript
const API_URL = "http://localhost:5000/api/fooditem";

```

Start the Vite development server:

```bash
npm run dev

```

*The frontend will run at `http://localhost:5173`.*

---

## 📡 REST API Endpoints

The Express backend exposes the following endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/fooditem` | Retrieves all items. Supports keyword search via `?Name=[keyword]` |
| `POST` | `/api/fooditem` | Creates a new food item |
| `GET` | `/api/fooditem/:id` | Retrieves a specific food item by its ID |
| `PUT` | `/api/fooditem/:id` | Updates an existing food item by ID |
| `DELETE` | `/api/fooditem/:id` | Deletes a specific food item by ID |
| `DELETE` | `/api/fooditem` | Deletes **all** food items in the database |


```

```