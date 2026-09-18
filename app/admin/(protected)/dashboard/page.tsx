"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "$24,580",
    change: "+12.5%",
    icon: DollarSign,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Orders",
    value: "1,248",
    change: "+8.2%",
    icon: ShoppingBag,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Products",
    value: "86",
    change: "+3",
    icon: Package,
    color: "bg-purple-50 text-purple-600",
  },
  {
    label: "Customers",
    value: "3,421",
    change: "+18.4%",
    icon: Users,
    color: "bg-orange-50 text-orange-600",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  // Protect the page
  useEffect(() => {
    try {
      const admin = localStorage.getItem("voltora_admin");
      if (!admin) {
        router.replace("/admin/login");
      }
    } catch {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-[#0B1D36]">Welcome back, Admin</h2>
        <p className="text-sm text-gray-500 mt-1">
          Here’s what’s happening with your store today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#0B1D36] mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600 font-medium">
                    <TrendingUp size={14} />
                    {stat.change}
                  </div>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
                >
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0B1D36]">Recent Orders</h3>
            <button className="text-sm text-[#00A8E8] flex items-center gap-1 hover:underline">
              View all <ArrowUpRight size={14} />
            </button>
          </div>
          <p className="text-sm text-gray-400">No recent orders yet.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0B1D36]">Top Products</h3>
            <button className="text-sm text-[#00A8E8] flex items-center gap-1 hover:underline">
              View all <ArrowUpRight size={14} />
            </button>
          </div>
          <p className="text-sm text-gray-400">No products data yet.</p>
        </div>
      </div>
    </div>
  );
}