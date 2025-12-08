"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-4xl w-full bg-white/80 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-lg p-8 md:p-12 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Illustration */}
          <div className="w-full md:w-1/2 flex justify-center">
            <svg
              viewBox="0 0 600 400"
              className="w-64 h-44 md:w-80 md:h-56"
              role="img"
              aria-labelledby="notfoundTitle notfoundDesc"
            >
              <title id="notfoundTitle">Page not found</title>
              <desc id="notfoundDesc">
                Illustration showing a lost robot with a map for 404 page.
              </desc>

              <g fill="none" fillRule="evenodd">
                <rect
                  x="0"
                  y="0"
                  width="600"
                  height="400"
                  rx="24"
                  fill="#F8FAFC"
                />
                <g transform="translate(110 60)">
                  <circle cx="160" cy="120" r="96" fill="#EFF6FF" />
                  <g transform="translate(120 80)">
                    <rect
                      x="0"
                      y="0"
                      width="64"
                      height="64"
                      rx="12"
                      fill="#fff"
                    />
                    <rect
                      x="10"
                      y="10"
                      width="44"
                      height="44"
                      rx="8"
                      fill="#DBEAFE"
                      className="animate-pulse-slow"
                    />
                    <path
                      d="M-22 8 L60 70"
                      stroke="#93C5FD"
                      strokeWidth="6"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                  </g>
                </g>
                <g transform="translate(330 220)">
                  <rect
                    x="0"
                    y="0"
                    width="120"
                    height="64"
                    rx="12"
                    fill="#F1F5F9"
                  />
                  <text
                    x="12"
                    y="40"
                    fontFamily="Inter, ui-sans-serif"
                    fontSize="28"
                    fill="#64748B"
                  >
                    404
                  </text>
                </g>
              </g>
            </svg>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
              Oops — page not found
            </h1>
            <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300">
              We can’t find the page you’re looking for. It may have been moved
              or removed, or the link might be broken. Try searching or go back
              to the dashboard.
            </p>

            {/* Search */}
            <div className="mt-6 flex gap-3">
              <Input
                aria-label="Search"
                placeholder="Search pages, projects or help..."
                className="flex-1"
              />
              <Button
                onClick={() => {
                  /* Implement search action if you want; this is placeholder */
                }}
              >
                Search
              </Button>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3 items-center">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Go back
              </Button>

              <Link href="/dashboard" className="inline-block">
                <Button className="flex items-center gap-2">
                  <Home size={16} /> Dashboard
                </Button>
              </Link>

              <Link href="/contact" className="inline-block ml-auto md:ml-0">
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail size={16} /> Contact support
                </Button>
              </Link>
            </div>

            {/* Small hint */}
            <p className="mt-4 text-xs text-slate-400">
              Tip: check the URL for typos or return to the dashboard to
              continue.
            </p>
          </div>
        </div>
      </div>

      {/* Extra tiny styles for animation (Tailwind + inline tweak) */}
      <style jsx>{`
        @keyframes pulse-slow {
          0% {
            opacity: 0.55;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-4px);
          }
          100% {
            opacity: 0.55;
            transform: translateY(0);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
