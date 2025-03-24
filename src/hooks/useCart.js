import { useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [
      ...prev,
      {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...item,
      },
    ]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const getTotals = () => {
    return cart.reduce(
      (acc, item) => ({
        sheets: acc.sheets + (item.materials?.sheet?.count || 0),
        pipes: acc.pipes + (item.materials?.pipe?.count || 0),
        screws: acc.screws + (item.materials?.fix?.count || 0),
        totalSum: acc.totalSum + (item.totals?.overall || 0),
      }),
      { sheets: 0, pipes: 0, screws: 0, totalSum: 0 }
    );
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotals,
  };
};
