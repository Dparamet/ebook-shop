import Link from "next/link";
import { BookOpen, Search, ShieldAlert } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-gray-900 hover:text-blue-600 transition">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <span>E-Book Store</span>
        </Link>

        {/* Demo badge & Track */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>DEMO ONLY</span>
          </span>

          <Link
            href="/track"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">ติดตามคำสั่งซื้อ</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
