"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Order } from "@/lib/types";
import { BOOKS } from "@/data/books";
import {
  CheckCircle2,
  Clock,
  Download,
  Mail,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  QrCode,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error("ไม่พบข้อมูลคำสั่งซื้อ");
      const data = await res.json();
      setOrder(data.order);
    } catch (err: any) {
      setErrorMsg(err.message || "เกิดข้อผิดพลาดในการโหลดคำสั่งซื้อ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleMockPayment = async () => {
    try {
      setPaying(true);
      setErrorMsg("");
      const res = await fetch(`/api/orders/${orderId}/pay`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "เกิดข้อผิดพลาดในการจำลองชำระเงิน");
      setOrder(data.order);
    } catch (err: any) {
      setErrorMsg(err.message || "ไม่สามารถเปลี่ยนสถานะได้");
    } finally {
      setPaying(false);
    }
  };

  const [copiedLink, setCopiedLink] = useState(false);

  const copyOrderId = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyDownloadLink = () => {
    if (!order?.downloadToken) return;
    const fullUrl = `${window.location.origin}/api/download/${order.downloadToken}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
            <span>กำลังโหลดข้อมูลคำสั่งซื้อ...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900 mb-1">ไม่พบคำสั่งซื้อ</h2>
          <p className="text-xs text-gray-500 mb-6">{errorMsg || "รหัสคำสั่งซื้อไม่ถูกต้อง"}</p>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
          >
            กลับสู่หน้าร้าน
          </Link>
        </div>
      </div>
    );
  }

  const book = BOOKS.find((b) => b.id === order.bookId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Prominent Demo Warning Banner */}
      <div className="bg-amber-500 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-2">
        <ShieldAlert className="w-4 h-4" />
        <span>DEMO ONLY — ระบบจำลองสถานะคำสั่งซื้อเท่านั้น ห้ามโอนเงินจริงเด็ดขาด</span>
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Header summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-400 font-medium">รหัสคำสั่งซื้อ:</span>
                <span className="font-mono font-bold text-sm text-gray-900">{order.id}</span>
                <button
                  onClick={copyOrderId}
                  className="p-1 text-gray-400 hover:text-blue-600 rounded transition"
                  title="คัดลอกรหัส"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-gray-400">
                สร้างเมื่อ: {new Date(order.createdAt).toLocaleString("th-TH")}
              </p>
            </div>

            {/* Status Badge */}
            <div>
              {order.status === "PAID" ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>PAID (ชำระเงินแล้ว)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>PENDING (รอชำระเงิน)</span>
                </span>
              )}
            </div>
          </div>

          {/* Details Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 text-xs border-t border-gray-100">
            {BOOKS.find((b) => b.id === order.bookId)?.coverImage && (
              <div className="w-14 h-18 rounded-lg overflow-hidden border border-gray-200 shadow-xs flex-shrink-0 bg-gray-100">
                <img
                  src={BOOKS.find((b) => b.id === order.bookId)?.coverImage}
                  alt={order.bookTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <div>
                <span className="text-gray-400 block mb-0.5">หนังสือที่สั่งซื้อ</span>
                <span className="font-semibold text-gray-800">{order.bookTitle}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">ชื่อผู้รับ / อีเมล</span>
                <span className="font-semibold text-gray-800">{order.customerName}</span>
                <span className="text-gray-500 block truncate">{order.customerEmail}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">ยอดชำระ</span>
                <span className="text-lg font-extrabold text-blue-600">฿{order.amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Section: Pending vs Paid */}
        {order.status === "PENDING" ? (
          /* MOCK PAYMENT SECTION */
          <div className="bg-white rounded-2xl border-2 border-amber-400 p-6 sm:p-8 shadow-sm">
            <div className="text-center max-w-md mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300 mb-3 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>DEMO ONLY — ระบบจำลอง</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">
                หน้าต่างจำลองการชำระเงิน (Mock Payment)
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                งานนี้เป็นระบบสาธิต ห้ามโอนเงินจริง ให้กดปุ่มด้านล่างเพื่อจำลองสถานะเป็น PAID
              </p>

              {/* Mock QR graphic */}
              <div className="relative w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-4 mb-6">
                <QrCode className="w-24 h-24 text-gray-400 mb-2 opacity-50" />
                <span className="text-[11px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded border border-red-300">
                  ห้ามสแกน • DEMO ONLY
                </span>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleMockPayment}
                  disabled={paying}
                  className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-black text-base shadow-lg transition transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {paying ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>กำลังประมวลผลการจำลอง...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>จำลองชำระเงินสำเร็จ (เปลี่ยนเป็น PAID)</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-gray-400">
                  คลิกเพื่อจำลองการจ่ายเงิน ฿{order.amount} ทันที โดยไม่ต้องใช้เงินจริง
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* PAID SUCCESS & DOWNLOAD SECTION */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                    สั่งซื้อและชำระเงินสำเร็จ
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
                    ขอบคุณสำหรับการสั่งซื้อ E-book!
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    ชำระเงินสำเร็จเมื่อ: {order.paidAt ? new Date(order.paidAt).toLocaleString("th-TH") : "เสร็จสิ้น"}
                  </p>
                </div>
              </div>

              {/* Download Action */}
              <div className="mt-6 p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                      <Download className="w-4 h-4 text-emerald-700" />
                      <span>ดาวน์โหลดไฟล์คู่มือ E-Book (PDF) แบบชั่วคราว</span>
                    </h4>
                    <p className="text-xs text-emerald-800 mt-1">
                      ลิงก์ชั่วคราวถูกสร้างขึ้นเพื่อความปลอดภัยตาม Requirement (มีอายุ 15 นาที)
                    </p>
                  </div>

                  {order.downloadToken ? (
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      <a
                        href={`/api/download/${order.downloadToken}`}
                        download
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition active:scale-95 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>ดาวน์โหลด (.pdf)</span>
                      </a>

                      <a
                        href={`/api/download/${order.downloadToken}?view=1`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 font-bold text-xs transition active:scale-95"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>เปิดอ่าน PDF</span>
                      </a>

                      <button
                        type="button"
                        onClick={copyDownloadLink}
                        className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-semibold transition cursor-pointer"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? "คัดลอกแล้ว" : "คัดลอกลิงก์"}</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">ไม่พบโทเค็นดาวน์โหลด</span>
                  )}
                </div>

                {/* Mobile App notice */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">หมายเหตุสำหรับ Mobile App (MIT App Inventor):</span>
                    <p className="mt-0.5">
                      ตามข้อจำกัดของ WebViewer ในใบงานหน้า 5 แนะนำให้กดปุ่ม <strong>&quot;คัดลอกลิงก์&quot;</strong> เพื่อนำไปเปิดดาวน์โหลดใน Chrome ของมือถือ หรือเปิดผ่านอีเมลจำลองด้านล่าง
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Notification Simulation Box */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">การส่งมอบทางอีเมล (Email Delivery)</h3>
                  <p className="text-xs text-gray-400">สถานะการส่งอีเมลยืนยันคำสั่งซื้อและลิงก์ดาวน์โหลด</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs space-y-2 font-mono">
                <div className="flex gap-2">
                  <span className="text-gray-400 w-24">ส่งถึง (To):</span>
                  <span className="font-bold text-gray-800">{order.customerEmail}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-24">หัวข้อ (Subject):</span>
                  <span className="text-gray-800">[E-book Shop] ลิงก์ดาวน์โหลดหนังสือ: {order.bookTitle}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-24">สถานะอีเมล:</span>
                  <span className="text-emerald-700 font-bold">✓ ส่งสำเร็จ (Sent / Simulated Successfully)</span>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-200 text-[11px] text-gray-500 font-sans">
                  <span>* ตามข้อกำหนดใบงาน: ในโหมดทดสอบระบบจะบันทึกและแสดงสถานะการส่งอีเมลเพื่อการตรวจสอบ</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back and Track Links */}
        <div className="mt-8 flex justify-between items-center text-xs">
          <Link href="/" className="text-gray-500 hover:text-blue-600 font-medium">
            ← เลือกซื้อเล่มอื่นเพิ่มเติม
          </Link>
          <Link
            href={`/track?id=${order.id}&email=${encodeURIComponent(order.customerEmail)}`}
            className="text-blue-600 hover:underline font-bold inline-flex items-center gap-1"
          >
            <span>ทดสอบเปิดดูในหน้าติดตามคำสั่งซื้อ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
