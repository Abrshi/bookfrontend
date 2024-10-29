import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './auth/AuthForm'; 
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';
import AdminPage from './component/AdminPage/AdminPage';
import Feverite from './component/Feverite/Feverite'

function routing() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/feverite" element={<Feverite />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default routing;
