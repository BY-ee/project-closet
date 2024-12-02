import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/main/Home';
import ShoppingCart from './pages/cart/ShoppingCart';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ShoppingCart" element={<ShoppingCart />} />
    </Routes>
  </Router>
);

export default AppRoutes;
