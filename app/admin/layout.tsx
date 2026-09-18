"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/admincommon/sidebar";
import Topbar from "@/components/admincommon/topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // No sidebar/topbar on login page and on /admin redirect page
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}