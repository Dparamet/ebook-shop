# 📚 E-Book Shop (Vibe Coding Project)

เว็บจำลองร้านขาย E-book เชื่อมต่อ Mock Payment, ลิงก์ดาวน์โหลดชั่วคราว พร้อม Deploy บน Vercel และเปิดผ่าน Android Mobile App (MIT App Inventor)

---

## 🎯 ฟีเจอร์ตาม Requirement ในใบงาน
- [x] **หน้าร้าน (Catalog):** แสดง E-book 3 เล่ม (ปก, ชื่อ, คำอธิบายย่อ, ราคา) รองรับ Responsive บนมือถือ
- [x] **ระบบสั่งซื้อ (Checkout):** เลือกหนังสือ กรอกชื่อ-อีเมล สรุปยอดเงิน บันทึกสถานะเริ่มต้นเป็น `PENDING`
- [x] **Mock Payment (DEMO ONLY):** ป้ายเตือนเด่นชัด ปุ่ม *"จำลองชำระเงินสำเร็จ"* ปรับสถานะเป็น `PAID` โดยไม่มีการรับเงินจริง
- [x] **การส่งมอบ (Delivery & Download):** เมื่อ PAID จะได้รับลิงก์ดาวน์โหลดแบบชั่วคราว (อายุ 15 นาที เพื่อความปลอดภัย) และจำลองการส่งอีเมล
- [x] **ติดตามสถานะ (Track Order):** ค้นหาสถานะด้วยรหัสคำสั่งซื้อและอีเมล (ป้องกันการเปิดเผยข้อมูลผู้อื่น)
- [x] **Supabase Ready:** มีไฟล์ `supabase/schema.sql` และรองรับ RLS ปลอดภัย

---

## 🚀 วิธีรันโปรเจกต์ในเครื่อง (Local Run)

```bash
cd ebook-shop
npm install
npm run dev
```
เปิดบราวเซอร์ที่: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ การตั้งค่า Supabase (ตัวเลือกเพิ่มเติม)
1. ไปที่ [Supabase](https://supabase.com) สร้างโปรเจกต์ใหม่
2. ไปที่เมนู **SQL Editor** แล้วคัดลอกโค้ดจากไฟล์ `supabase/schema.sql` ไปวางแล้วกด Run
3. นำ URL และ Anon Key มาใส่ในไฟล์ `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

---

## 🌐 การ Deploy ขึ้น Vercel
1. Push โค้ดทั้งหมดขึ้น GitHub
2. เข้าสู่ระบบ [Vercel](https://vercel.com) แล้วกด **Add New... -> Project**
3. เลือก Repository `ebook-shop`
4. หากมี Supabase ให้ใส่ Environment Variables ในหน้าตั้งค่าของ Vercel แล้วกด **Deploy**
5. จะได้รับ **Production URL** (เช่น `https://ebook-shop-xxx.vercel.app`)

---

## 📱 การทำ Android App ด้วย MIT App Inventor
1. เข้าไปที่ [MIT App Inventor](https://appinventor.mit.edu/) แล้วกด **Start new project**
2. ลากคอมโพเนนต์ **`WebViewer`** (จากหมวด User Interface) มาวางใน `Screen1`
3. ตั้งค่า Properties:
   - **Screen1:** `Title` = ชื่อร้าน, `Sizing` = Responsive
   - **WebViewer1:** `Width` = Fill parent, `Height` = Fill parent, `HomeUrl` = *Production URL จาก Vercel*, `FollowLinks` = True, `IgnoreSslErrors` = False
4. ในหน้า **Blocks** ใส่คำสั่งปุ่มย้อนกลับ:
   - Event: `Screen1.BackPressed`
   - If `WebViewer1.CanGoBack` then `WebViewer1.GoBack`
   - Else `CloseApplication`
5. เมนู **Build -> Android App (.apk)** เพื่อดาวน์โหลดไฟล์ APK มาทดสอบและส่งงาน
