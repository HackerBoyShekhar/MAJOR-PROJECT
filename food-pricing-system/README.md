# AI-Driven Food Menu Pricing System

A full-stack web application for a smart restaurant system where menu prices dynamically change based on real-time weather conditions and simulated demand.

## 🌟 Features

### User Experience
- **Dynamic Pricing Engine:** Prices adapt automatically based on custom AI rules (e.g., Hot weather boosts cold drinks, Rain boosts snacks).
- **Demand Simulation:** Prices slightly increase natively as items get ordered to simulate high-demand surges.
- **Modern UI:** Built with Tailwind CSS, featuring dark/light mode functionality and beautiful glassmorphism cards.
- **Real-time Notifications:** Custom toast notifications on orders.
- **Live Updates:** The menu refreshes prices automatically every 30 seconds.

### Admin Dashboard
- **Secure Access:** JWT-based authentication for admins.
- **Analytics Charts:** Visual tracking of Total Revenue, Orders, and Top Selling items.
- **Demand Trends Heatmap:** Live line chart tracking the internal AI demand score for predictive tracking.
- **Responsive Layout:** Engineered with Recharts for perfectly scaling visual data.

## 🚀 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Recharts, Lucide React
- **Backend:** Node.js, Express.js, Mongoose/MongoDB, JSONWebToken, bcrypt
- **External API:** OpenWeather API (Supports Mock Data if key is unavailable)

## 🛠️ Setup & Installation

### 1. Backend Setup
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Start the main server: `npm start` or `node server.js`
   *(Optional)* If you have an OpenWeather API Key, add it to a `.env` file as `OPENWEATHER_API_KEY=your_key`.

### 2. Frontend Setup
1. Navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite server: `npm run dev`

### 3. Demo Data Setup
To quickly populate the menu with mock data, run this POST request from a terminal:
```bash
curl -X POST http://localhost:5000/api/menu/seed
```
*(Windows PowerShell)*:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/menu/seed" -Method POST
```

## 🔮 Future Scope
- **Machine Learning Integration:** Implement a Python microservice with an XGBoost/LSTM model for predictive demand forecasting based on historical sales data.
- **Hardware Integration:** Push dynamic digital price-tag updates to e-ink displays in the physical restaurant.
- **User Accounts:** Allow frequent customers to have loyalty points unaffected by weather surges.
