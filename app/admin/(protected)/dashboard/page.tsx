import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

const stats = [
  { label: "Total Products", value: "248", icon: Package, color: "bg-blue-50 text-blue-600" },
  { label: "Orders", value: "1,024", icon: ShoppingBag, color: "bg-emerald-50 text-emerald-600" },
  { label: "Customers", value: "856", icon: Users, color: "bg-violet-50 text-violet-600" },
  { label: "Revenue", value: "Rs. 12.4L", icon: DollarSign, color: "bg-amber-50 text-amber-600" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-6">Welcome to Voltora Admin</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-gray-100 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">{stat.label}</span>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
                >
                  <Icon size={18} />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#0B1D36]">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}