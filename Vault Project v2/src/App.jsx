import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateVaultPage from './pages/CreateVaultPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  const [page, setPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage('login');
  };

  const navigateTo = (newPage) => {
    setPage(newPage);
  };

  if (!isLoggedIn && page === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (page === 'dashboard') {
    return <DashboardPage onLogout={handleLogout} onNavigate={navigateTo} />;
  }

  if (page === 'create') {
    return <CreateVaultPage onNavigate={navigateTo} />;
  }

  if (page === 'success') {
    return <SuccessPage onNavigate={navigateTo} />;
  }

  return <DashboardPage onLogout={handleLogout} onNavigate={navigateTo} />;
}

export default App;