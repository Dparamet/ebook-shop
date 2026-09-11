import { NextResponse } from "next/server";
import { BOOKS } from "@/data/books";

import { getOrderByDownloadToken } from "@/lib/server-orders";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const matchedOrder = await getOrderByDownloadToken(token);

  if (!matchedOrder) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="th">
      <head><meta charset="UTF-8"><title>ไม่พบไฟล์</title>
      <style>body{font-family:sans-serif;text-align:center;padding:50px;background:#f9fafb;color:#1f2937}</style>
      </head>
      <body>
        <h1 style="color:#ef4444;">❌ ลิงก์ดาวน์โหลดไม่ถูกต้อง หรือหมดอายุแล้ว</h1>
        <p>ลิงก์ดาวน์โหลด E-book มีอายุการใช้งานชั่วคราวเพื่อความปลอดภัย</p>
        <a href="/" style="display:inline-block;margin-top:20px;padding:10px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">กลับสู่หน้าร้าน</a>
      </body>
      </html>`,
      { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Check expiration
  if (matchedOrder.downloadExpiresAt) {
    const expires = new Date(matchedOrder.downloadExpiresAt).getTime();
    if (Date.now() > expires) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="th">
        <head><meta charset="UTF-8"><title>ลิงก์หมดอายุ</title>
        <style>body{font-family:sans-serif;text-align:center;padding:50px;background:#f9fafb;color:#1f2937}</style>
        </head>
        <body>
          <h1 style="color:#f59e0b;">⏳ ลิงก์ดาวน์โหลดหมดอายุแล้ว</h1>
          <p>ลิงก์ชั่วคราวหมดอายุการใช้งาน (จำกัดเวลา 15 นาทีตามความปลอดภัย)</p>
          <a href="/order/${matchedOrder.id}" style="display:inline-block;margin-top:20px;padding:10px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">ดูคำสั่งซื้อของคุณ</a>
        </body>
        </html>`,
        { status: 403, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }
  }

  const book = BOOKS.find((b) => b.id === matchedOrder.bookId);

  // Return a sample text/pdf/markdown format e-book content
  const content = `=====================================================
  E-BOOK DIGITAL EDITION (DEMO SYSTEM)
=====================================================
ชื่อหนังสือ: ${book?.title || matchedOrder.bookTitle}
ผู้แต่ง: ${book?.author || "ทีมผู้พัฒนา"}
คำสั่งซื้อ: ${matchedOrder.id}
ผู้ซื้อ: ${matchedOrder.customerName} (${matchedOrder.customerEmail})
วันที่ดาวน์โหลด: ${new Date().toLocaleString("th-TH")}
=====================================================

[บทที่ 1: การเตรียมตัวและสถาปัตยกรรมระบบ]
ระบบนี้พัฒนาขึ้นด้วยหลักการ Vibe Coding:
1. การระบุ Requirement ที่กระชับและตรวจสอบได้
2. การแยกส่วน Client, Server และ Database (Supabase)
3. การจัดการ Mock Payment อย่างปลอดภัย มีป้าย DEMO ONLY ชัดเจน
4. การสร้าง Temporary Download Link สำหรับส่งมอบไฟล์
5. การเชื่อมต่อ WebViewer บน Android ด้วย MIT App Inventor

ขอแสดงความยินดีที่คุณได้ทดสอบกระบวนการสั่งซื้อ E-book สำเร็จสมบูรณ์!
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${matchedOrder.bookId || "ebook"}.txt"`,
    },
  });
}
