// App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import LoginPage from './Pages/login';
import HomePage from './Pages/homepage';
import FormPage from './Pages/formpage';
import { useState } from 'react';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <Navbar setIsAuthenticated={setIsAuthenticated} />
        <div className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/form" 
          element={
            <ProtectedRoute>
              <FormPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;