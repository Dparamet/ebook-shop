"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Order } from "@/lib/types";
import { Search, ShieldAlert, CheckCircle2, Clock, AlertTriangle, ArrowRight, Loader2 } from "lucide-react";

function TrackContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const qId = searchParams.get("id");
    const qEmail = searchParams.get("email");
    if (qId && qEmail) {
      setOrderId(qId);
      setEmail(qEmail);
      performSearch(qId, qEmail);
    }
  }, [searchParams]);

  const performSearch = async (targetId: string, targetEmail: string) => {
    setLoading(true);
    setErrorMsg("");
    setHasSearched(true);
    setOrder(null);

    try {
      const res = await fetch(
        `/api/orders?id=${encodeURIComponent(targetId.trim())}&email=${encodeURIComponent(targetEmail.trim())}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "ไม่พบคำสั่งซื้อ หรือข้อมูลอีเมลไม่ถูกต้อง");
      }

      setOrder(data.order);
    } catch (err: any) {
      setErrorMsg(err.message || "เกิดข้อผิดพลาดในการค้นหา");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) {
      setErrorMsg("กรุณากรอกทั้งรหัสคำสั่งซื้อและอีเมลเพื่อความปลอดภัย");
      return;
    }
    performSearch(orderId, email);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          ติดตามสถานะคำสั่งซื้อ
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          กรอกรหัสคำสั่งซื้อและอีเมลที่ใช้สั่งซื้อเพื่อตรวจสอบสถานะ
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              รหัสคำสั่งซื้อ (Order ID)
            </label>
            <input
              type="text"
              required
              placeholder="เช่น ORD-XXXX-XXXX"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              อีเมลที่ใช้สั่งซื้อ (Customer Email)
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              * ต้องระบุอีเมลตรงกับตอนสั่งซื้อเพื่อป้องกันการเข้าถึงข้อมูลของผู้อื่น
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>กำลังค้นหา...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>ค้นหาสถานะคำสั่งซื้อ</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div>
          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">ค้นหาไม่สำเร็จ</p>
                <p className="mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          {order && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <span className="text-xs text-gray-400">คำสั่งซื้อ</span>
                  <p className="font-mono font-bold text-sm text-gray-900">{order.id}</p>
                </div>
                <div>
                  {order.status === "PAID" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>PAID (ชำระเงินแล้ว)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>PENDING (รอชำระเงิน)</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-400">หนังสือ:</span>
                  <span className="font-semibold text-gray-800">{order.bookTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ผู้สั่งซื้อ:</span>
                  <span className="text-gray-800">{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ยอดเงิน:</span>
                  <span className="font-extrabold text-blue-600">฿{order.amount}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <Link
                  href={`/order/${order.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  <span>
                    {order.status === "PENDING"
                      ? "ไปหน้าจำลองชำระเงิน"
                      : "ไปหน้ารายละเอียดและดาวน์โหลด"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">กำลังโหลด...</div>}>
          <TrackContent />
        </Suspense>
      </main>
    </div>
  );
}
