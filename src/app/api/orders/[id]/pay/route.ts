import { NextResponse } from "next/server";
import { markOrderAsPaid } from "@/lib/server-orders";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedOrder = await markOrderAsPaid(id);

    if (!updatedOrder) {
      return NextResponse.json({ error: "ไม่พบคำสั่งซื้อที่ต้องการชำระเงิน" }, { status: 404 });
    }

    // Email delivery simulation & Resend integration
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailStatus = "simulated";
    let emailDetails = {
      to: updatedOrder.customerEmail,
      subject: `[E-book Shop] ลิงก์ดาวน์โหลดหนังสือ: ${updatedOrder.bookTitle}`,
      downloadUrl: `/api/download/${updatedOrder.downloadToken}`,
      expiresAt: updatedOrder.downloadExpiresAt,
    };

    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "E-book Shop <onboarding@resend.dev>",
            to: updatedOrder.customerEmail,
            subject: `คำสั่งซื้อสำเร็จ: ${updatedOrder.bookTitle}`,
            html: `
              <h2>ขอบคุณสำหรับการสั่งซื้อ E-book!</h2>
              <p>สวัสดีคุณ <strong>${updatedOrder.customerName}</strong></p>
              <p>คำสั่งซื้อ <strong>${updatedOrder.id}</strong> สถานะเป็น <strong>PAID</strong> แล้ว</p>
              <p>คุณสามารถดาวน์โหลด E-book ได้ที่ลิงก์ด้านล่างนี้ (ลิงก์มีอายุ 15 นาที):</p>
              <p><a href="${process.env.NEXT_PUBLIC_APP_URL || ""}/api/download/${updatedOrder.downloadToken}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">ดาวน์โหลด E-book</a></p>
            `,
          }),
        });

        if (res.ok) {
          emailStatus = "sent_via_resend";
        } else {
          console.warn("Resend API warning:", await res.text());
        }
      } catch (err) {
        console.warn("Failed sending real email, falling back to simulated email:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "จำลองการชำระเงินสำเร็จ (DEMO PAYMENT SUCCESS)",
      order: updatedOrder,
      email: {
        status: emailStatus,
        ...emailDetails,
      },
    });
  } catch (error) {
    console.error("Payment mock error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการประมวลผลการจำลองชำระเงิน" }, { status: 500 });
  }
}
