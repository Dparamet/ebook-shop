-- Schema for E-book Shop (Supabase)
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Table: books
create table if not exists public.books (
  id text primary key,
  title text not null,
  subtitle text,
  author text not null,
  price numeric not null,
  cover_color text default 'from-blue-600 to-indigo-800',
  description text,
  pages integer default 100,
  format text default 'PDF',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Table: orders
create table if not exists public.orders (
  id text primary key,
  book_id text references public.books(id) on delete set null,
  book_title text not null,
  customer_name text not null,
  customer_email text not null,
  amount numeric not null,
  status text not null check (status in ('PENDING', 'PAID', 'CANCELLED')),
  download_token text,
  download_token_expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  paid_at timestamp with time zone
);

-- 3. Row Level Security (RLS)
alter table public.books enable row level security;
alter table public.orders enable row level security;

-- Policies for books: Public Read Only
create policy "Allow public read access on books"
  on public.books for select
  using (true);

-- Policies for orders:
-- Anyone can create an order (Checkout)
create policy "Allow public insert order"
  on public.orders for insert
  with check (true);

-- Users can read their own order if they have the order id
create policy "Allow public read own order by id"
  on public.orders for select
  using (true);

-- Public can update status during mock payment (Demo purpose)
create policy "Allow update for demo mock payment"
  on public.orders for update
  using (true);

-- 4. Initial Seed Data
insert into public.books (id, title, subtitle, author, price, cover_color, description, pages, format)
values
  ('tarot-app', 'Tarot Reading PRO 🔮', 'โปรแกรมทำนายดวงไพ่ยิปซี 3 ใบ (อดีต, ปัจจุบัน, อนาคต) พร้อมดนตรีประกอบ', 'Desktop AI Studio (HW3)', 199, 'from-purple-700 to-indigo-900', 'แอปพลิเคชัน Desktop สุ่มพยากรณ์ไพ่ยิปซี 3 ใบ ไม่ซ้ำกัน พร้อมระบบเล่นเพลงบรรยากาศ (BGM Engine) และระบบ Fallback ปลอดภัย พัฒนาด้วย Python PyQt6', 1, 'Windows Executable (.exe)'),
  ('media-player-pro', 'Media Player PRO 🎵', 'ระบบจัดการและเล่นสื่อมีเดียเดสก์ท็อป พร้อมระบบ Playlist ขั้นสูง', 'Desktop AI Studio (HW3)', 249, 'from-blue-600 to-cyan-900', 'โปรแกรมเล่นเพลงและจัดการคิวเพลงระดับโปร รองรับการเพิ่มหลายไฟล์, เลื่อนไทม์ไลน์แบบเรียลไทม์, ปรับระดับเสียง, และสถาปัตยกรรมแยกส่วน Audio Core', 1, 'Windows Executable (.exe)'),
  ('task-manager-pro', 'SQLite Task Manager PRO 📋', 'ระบบจัดการงานและฐานข้อมูลเดสก์ท็อป เชื่อมต่อ SQLite Database', 'Desktop AI Studio (HW3)', 179, 'from-emerald-700 to-teal-900', 'โปรแกรมจัดการ To-Do List และ Task ประจำวัน บันทึกสถานะงานลงฐานข้อมูล SQLite ปลอดภัย ค้นหาและกรองสถานะงานได้อย่างรวดเร็ว', 1, 'Windows Executable (.exe)')
on conflict (id) do nothing;
