"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { BOOKS, Book } from "@/data/books";
import {
  BookOpen,
  ShoppingCart,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  Eye,
  X,
  FileText,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [activeTab, setActiveTab] = useState<"toc" | "screens">("screens");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            <span>Digital E-book Store • HW 4</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            คลังหนังสือดิจิทัลสำหรับนักพัฒนา
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            เลือกซื้อคู่มือสถาปัตยกรรม E-book คุณภาพ ดาวน์โหลดไฟล์ PDF ได้ทันทีหลังจำลองชำระเงิน พร้อมรับลิงก์ดาวน์โหลดทางอีเมล
          </p>
        </div>

        {/* E-book Catalog (3 items minimum) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BOOKS.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              {/* Cover Art Image */}
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden border-b border-gray-100">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[11px] font-semibold tracking-wide shadow">
                  {book.badge}
                </span>
                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-blue-600/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider shadow">
                  {book.format.split(" ")[0]}
                </span>
              </div>

              {/* Body Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="truncate mr-2">ผู้แต่ง: {book.author}</span>
                    <span className="font-semibold flex-shrink-0 text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {book.pages} หน้า
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-xs font-medium text-blue-600 mb-2">{book.subtitle}</p>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 line-through">฿{book.originalPrice}</div>
                      <div className="text-xl font-extrabold text-blue-600">฿{book.price}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setPreviewBook(book);
                        setActiveTab("screens");
                        setSelectedImage(null);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 text-xs font-semibold transition bg-gray-50 hover:bg-white"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>ดูตัวอย่าง</span>
                    </button>
                  </div>

                  <Link
                    href={`/checkout?bookId=${book.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition shadow-sm active:scale-98"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>สั่งซื้อ E-book เล่มนี้</span>
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
              <p className="text-xs text-gray-500 mt-0.5">ลิงก์ดาวน์โหลด E-Book PDF ปลอดภัย มีอายุ 15 นาที</p>
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

      {/* Preview Modal */}
      {previewBook && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-base leading-tight">
                    ตัวอย่างหนังสือ: {previewBook.title}
                  </h3>
                  <p className="text-xs text-gray-500">โดย {previewBook.author}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewBook(null)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-gray-200 bg-white px-4 sm:px-6">
              <button
                type="button"
                onClick={() => setActiveTab("screens")}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
                  activeTab === "screens"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>ภาพตัวอย่างระบบ & Wireframe ({previewBook.previewImages.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("toc")}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
                  activeTab === "toc"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>สารบัญ E-book ({previewBook.pages} หน้า)</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
              {activeTab === "screens" ? (
                <div className="space-y-4">
                  <p className="text-xs text-gray-500">
                    ภาพร่างสถาปัตยกรรมหน้าจอ (Wireframe Mockup) และหน้าจอโปรแกรมขณะทำงานจริง:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {previewBook.previewImages.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-gray-200 overflow-hidden bg-gray-100 shadow-sm cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
                        onClick={() => setSelectedImage(imgSrc)}
                      >
                        <img
                          src={imgSrc}
                          alt={`${previewBook.title} Preview ${idx + 1}`}
                          className="w-full h-44 object-contain bg-white"
                        />
                        <div className="p-2 bg-gray-50 text-[11px] text-gray-600 font-medium text-center border-t border-gray-100">
                          {idx === 0 ? "หน้าจอโปรแกรมขณะทำงานจริง" : "แบบร่าง Wireframe ก่อน Prompt"}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedImage && (
                    <div
                      className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
                      onClick={() => setSelectedImage(null)}
                    >
                      <div className="max-w-3xl max-h-[85vh] bg-white rounded-2xl overflow-hidden p-2">
                        <img
                          src={selectedImage}
                          alt="Enlarged preview"
                          className="max-h-[80vh] w-auto mx-auto object-contain"
                        />
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-900">
                    <span className="font-bold block mb-1">จุดเด่นทางวิศวกรรม:</span>
                    {previewBook.description}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-gray-500">
                    โครงสร้างเนื้อหาและบทเรียนที่บรรจุอยู่ภายในเล่ม E-book:
                  </p>
                  <ul className="space-y-2">
                    {previewBook.tableOfContents.map((chapter, i) => (
                      <li
                        key={i}
                        className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 text-xs text-gray-800"
                      >
                        <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span>{chapter}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 p-3 bg-gray-100 rounded-xl text-[11px] text-gray-600">
                    <span className="font-semibold text-gray-800">ตัวอย่างข้อความในเล่ม:</span>
                    <p className="mt-1 italic">{previewBook.sampleContent}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400">ราคาพิเศษ</span>
                <div className="text-xl font-extrabold text-blue-600">฿{previewBook.price}</div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewBook(null)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-white transition"
                >
                  ปิดหน้าต่าง
                </button>
                <Link
                  href={`/checkout?bookId=${previewBook.id}`}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition"
                >
                  ดำเนินการสั่งซื้อ
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-500">
        <p>ใบงาน Vibe Coding: E-book Shop • Next.js + Supabase + MIT App Inventor</p>
        <p className="mt-1 text-gray-400">ระบบจำลองเพื่อการศึกษา ไม่มีการทำธุรกรรมทางการเงินจริง</p>
      </footer>
    </div>
  );
}
