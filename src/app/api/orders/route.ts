import { NextResponse } from "next/server";
import { createOrder, findOrderByEmailAndId } from "@/lib/server-orders";
import { BOOKS } from "@/data/books";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookId, customerName, customerEmail } = body;

    if (!bookId || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, อีเมล, หนังสือ)" },
        { status: 400 }
      );
    }

    const book = BOOKS.find((b) => b.id === bookId);
    if (!book) {
      return NextResponse.json({ error: "ไม่พบหนังสือที่เลือก" }, { status: 404 });
    }

    const order = await createOrder({
      bookId: book.id,
      bookTitle: book.title,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      amount: book.price,
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const email = searchParams.get("email");

  if (!id || !email) {
    return NextResponse.json(
      { error: "ต้องระบุทั้งรหัสคำสั่งซื้อและอีเมลเพื่อความปลอดภัย" },
      { status: 400 }
    );
  }

  const order = await findOrderByEmailAndId(id, email);
  if (!order) {
    return NextResponse.json(
      { error: "ไม่พบคำสั่งซื้อ หรือข้อมูลอีเมลไม่ตรงกับคำสั่งซื้อ" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, order });
}
