import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
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
  const targetFileName = book?.downloadFileName || `${matchedOrder.bookId}.exe`;
  const filePath = path.join(process.cwd(), "downloads", targetFileName);

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.microsoft.portable-executable",
        "Content-Disposition": `attachment; filename="${targetFileName}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  }

  // Fallback if binary is not packaged on serverless host
  const fallbackNotice = `=====================================================
  HW 3 DESKTOP APP DOWNLOAD (DEMO)
=====================================================
โปรแกรม: ${book?.title || matchedOrder.bookTitle}
คำสั่งซื้อ: ${matchedOrder.id}
ผู้รับสิทธิ์: ${matchedOrder.customerName} (${matchedOrder.customerEmail})
ไฟล์: ${targetFileName}
=====================================================
การดาวน์โหลดสำเร็จในระบบสาธิต!
`;

  return new NextResponse(fallbackNotice, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${targetFileName}.txt"`,
    },
  });
}
