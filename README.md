# Global Stock Analyzer

![Global Stock Analyzer](https://img.shields.io/badge/Version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.0.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-16.x-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0-47A248?logo=mongodb)

## 📈 Overview

Global Stock Analyzer is a comprehensive web application for analyzing and comparing global stocks and ETFs. The platform provides detailed financial information, interactive charts, and comparative analysis tools to help investors make informed decisions.

![Market Overview Screenshot](https://via.placeholder.com/800x450?text=Global+Stock+Analyzer+Screenshot)

## ✨ Features

- **Comprehensive Market Overview**: View global market indices with interactive charts and performance metrics
- **Detailed Stock Analysis**: Access in-depth information about individual stocks including price history, financials, and analyst recommendations
- **ETF Exploration**: Analyze ETFs with holdings breakdown, sector allocation, and performance metrics
- **Interactive Charts**: Visualize price history and performance with customizable time frames
- **Financial Data**: View income statements, balance sheets, and cash flow statements
- **Watchlist Management**: Create and manage watchlists to track favorite securities
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- MongoDB (v5.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/chetankhatri1/markets-app.git
   cd markets-app
   ```

2. Install backend dependencies
   ```bash
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

4. Create a `.env` file in the root directory based on `.env.example`
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

### Running the Application

1. Start the backend server
   ```bash
   npm run server
   ```

2. Start the frontend development server
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
global-stock-analyzer/
├── backend/
│   ├── config/          # Database and app configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       ├── context/     # React context
│       ├── pages/       # Page components
│       ├── App.js       # Main component
│       └── index.js     # Entry point
└── README.md
```

## 📊 Current Implementation Status

- ✅ User Authentication System
- ✅ Dashboard with Market Overview
- ✅ Stock Detail Page with Charts
- ✅ ETF Components
- ✅ Watchlist Management
- ✅ Financial Data Visualization
- ✅ Market Overview Page
- 🔄 Real-time Data Integration (In Progress)
- 🔄 Comparative Analysis Tools (In Progress)
- 📝 Portfolio Management (Planned)
- 📝 Alerts and Notifications (Planned)

## 🔧 Technologies Used

### Frontend
- React 18
- React Router
- Chart.js
- Context API for state management
- CSS Modules

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Chetan Khatri - [@chetankhatri1](https://github.com/chetankhatri1)

Project Link: [https://github.com/chetankhatri1/markets-app](https://github.com/chetankhatri1/markets-app)

---

Made with ❤️ by Chetan Khatri
