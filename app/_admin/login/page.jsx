"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await response.json();
        setError(data.error || "Invalid credentials.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8ff] px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#4648d4] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-extrabold text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>K</span>
          </div>
          <h2 className="text-2xl font-bold text-[#131b2e]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Admin Login</h2>
          <p className="text-[#464554] text-sm mt-1">Sign in to manage your editorial platform</p>
        </div>

        <div className="bg-white border border-[#c7c4d7]/30 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#464554] mb-2">Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-3 bg-[#f2f3ff] border border-[#c7c4d7]/40 rounded-xl text-[#131b2e] placeholder-[#767586] focus:ring-2 focus:ring-[#4648d4]/30 focus:border-[#4648d4]/50 outline-none transition-all"
                placeholder="admin@think.io"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#464554] mb-2">Password</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-4 py-3 bg-[#f2f3ff] border border-[#c7c4d7]/40 rounded-xl text-[#131b2e] placeholder-[#767586] focus:ring-2 focus:ring-[#4648d4]/30 focus:border-[#4648d4]/50 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="text-[#ba0035] text-sm text-center bg-[#ffdada] border border-[#e21e49]/20 py-2 rounded-xl">{error}</div>
            )}
            <button type="submit" disabled={loading}
              className="w-full bg-[#4648d4] text-white rounded-xl py-3 font-bold hover:bg-[#6063ee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div className="mt-6 pt-5 border-t border-[#c7c4d7]/20 text-center">
            <p className="text-[11px] text-[#767586] mb-2">Demo Credentials</p>
            <p className="text-[11px] text-[#464554]">
              <span className="font-semibold">Email:</span> admin@dailyblog.com &nbsp;|&nbsp;
              <span className="font-semibold">Pass:</span> admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
