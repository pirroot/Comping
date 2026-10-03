'use client';

import { useSyncExternalStore } from 'react';
import {
  addToCart,
  clearCart,
  getCartSnapshot,
  getServerCartSnapshot,
  removeFromCart,
  setCartQuantity,
  subscribeCart,
} from '@/stores/cartStore';

export function useCart() {
  const items = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );
  return {
    items,
    count: items.reduce((count, item) => count + item.quantity, 0),
    add: addToCart,
    setQuantity: setCartQuantity,
    remove: removeFromCart,
    clear: clearCart,
  };
}