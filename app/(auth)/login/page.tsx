"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useStore();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/account");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (mode === "login") {
        const result = login(email.trim(), password);
        if (result.ok) {
          router.push("/account");
        } else {
          setError(result.error || "Invalid email or password");
        }
      } else {
        setError(
          "Registration is demo only. Use: baumabista@gmail.com / bhumika123"
        );
      }
      setLoading(false);
    }, 500);
  };

  const handleGoogle = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      const result = login("baumabista@gmail.com", "bhumika123");
      if (result.ok) {
        router.push("/account");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F4F6F9] px-4 py-12">
      <div className="w-full max-w-[400px]">
        {/* Brand */}
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
          <div className="flex gap-1 bg-gray-50 rounded-xl p-1 mb-5">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === "login"
                  ? "bg-white text-[#0B1D36] shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
              }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === "register"
                  ? "bg-white text-[#0B1D36] shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* Demo credentials */}
          <div className="mb-5 p-3 bg-[#F0F9FF] rounded-xl text-[12px] text-[#0B1D36]">
            <span className="font-semibold">Demo account:</span>
            <br />
            baumabista@gmail.com / bhumika123
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full h-11 flex items-center justify-center gap-2.5 border border-gray-200 rounded-xl text-sm font-medium text-[#0B1D36] hover:bg-gray-50 hover:border-gray-300 transition-all mb-5 disabled:opacity-60"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/15 text-[#0B1D36] placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

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

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 mt-1"
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

        <p className="text-center text-sm text-gray-400 mt-6">
          <Link href="/" className="hover:text-[#00A8E8] transition-colors">
            ← Back to store
          </Link>
        </p>
      </div>
    </div>
  );
}