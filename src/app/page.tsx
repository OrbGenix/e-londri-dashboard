"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/api/auth";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser({ email, password });
      router.push("/admin/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-black dark:to-gray-900 p-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-xl shadow-xl border border-white/40 dark:border-white/5">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 text-white rounded-full p-4 shadow-xl">
            🧺
          </div>
          <h1 className="text-3xl font-bold mt-4 text-gray-800 dark:text-white">
            Laundry Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            Sign in to manage orders, branches & tasks
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="•••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-6">
          © {new Date().getFullYear()} Laundry Management System
        </p>
      </div>
    </div>
  );
}
