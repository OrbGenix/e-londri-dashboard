"use client";

import { loginUser } from "@/utils/api/auth";
import { AxiosError } from "axios";
import { Eye, EyeOff, Loader2, Shield } from "lucide-react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser({ email, password });
      router.push("/admin/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setShake(true);
      setTimeout(() => setShake(false), 500);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail("admin@gmail.com");
    setPassword("admin");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 h-60 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className={`w-full max-w-md transition-all duration-300 ${shake ? 'animate-shake' : ''}`}>
          <div className="p-8 rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-sm border border-white/20 dark:border-white/10">
            <div className="flex flex-col items-center mb-10">
              <div className="flex items-center gap-2 mt-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
                  eLaundry
                </h1>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full p-4 pl-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900/30 outline-none transition-all duration-200"
                    placeholder="admin@laundry.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full p-4 pl-11 pr-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900/30 outline-none transition-all duration-200"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Shield className="w-5 h-5 text-gray-400" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5 mr-2 inline" />
                      Authenticating...
                    </>
                  ) : (
                    "Login"
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="text-center space-y-3">
                {/* Demo Credentials Hint */}
                <div>
                  <div
                    onClick={handleDemoLogin}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 group"
                  >
                    <span className="text-xs text-gray-500 dark:text-gray-400">💡 Demo:</span>
                    <code className="text-xs font-mono text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      admin@gmail.com / admin
                    </code>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    Click to auto-fill demo credentials
                  </p>
                </div>


              </div>
            </div>
          </div>
          {/* Centered footer text */}
          <div className='pt-4'>
            <p className="flex items-center justify-center gap-2  text-sm text-gray-600 dark:text-gray-400 mb-2">
              Laundry Management System
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-gray-500 dark:text-gray-500">Powered by</span>
              <Link
                href="https://orbgenix.com"
                target="_blank"
                className="font-semibold text-purple-600 hover:text-purple-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
              >
                OrbGenix
              </Link>
              <span className="text-gray-400 dark:text-gray-600">•</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">v1.0</span>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}