"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Settings,
  LogOut,
  Store,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/deals", label: "Deals", icon: Tag },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login page → no sidebar
  if (pathname === "/admin/adminlogin") {
    return <>{children}</>;
  }

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin" || pathname === "/admin/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex">
      <aside className="w-64 bg-[#0B1D36] text-white flex flex-col shrink-0">
        <div className="px-5 py-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="text-xl font-bold">
            Volt<span className="text-[#00A8E8]">ora</span>
            <span className="block text-[11px] font-normal text-white/50 mt-0.5">
              Admin Panel
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#00A8E8] text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/10"
          >
            <Store size={18} />
            View Store
          </Link>
          <Link
            href="/admin/adminlogin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-white/10"
          >
            <LogOut size={18} />
            Logout
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-6 py-4">
          <h1 className="text-lg font-semibold text-[#0B1D36]">
            {navItems.find((i) => isActive(i.href))?.label || "Admin"}
          </h1>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}