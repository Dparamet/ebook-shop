import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/server-orders";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    return NextResponse.json({ error: "ไม่พบคำสั่งซื้อ" }, { status: 404 });
  }

  return NextResponse.json({ success: true, order });
}
