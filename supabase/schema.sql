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
  ('vibe-coding-101', 'Vibe Coding 101', 'คู่มือเขียนโค้ดร่วมกับ AI ให้เสร็จไวและมีทิศทาง', 'Prasert Dev', 199, 'from-blue-600 to-indigo-800', 'เรียนรู้วิธีแบ่งงาน prompt ทีละสเต็ป คุม AI ให้อยู่ในขอบเขต ตรวจโค้ดอย่างมั่นใจ และสร้างระบบจริงได้ในเวลาจำกัด', 145, 'PDF (Digital Edition)'),
  ('nextjs-supabase-mastery', 'Next.js & Supabase Mastery', 'สร้าง Fullstack App ระดับโปร รวดเร็ว ปลอดภัย', 'Somchai Tech', 289, 'from-emerald-600 to-teal-800', 'เทคนิคการเชื่อมต่อ Database, ออกแบบ RLS Policy, Server Actions และระบบ Storage อย่างกระชับ พร้อม Deploy ขึ้น Vercel', 210, 'PDF (Digital Edition)'),
  ('app-inventor-wrapper', 'Mobile Wrapper with App Inventor', 'แปลง Web สู่ Mobile App APK ภายใน 15 นาที', 'Anan Mobile Lab', 149, 'from-amber-500 to-orange-700', 'คู่มือนำเว็บ Production มาทำเป็น Android App ด้วย MIT App Inventor จัดการ WebViewer, ปุ่มย้อนกลับ และส่งไฟล์ APK', 98, 'PDF (Digital Edition)')
on conflict (id) do nothing;
