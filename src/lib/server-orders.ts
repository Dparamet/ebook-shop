import { Order, OrderStatus } from "./types";
import { supabase, isSupabaseConfigured } from "./supabase";

// Global in-memory fallback store for development/demo when Supabase is not yet configured
declare global {
  // eslint-disable-next-line no-var
  var __mockOrders: Map<string, Order> | undefined;
}

if (!globalThis.__mockOrders) {
  globalThis.__mockOrders = new Map<string, Order>();
}

const mockOrders = globalThis.__mockOrders;

export async function createOrder(data: {
  bookId: string;
  bookTitle: string;
  customerName: string;
  customerEmail: string;
  amount: number;
}): Promise<Order> {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  const id = `ORD-${timestamp}-${random}`;

  const order: Order = {
    id,
    bookId: data.bookId,
    bookTitle: data.bookTitle,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    amount: data.amount,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("orders").insert({
        id: order.id,
        book_id: order.bookId,
        book_title: order.bookTitle,
        customer_name: order.customerName,
        customer_email: order.customerEmail,
        amount: order.amount,
        status: order.status,
      });
      if (error) {
        console.warn("Supabase insert error, using local fallback:", error.message);
      }
    } catch (err) {
      console.warn("Supabase connection failed, using local fallback:", err);
    }
  }

  mockOrders.set(id, order);
  return order;
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) {
        return {
          id: data.id,
          bookId: data.book_id,
          bookTitle: data.book_title,
          customerName: data.customer_name,
          customerEmail: data.customer_email,
          amount: Number(data.amount),
          status: data.status as OrderStatus,
          createdAt: data.created_at,
          paidAt: data.paid_at,
          downloadToken: data.download_token,
          downloadExpiresAt: data.download_token_expires_at,
          emailSent: Boolean(data.paid_at),
        };
      }
    } catch (err) {
      console.warn("Supabase query failed, checking local store:", err);
    }
  }

  return mockOrders.get(id) || null;
}

export async function markOrderAsPaid(id: string): Promise<Order | null> {
  const existing = await getOrderById(id);
  if (!existing) return null;

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes temporary token
  const downloadToken = `DL-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  const updated: Order = {
    ...existing,
    status: "PAID",
    paidAt: now.toISOString(),
    downloadToken,
    downloadExpiresAt: expiresAt.toISOString(),
    emailSent: true,
    emailSentTo: existing.customerEmail,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from("orders")
        .update({
          status: "PAID",
          paid_at: updated.paidAt,
          download_token: downloadToken,
          download_token_expires_at: expiresAt.toISOString(),
        })
        .eq("id", id);
    } catch (err) {
      console.warn("Supabase update failed:", err);
    }
  }

  mockOrders.set(id, updated);
  return updated;
}

export async function findOrderByEmailAndId(id: string, email: string): Promise<Order | null> {
  const order = await getOrderById(id);
  if (!order) return null;
  // Case-insensitive comparison for email privacy check
  if (order.customerEmail.trim().toLowerCase() !== email.trim().toLowerCase()) {
    return null;
  }
  return order;
}

export async function getOrderByDownloadToken(token: string): Promise<Order | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("download_token", token)
        .maybeSingle();

      if (!error && data) {
        return {
          id: data.id,
          bookId: data.book_id,
          bookTitle: data.book_title,
          customerName: data.customer_name,
          customerEmail: data.customer_email,
          amount: Number(data.amount),
          status: data.status as OrderStatus,
          createdAt: data.created_at,
          paidAt: data.paid_at,
          downloadToken: data.download_token,
          downloadExpiresAt: data.download_token_expires_at,
          emailSent: Boolean(data.paid_at),
        };
      }
    } catch (err) {
      console.warn("Supabase query by token failed:", err);
    }
  }

  const allOrders = Array.from(mockOrders.values());
  return allOrders.find((o) => o.downloadToken === token) || null;
}
