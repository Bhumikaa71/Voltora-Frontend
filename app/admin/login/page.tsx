"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from "lucide-react";

const ADMIN = {
  email: "admin@voltora.com",
  password: "admin123",
  name: "Admin",
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already logged in as admin → go to dashboard
  useEffect(() => {
    try {
      const admin = localStorage.getItem("voltora_admin");
      if (admin) router.replace("/admin/dashboard");
    } catch {}
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (
        email.toLowerCase().trim() === ADMIN.email &&
        password === ADMIN.password
      ) {
        localStorage.setItem(
          "voltora_admin",
          JSON.stringify({ name: ADMIN.name, email: ADMIN.email })
        );
        router.push("/admin/dashboard");
      } else {
        setError("Invalid admin email or password");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0B1D36] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-100">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#00A8E8]/15 text-[#00A8E8] mb-4">
            <Shield size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Volt<span className="text-[#00A8E8]">ora</span> Admin
          </h1>
          <p className="text-sm text-white/50 mt-2">
            Sign in to the admin panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* Demo hint */}
          <div className="mb-5 p-3 bg-[#F0F9FF] rounded-xl text-[12px] text-[#0B1D36]">
            <span className="font-semibold">Demo:</span> admin@voltora.com /
            admin123
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@voltora.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/15 text-[#0B1D36] placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/15 text-[#0B1D36] placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0B1D36]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-white/40 mt-6">
          <Link href="/" className="hover:text-[#00A8E8] transition-colors">
            ← Back to store
          </Link>
        </p>
      </div>
    </div>
  );
}