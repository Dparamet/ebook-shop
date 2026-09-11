"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { BOOKS, Book } from "@/data/books";
import { ArrowLeft, CheckCircle2, ShieldAlert, ShoppingBag, Loader2 } from "lucide-react";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialBookId = searchParams.get("bookId") || BOOKS[0].id;

  const [selectedBookId, setSelectedBookId] = useState(initialBookId);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const currentBook = BOOKS.find((b) => b.id === selectedBookId) || BOOKS[0];

  useEffect(() => {
    const q = searchParams.get("bookId");
    if (q && BOOKS.some((b) => b.id === q)) {
      setSelectedBookId(q);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) {
      setErrorMsg("กรุณากรอกชื่อและอีเมลให้ครบถ้วน");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: currentBook.id,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ");
      }

      // Redirect to Order & Mock Payment page
      router.push(`/order/${data.order.id}`);
    } catch (err: any) {
      setErrorMsg(err.message || "ไม่สามารถสั่งซื้อได้ กรุณาลองใหม่");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>กลับไปเลือกหนังสือ</span>
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          ยืนยันการสั่งซื้อ E-book
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          กรอกข้อมูลเพื่อสร้างคำสั่งซื้อและเข้าสู่ขั้นตอนจำลองการชำระเงิน
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                1. เลือก E-book ที่ต้องการสั่งซื้อ
              </label>
              <select
                value={selectedBookId}
                onChange={(e) => setSelectedBookId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {BOOKS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title} — ฿{b.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                2. ข้อมูลผู้สั่งซื้อ
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">ชื่อ-นามสกุล</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น สมชาย ใจดี"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    อีเมลสำหรับรับลิงก์ดาวน์โหลด
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    * ระบบจะส่งลิงก์ดาวน์โหลดไฟล์ E-book ไปยังอีเมลนี้เมื่อสถานะเป็น PAID
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังสร้างคำสั่งซื้อ...</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ยืนยันคำสั่งซื้อ (ไปขั้นตอนจำลองชำระเงิน)</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 text-sm mb-4">สรุปรายการคำสั่งซื้อ</h3>

            <div className="flex gap-4 items-center pb-4 border-b border-gray-100">
              <div
                className={`w-14 h-18 rounded-lg bg-gradient-to-br ${currentBook.coverColor} flex items-center justify-center text-white text-xs font-bold shadow-xs flex-shrink-0 text-center p-1`}
              >
                PDF
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-gray-900 text-sm truncate">{currentBook.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{currentBook.format}</p>
                <p className="text-xs font-semibold text-blue-600 mt-1">฿{currentBook.price}</p>
              </div>
            </div>

            <div className="space-y-2 py-4 text-xs text-gray-600 border-b border-gray-100">
              <div className="flex justify-between">
                <span>ราคาหนังสือ</span>
                <span>฿{currentBook.price}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าจัดส่ง (Digital Download)</span>
                <span className="text-emerald-600 font-semibold">ฟรี (฿0)</span>
              </div>
              <div className="flex justify-between">
                <span>สถานะเริ่มต้น</span>
                <span className="font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[11px] font-bold">
                  PENDING
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-baseline">
              <span className="font-bold text-gray-900 text-sm">ยอดชำระสุทธิ</span>
              <span className="text-2xl font-extrabold text-blue-600">฿{currentBook.price}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>ข้อควรทราบ:</strong> หน้านี้จะบันทึกสถานะเป็น <code>PENDING</code> จากนั้นคุณสามารถกดปุ่มจำลองการจ่ายเงินในหน้าถัดไปเพื่อเปลี่ยนสถานะเป็น <code>PAID</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">กำลังโหลดข้อมูล...</div>}>
          <CheckoutContent />
        </Suspense>
      </main>
    </div>
  );
}
