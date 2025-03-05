import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import Spinner from './components/common/Spinner';

// Pages
import Dashboard from './components/dashboard/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import StockList from './pages/StockList';
import StockDetail from './pages/StockDetail';
import ETFList from './pages/ETFList';
import ETFDetail from './pages/ETFDetail';
import WatchlistList from './pages/WatchlistList';
import MarketOverview from './pages/MarketOverview';
// TODO: Create WatchlistDetail component
// import WatchlistDetail from './pages/WatchlistDetail';
import StockComparison from './pages/StockComparison';
import NotFound from './pages/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        // In a real app, you would verify the token with the backend
        setIsAuthenticated(true);
        setUser(JSON.parse(localStorage.getItem('user')));
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="app">
      <ToastContainer position="top-right" autoClose={3000} />
      <Header 
        isAuthenticated={isAuthenticated} 
        user={user} 
        logout={logout} 
        toggleSidebar={toggleSidebar} 
      />
      <div className="main-container">
        {isAuthenticated && <Sidebar isOpen={sidebarOpen} />}
        <main className={`content ${isAuthenticated && sidebarOpen ? 'with-sidebar' : ''}`}>
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" /> : <Login login={login} />
            } />
            <Route path="/register" element={
              isAuthenticated ? <Navigate to="/" /> : <Register login={login} />
            } />
            <Route path="/" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/stocks" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <StockList />
              </PrivateRoute>
            } />
            <Route path="/stocks/:symbol" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <StockDetail />
              </PrivateRoute>
            } />
            <Route path="/etfs" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ETFList />
              </PrivateRoute>
            } />
            <Route path="/etfs/:symbol" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ETFDetail />
              </PrivateRoute>
            } />
            <Route path="/watchlists" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <WatchlistList />
              </PrivateRoute>
            } />
            {/* TODO: Uncomment when WatchlistDetail component is created
            <Route path="/watchlists/:id" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <WatchlistDetail />
              </PrivateRoute>
            } /> */}
            <Route path="/compare" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <StockComparison />
              </PrivateRoute>
            } />
            <Route path="/market-overview" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MarketOverview />
              </PrivateRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
