// Hooks
import React, { createContext, useContext, useState, useCallback } from 'react';

// Components
import { call } from '../api/auth/ApiService';

const BasketContext = createContext();

export const useCart = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
  const [baskets, setBaskets] = useState([]);

  const fetchBaskets = useCallback(async () => {
    try {
      const response = await call(`/cart`);
      if (!response.ok) {
        // throw new Error('Failed to fetch carts');
      }
      setBaskets(response); // 상태 업데이트
    } catch (error) {
      console.error('Error fetching carts:', error);
    }
  }, []);

  const removeFromCart = useCallback(async (cartId) => {
    try {
      const response = await call(`/cart/${cartId}`, 'DELETE');
      if (!response.ok) {
        // throw new Error('Failed to remove item');
      }
      setBaskets((prev) => prev.filter((item) => item.cartId !== cartId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }, []);

  const addToCart = useCallback((newItem) => {
    setBaskets((prev) => [...prev, newItem]); // 이전 상태에 새 항목 추가
  }, []);

  return (
    <BasketContext.Provider
      value={{ baskets, fetchBaskets, removeFromCart, addToCart }}
    >
      {children}
    </BasketContext.Provider>
  );
};
