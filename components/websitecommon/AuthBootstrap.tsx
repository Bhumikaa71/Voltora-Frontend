"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AuthBootstrap() {
  const setAuth = useStore((s) => s.setAuth);
  const logout = useStore((s) => s.logout);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("userToken")
        : null;

    if (!token) return;

    fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          logout();
          return;
        }
        const user = await res.json();
        setAuth(token, user);
      })
      .catch(() => {
        logout();
      });
  }, [setAuth, logout]);

  return null;
}