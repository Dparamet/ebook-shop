import Link from "next/link";
import Navbar from "@/components/Navbar";
import { BOOKS } from "@/data/books";
import { BookOpen, ShoppingCart, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Demo Warning Banner */}
      <div className="bg-amber-500 text-white text-xs sm:text-sm font-medium py-2 px-4 text-center flex items-center justify-center gap-2 shadow-inner">
        <ShieldAlert className="w-4 h-4 flex-shrink-0" />
        <span>ระบบนี้เป็นงานสาธิต (Demo Only) — ไม่มีการเรียกเก็บเงินจริงทุกกรณี</span>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital E-book Store</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            คลังหนังสือดิจิทัลสำหรับนักพัฒนา
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            เลือกซื้อ E-book คุณภาพ ดาวน์โหลดได้ทันทีหลังจำลองการชำระเงิน พร้อมรับลิงก์ดาวน์โหลดทางอีเมล
          </p>
        </div>

        {/* E-book Catalog (3 items minimum) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BOOKS.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
              {/* Cover Art Gradient */}
              <div
                className={`h-48 bg-gradient-to-br ${book.coverColor} p-6 flex flex-col justify-between text-white relative`}
              >
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-semibold tracking-wide">
                    {book.badge}
                  </span>
                  <BookOpen className="w-6 h-6 opacity-60" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider opacity-80 mb-1">{book.format}</p>
                  <h3 className="font-bold text-xl leading-tight line-clamp-2">{book.title}</h3>
                </div>
              </div>

              {/* Body Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>ผู้แต่ง: {book.author}</span>
                    <span>{book.pages} หน้า</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-base mb-1">{book.title}</h4>
                  <p className="text-xs font-medium text-blue-600 mb-2">{book.subtitle}</p>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 line-through">฿{book.originalPrice}</div>
                    <div className="text-xl font-extrabold text-blue-600">฿{book.price}</div>
                  </div>

                  <Link
                    href={`/checkout?bookId=${book.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition shadow-sm active:scale-95"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>สั่งซื้อทันที</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mt-14 p-6 bg-white rounded-2xl border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-sm text-gray-900">จำลองการสั่งซื้อง่ายดาย</h5>
              <p className="text-xs text-gray-500 mt-0.5">ระบบ Mock Payment ทดสอบโฟลว์คำสั่งซื้อได้ทันที</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-sm text-gray-900">รับลิงก์ดาวน์โหลดชั่วคราว</h5>
              <p className="text-xs text-gray-500 mt-0.5">ลิงก์ดาวน์โหลดปลอดภัย มีอายุการใช้งาน 15 นาที</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-sm text-gray-900">รองรับ Mobile WebViewer</h5>
              <p className="text-xs text-gray-500 mt-0.5">ออกแบบ Responsive พร้อมใช้งานบน App Inventor APK</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-500">
        <p>ใบงาน Vibe Coding: E-book Shop • Next.js + Supabase + MIT App Inventor</p>
        <p className="mt-1 text-gray-400">ระบบจำลองเพื่อการศึกษา ไม่มีการทำธุรกรรมทางการเงินจริง</p>
      </footer>
    </div>
  );
}
