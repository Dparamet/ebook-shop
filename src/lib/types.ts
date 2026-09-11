export type OrderStatus = "PENDING" | "PAID" | "CANCELLED";

export interface Order {
  id: string;
  bookId: string;
  bookTitle: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  paidAt?: string;
  downloadToken?: string;
  downloadExpiresAt?: string;
  emailSent?: boolean;
  emailSentTo?: string;
}
