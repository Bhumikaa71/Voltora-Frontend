"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const admin = localStorage.getItem("voltora_admin");
      if (admin) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/admin/login");
      }
    } catch {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6F9]">
      <div className="w-6 h-6 border-2 border-[#0B1D36]/20 border-t-[#00A8E8] rounded-full animate-spin" />
    </div>
  );
}