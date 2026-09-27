"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  stock?: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  stock?: string;
  rating?: number;
  reviews?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

interface Store {
  cart: CartItem[];
  wishlist: WishlistItem[];
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  cartCount: number;
  wishlistCount: number;

  setAuth: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;

  addToCart: (
    item: Omit<CartItem, "quantity"> & { quantity?: number }
  ) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCartFromServer: () => Promise<void>;

  isInWishlist: (id: string | number) => boolean;
  addToWishlist: (item: WishlistItem) => Promise<void>;
  removeFromWishlist: (id: string | number) => Promise<void>;
  syncWishlistFromServer: () => Promise<void>;
}

function authHeaders(token: string | null) {
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : { "Content-Type": "application/json" };
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      user: null,
      token: null,
      isLoggedIn: false,
      cartCount: 0,
      wishlistCount: 0,

      setAuth: (token, user) => {
        set({ token, user, isLoggedIn: true });
        if (typeof window !== "undefined") {
          localStorage.setItem("userToken", token);
        }
        get().syncCartFromServer();
        get().syncWishlistFromServer();
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isLoggedIn: false,
          cart: [],
          wishlist: [],
          cartCount: 0,
          wishlistCount: 0,
        });
        if (typeof window !== "undefined") {
          localStorage.removeItem("userToken");
        }
      },

      setUser: (user) => set({ user }),

      addToCart: async (item) => {
        const { token, cart } = get();
        const id = String(item.id);
        const qty = item.quantity || 1;
        const existing = cart.find((c) => c.id === id);
        let next: CartItem[];

        if (existing) {
          next = cart.map((c) =>
            c.id === id ? { ...c, quantity: c.quantity + qty } : c
          );
        } else {
          next = [...cart, { ...item, id, quantity: qty }];
        }
        set({
          cart: next,
          cartCount: next.reduce((s, i) => s + i.quantity, 0),
        });

        if (token) {
          await fetch(`${API_URL}/api/cart`, {
            method: "POST",
            headers: authHeaders(token),
            body: JSON.stringify({ productId: id, quantity: qty }),
          });
        }
      },

      removeFromCart: async (id) => {
        const { token, cart } = get();
        const pid = String(id);
        const next = cart.filter((c) => c.id !== pid);
        set({
          cart: next,
          cartCount: next.reduce((s, i) => s + i.quantity, 0),
        });

        if (token) {
          await fetch(`${API_URL}/api/cart/${pid}`, {
            method: "DELETE",
            headers: authHeaders(token),
          });
        }
      },

      updateQuantity: async (id, quantity) => {
        const { token, cart } = get();
        const pid = String(id);
        let next: CartItem[];
        if (quantity <= 0) {
          next = cart.filter((c) => c.id !== pid);
        } else {
          next = cart.map((c) =>
            c.id === pid ? { ...c, quantity } : c
          );
        }
        set({
          cart: next,
          cartCount: next.reduce((s, i) => s + i.quantity, 0),
        });

        if (token) {
          await fetch(`${API_URL}/api/cart`, {
            method: "PUT",
            headers: authHeaders(token),
            body: JSON.stringify({ productId: pid, quantity }),
          });
        }
      },

      clearCart: async () => {
        const { token } = get();
        set({ cart: [], cartCount: 0 });
        if (token) {
          await fetch(`${API_URL}/api/cart`, {
            method: "DELETE",
            headers: authHeaders(token),
          });
        }
      },

      syncCartFromServer: async () => {
        const { token } = get();
        if (!token) return;
        try {
          const res = await fetch(`${API_URL}/api/cart`, {
            headers: authHeaders(token),
          });
          if (!res.ok) return;
          const data = await res.json();
          const items = Array.isArray(data) ? data : [];
          set({
            cart: items,
            cartCount: items.reduce(
              (s: number, i: CartItem) => s + i.quantity,
              0
            ),
          });
        } catch {
          // ignore
        }
      },

      isInWishlist: (id) => {
        const pid = String(id);
        return get().wishlist.some((w) => w.id === pid);
      },

      addToWishlist: async (item) => {
        const { token, wishlist } = get();
        const id = String(item.id);
        if (wishlist.some((w) => w.id === id)) return;
        const next = [...wishlist, { ...item, id }];
        set({ wishlist: next, wishlistCount: next.length });

        if (token) {
          await fetch(`${API_URL}/api/wishlist`, {
            method: "POST",
            headers: authHeaders(token),
            body: JSON.stringify({ productId: id }),
          });
        }
      },

      removeFromWishlist: async (id) => {
        const { token, wishlist } = get();
        const pid = String(id);
        const next = wishlist.filter((w) => w.id !== pid);
        set({ wishlist: next, wishlistCount: next.length });

        if (token) {
          await fetch(`${API_URL}/api/wishlist/${pid}`, {
            method: "DELETE",
            headers: authHeaders(token),
          });
        }
      },

      syncWishlistFromServer: async () => {
        const { token } = get();
        if (!token) return;
        try {
          const res = await fetch(`${API_URL}/api/wishlist`, {
            headers: authHeaders(token),
          });
          if (!res.ok) return;
          const data = await res.json();
          const items = Array.isArray(data) ? data : [];
          set({ wishlist: items, wishlistCount: items.length });
        } catch {
          // ignore
        }
      },
    }),
    {
      name: "voltora-store",
      partialize: (s) => ({
        cart: s.cart,
        wishlist: s.wishlist,
        user: s.user,
        token: s.token,
        isLoggedIn: s.isLoggedIn,
        cartCount: s.cartCount,
        wishlistCount: s.wishlistCount,
      }),
    }
  )
);