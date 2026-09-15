# รายงานผลการปฏิบัติงาน: Vibe Coding: E-book Shop
**การพัฒนาเว็บจำลองร้านค้า E-book, เชื่อมต่อ Supabase, Deploy บน Vercel และห่อ Android App ด้วย MIT App Inventor**  
**ผู้จัดทำ:** นายปรเมศว์ เดนนิส โฮค อาร์ริงตัน  **รหัสนักศึกษา:** 66332110168-3  **ห้อง:** 4 ECP4N  
**วิชา:** ซอฟต์แวร์และการพัฒนาด้วย AI Agent • สาขาวิศวกรรมคอมพิวเตอร์

---

## 1. ข้อมูลระบบและลิงก์หลักฐานการส่งงาน (Delivery Artifacts)
- **Production URL (Vercel):** https://ebook-shop-two.vercel.app/
- **GitHub Repository:** https://github.com/Dparamet/ebook-shop
- **Supabase Project:** https://llcggvnwxktwhpdafcqv.supabase.co
- **Android Mobile App (.apk):** EBook_Store.apk (พร้อมติดตั้งบนมือถือและ Emulator)

---

## 2. ตารางตรวจสอบคุณสมบัติระบบตามเกณฑ์ (Requirement Checklist)

| ส่วนงาน / Requirement | สิ่งที่ต้องเห็นหรือทำได้ | ผลการตรวจสอบ |
|---|---|:---:|
| **หน้าร้าน (Catalog)** | มี E-book อย่างน้อย 3 รายการจากงานเดิม (HW3) มีปกจริง, ชื่อ, คำอธิบาย, ราคา, สารบัญ และปุ่มเปิดดูตัวอย่าง Wireframe/ภาพหน้าจอ | ผ่าน 100% |
| **รายละเอียด / สั่งซื้อ** | เลือกหนังสือ กรอกชื่อและอีเมล เห็นสรุปยอดเงินก่อนกดยืนยัน | ผ่าน 100% |
| **คำสั่งซื้อ (Orders)** | สร้างเลขคำสั่งซื้ออัตโนมัติ บันทึกลง Supabase Database สถานะเริ่มต้นเป็น PENDING | ผ่าน 100% |
| **Mock Payment** | มีป้ายเตือน DEMO ONLY ชัดเจน และปุ่มจำลองชำระเงินสำเร็จเพื่อเปลี่ยนสถานะเป็น PAID (ห้ามรับเงินจริง) | ผ่าน 100% |
| **ติดตามสถานะ (Tracking)** | ค้นหาสถานะคำสั่งซื้อด้วยเลข Order ID และอีเมล เพื่อป้องกันการเปิดเผยข้อมูลของผู้อื่น | ผ่าน 100% |
| **การส่งมอบ (Delivery)** | เมื่อสถานะเป็น PAID แสดงกล่องจำลองการส่งอีเมล และสร้างลิงก์ดาวน์โหลดไฟล์คู่มือ PDF E-Book ชั่วคราว (อายุ 15 นาที) | ผ่าน 100% |
| **การเผยแพร่ (Vercel)** | Deploy ขึ้น Vercel ได้ Production URL จริง รองรับการเปิดบนบราวเซอร์และอุปกรณ์พกพา | ผ่าน 100% |
| **Mobile App (.apk)** | ทำ WebView wrapper ด้วย MIT App Inventor เปิด URL จริงได้ และปุ่มย้อนกลับไม่ออกจากแอปทันที | ผ่าน 100% |

---

## 3. รายละเอียดสถาปัตยกรรมและการควบคุมความปลอดภัย
1. **Frontend & Serverless Architecture:**
   - พัฒนาด้วย **Next.js (App Router)** และ **Tailwind CSS**
   - รองรับ Responsive Design สมบูรณ์แบบสำหรับทั้งหน้าจอคอมพิวเตอร์และมือถือ
2. **Database & Row Level Security (RLS):**
   - ใช้งาน **Supabase PostgreSQL**
   - ตาราง ooks และ orders ถูกป้องกันด้วยนโยบาย RLS (Row Level Security)
   - ข้อมูลคำสั่งซื้อสามารถค้นหาได้เฉพาะเมื่อมี Order ID และ Email ที่ตรงกันเท่านั้น ป้องกัน Data Leaks
3. **Temporary Download Token (Security Guardrail):**
   - ไฟล์ E-book PDF ไม่ได้เป็นไฟล์ Public แต่จะถูกแจกจ่ายผ่าน Token ชั่วคราวที่มีอายุ 15 นาทีตามข้อกำหนดความปลอดภัยในใบงาน

---

## 4. การพัฒนา Android App ด้วย MIT App Inventor
- **คอมโพเนนต์:** ใช้งาน WebViewer1 บน Screen1
- **การตั้งค่า:**
  - HomeUrl: https://ebook-shop-two.vercel.app/
  - IgnoreSslErrors: False (เพื่อความปลอดภัย ไม่ข้าม SSL Certificate)
  - Width / Height: Fill Parent
- **การจัดการปุ่มย้อนกลับ (Back Button Logic):**
  - ดักจับอีเวนต์ Screen1.BackPressed
  - หาก WebViewer1.CanGoBack ให้เรียกคำสั่ง WebViewer1.GoBack
  - หากย้อนกลับในหน้าเว็บไม่ได้แล้ว จึงเรียก CloseApplication
