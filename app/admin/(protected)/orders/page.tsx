/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Package, RefreshCw } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const STATUSES = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/orders/admin/all`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/admin/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed");
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o._id === id ? updated : o)));
    } catch {
      alert("Failed to update status");
    }
  };

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      Pending: "bg-amber-50 text-amber-700",
      Confirmed: "bg-blue-50 text-blue-700",
      Processing: "bg-indigo-50 text-indigo-700",
      Shipped: "bg-cyan-50 text-cyan-700",
      Delivered: "bg-emerald-50 text-emerald-700",
      Cancelled: "bg-red-50 text-red-600",
    };
    return map[s] || "bg-gray-50 text-gray-600";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Orders</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {orders.length} order{orders.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-2 h-10 px-4 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase">
                  Order
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">
                  Customer
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase">
                  Total
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">
                  Payment
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-16 text-center text-slate-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <Package
                      size={32}
                      className="mx-auto text-slate-200 mb-2"
                    />
                    <p className="text-slate-400 text-sm">No orders yet</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-slate-50 hover:bg-slate-50/50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-xs text-slate-400">
                        {order.items?.length || 0} item(s)
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-slate-800">
                        {order.user?.name ||
                          order.shippingAddress?.name ||
                          "—"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {order.user?.email || ""}
                      </p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      ${Number(order.total || 0).toFixed(2)}
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                        {order.paymentMethod || "COD"}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {order.paymentStatus || "Pending"}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={order.status || "Pending"}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border-0 cursor-pointer outline-none ${statusColor(
                          order.status
                        )}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell text-xs text-slate-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}