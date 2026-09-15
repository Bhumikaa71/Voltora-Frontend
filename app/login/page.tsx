"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(mode === "login" ? "Signed in!" : "Account created!");
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F4F6F9] px-4 py-12">
      <div className="w-full max-w-[400px]">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-[#0B1D36]">
              Volt<span className="text-[#00A8E8]">ora</span>
            </span>
          </Link>
          <p className="text-sm text-gray-400 mt-2">
            {mode === "login"
              ? "Sign in to your account"
              : "Create your free account"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-50 rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === "login"
                  ? "bg-white text-[#0B1D36] shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === "register"
                  ? "bg-white text-[#0B1D36] shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name — only register */}
            {mode === "register" && (
              <div>
                <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                  Full name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/15 text-[#0B1D36] placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Email */}
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
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/15 text-[#0B1D36] placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13px] font-medium text-[#0B1D36]">
                  Password
                </label>
                {mode === "login" && (
                  <Link
                    href="/forgot-password"
                    className="text-[12px] text-[#00A8E8] hover:underline"
                  >
                    Forgot?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          <Link href="/" className="hover:text-[#00A8E8] transition-colors">
            ← Back to store
          </Link>
        </p>
      </div>
    </div>
  );
}