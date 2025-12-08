import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-50">
      <h1 className="text-7xl font-extrabold text-gray-800">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-500 max-w-sm">
        Sorry, we couldn’t find the page you’re looking for.
      </p>

      <div className="mt-6 flex gap-3">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Go Back
          </Button>
        </Link>

        <Link href="/dashboard">
          <Button className="flex items-center gap-2">
            <Home size={16} />
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
