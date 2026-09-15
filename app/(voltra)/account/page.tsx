"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  MapPin,
  Heart,
  User,
  LogOut,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { useStore } from "@/lib/store";

const dummyOrders = [
  {
    id: "ORD-1001",
    date: "Mar 10, 2026",
    status: "Delivered",
    total: 42999,
    items: 1,
  },
  {
    id: "ORD-1002",
    date: "Mar 5, 2026",
    status: "Shipped",
    total: 34999,
    items: 2,
  },
  {
    id: "ORD-1003",
    date: "Feb 28, 2026",
    status: "Processing",
    total: 9999,
    items: 1,
  },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useStore();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!user) return null;

  return (
    <div className="bg-[#F4F6F9] min-h-screen pb-16">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-[#0B1D36]">My Account</h1>
          <p className="text-sm text-gray-400 mt-1">Welcome back, {user.name}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 h-fit">
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00A8E8] to-[#0B1D36] text-white flex items-center justify-center text-lg font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-[#0B1D36]">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { href: "/account", icon: User, label: "Profile" },
                { href: "/account/orders", icon: Package, label: "My Orders" },
                { href: "/wishlist", icon: Heart, label: "Wishlist" },
                { href: "/cart", icon: ShoppingBag, label: "Cart" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-[#0B1D36] hover:bg-[#F0F9FF] hover:text-[#00A8E8] transition-colors"
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full"
              >
                <LogOut size={16} />
                Log out
              </button>
            </nav>
          </div>

          {/* Main */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[#0B1D36] mb-4">Profile details</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Full name</p>
                  <p className="font-medium text-[#0B1D36]">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Email</p>
                  <p className="font-medium text-[#0B1D36]">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Phone</p>
                  <p className="font-medium text-[#0B1D36]">+977 98XXXXXXXX</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Member since</p>
                  <p className="font-medium text-[#0B1D36]">March 2026</p>
                </div>
              </div>
            </div>

            {/* Recent orders */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#0B1D36]">Recent orders</h2>
                <Link href="/account/orders" className="text-sm text-[#00A8E8] font-medium hover:underline">
                  View all
                </Link>
              </div>

              <div className="space-y-3">
                {dummyOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div>
                      <p className="font-semibold text-[#0B1D36] text-sm">{order.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {order.date} · {order.items} item{order.items > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-600"
                            : order.status === "Shipped"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {order.status}
                      </span>
                      <p className="text-sm font-bold text-[#0B1D36]">
                        Rs. {order.total.toLocaleString()}
                      </p>
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}