"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronRight,
  User,
  Package,
  MapPin,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";
import { useStore } from "@/lib/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, token, isLoggedIn, setUser, logout } = useStore();

  const [tab, setTab] = useState<"profile" | "orders">("profile");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zip: user.address?.zip || "",
        country: user.address?.country || "",
      });
    }
  }, [isLoggedIn, user, router]);

  useEffect(() => {
    if (searchParams.get("tab") === "orders") setTab("orders");
  }, [searchParams]);

  useEffect(() => {
    if (tab !== "orders" || !token) return;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          console.error("Orders error", await res.text());
          setOrders([]);
          return;
        }
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [tab, token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setMessage("");
    try {
      const body: any = {
        name: form.name,
        phone: form.phone,
        address: {
          street: form.street,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
        },
      };
      if (newPassword.length >= 6) body.password = newPassword;

      const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Update failed");
      }
      const data = await res.json();
      setUser(data);
      setNewPassword("");
      setMessage("Profile updated successfully");
    } catch (err: any) {
      setMessage(err.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (!isLoggedIn || !user) return null;

  return (
    <div className="bg-[#F4F6F9] min-h-screen pb-16">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link href="/" className="hover:text-[#00A8E8]">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#0B1D36] font-medium">My Account</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1D36]">
            My Account
          </h1>
          <p className="text-sm text-gray-400 mt-1">{user.email}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 h-fit">
            <button
              onClick={() => setTab("profile")}
              className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold mb-1 ${
                tab === "profile"
                  ? "bg-[#F0F9FF] text-[#00A8E8]"
                  : "text-[#0B1D36] hover:bg-gray-50"
              }`}
            >
              <User size={16} /> Profile
            </button>
            <button
              onClick={() => setTab("orders")}
              className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold mb-1 ${
                tab === "orders"
                  ? "bg-[#F0F9FF] text-[#00A8E8]"
                  : "text-[#0B1D36] hover:bg-gray-50"
              }`}
            >
              <Package size={16} /> My Orders
            </button>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 mt-2"
            >
              <LogOut size={16} /> Log out
            </button>
          </div>

          <div className="lg:col-span-3">
            {tab === "profile" && (
              <form
                onSubmit={handleSave}
                className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4"
              >
                <h2 className="text-lg font-bold text-[#0B1D36] flex items-center gap-2">
                  <MapPin size={18} /> Profile & Address
                </h2>

                {message && (
                  <p className="text-sm text-[#00A8E8] bg-[#F0F9FF] px-3 py-2 rounded-xl">
                    {message}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Full name
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Contact number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="98xxxxxxxx"
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    New password (optional)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Leave blank to keep current"
                      minLength={6}
                      className="w-full px-4 py-2.5 pr-11 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Street
                  </label>
                  <input
                    value={form.street}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, street: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(["city", "state", "zip", "country"] as const).map((key) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                        {key}
                      </label>
                      <input
                        value={form[key]}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [key]: e.target.value }))
                        }
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="h-11 px-6 bg-[#0B1D36] hover:bg-[#00A8E8] text-white text-sm font-semibold rounded-xl disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </form>
            )}

            {tab === "orders" && (
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-12 text-slate-400">
                    Loading orders...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
                    <Package size={32} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-[#0B1D36] font-semibold">
                      No orders yet
                    </p>
                    <Link
                      href="/products"
                      className="text-sm text-[#00A8E8] font-medium mt-2 inline-block"
                    >
                      Start shopping
                    </Link>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white rounded-2xl border border-gray-100 p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div>
                          <p className="text-sm font-semibold text-[#0B1D36]">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                            {order.status}
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                            {order.paymentMethod} · {order.paymentStatus}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        {order.items?.map((item: any, i: number) => (
                          <div
                            key={i}
                            className="flex justify-between text-sm text-slate-600"
                          >
                            <span>
                              {item.title} × {item.quantity}
                            </span>
                            <span>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 pt-3 flex justify-between">
                        <span className="text-sm text-gray-500">Total</span>
                        <span className="font-bold text-[#0B1D36]">
                          ${Number(order.total).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}