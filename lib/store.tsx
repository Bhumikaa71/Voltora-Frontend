"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  quantity: number;
  stock?: string;
}

export interface WishlistItem {
  id: number | string;
  title: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  image: string;
  stock?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

const DUMMY_USER = {
  id: "1",
  name: "Bhumika Bista",
  email: "baumabista@gmail.com",
  password: "bhumika123",
};

interface StoreContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number | string) => void;
  isInWishlist: (id: number | string) => boolean;
  cartCount: number;
  wishlistCount: number;
  // Auth
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  isLoggedIn: boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("voltora_cart");
      const savedWishlist = localStorage.getItem("voltora_wishlist");
      const savedUser = localStorage.getItem("voltora_user");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("voltora_cart", JSON.stringify(cart));
  }, [cart, loaded]);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("voltora_wishlist", JSON.stringify(wishlist));
  }, [wishlist, loaded]);

  useEffect(() => {
    if (!loaded) return;
    if (user) {
      localStorage.setItem("voltora_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("voltora_user");
    }
  }, [user, loaded]);

  const addToCart = (item: Omit<CartItem, "quantity">, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + qty } : p
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeFromCart = (id: number | string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: number | string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  };

  const clearCart = () => setCart([]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number | string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const isInWishlist = (id: number | string) =>
    wishlist.some((p) => p.id === id);

  // ✅ This is the missing function
  const login = (email: string, password: string) => {
    if (
      email.toLowerCase().trim() === DUMMY_USER.email &&
      password === DUMMY_USER.password
    ) {
      setUser({
        id: DUMMY_USER.id,
        name: DUMMY_USER.name,
        email: DUMMY_USER.email,
      });
      return { ok: true };
    }
    return { ok: false, error: "Invalid email or password" };
  };

  const logout = () => setUser(null);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        cartCount,
        wishlistCount,
        user,
        login,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}