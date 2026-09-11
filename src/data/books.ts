export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  price: number;
  originalPrice: number;
  coverColor: string;
  badge: string;
  description: string;
  pages: number;
  format: string;
  sampleContent: string;
}

export const BOOKS: Book[] = [
  {
    id: "vibe-coding-101",
    title: "Vibe Coding 101",
    subtitle: "คู่มือเขียนโค้ดร่วมกับ AI ให้เสร็จไวและมีทิศทาง",
    author: "Prasert Dev",
    price: 199,
    originalPrice: 350,
    coverColor: "from-blue-600 to-indigo-800",
    badge: "Bestseller",
    description: "เรียนรู้วิธีแบ่งงาน prompt ทีละสเต็ป คุม AI ให้อยู่ในขอบเขต ตรวจโค้ดอย่างมั่นใจ และสร้างระบบจริงได้ในเวลาจำกัด",
    pages: 145,
    format: "PDF (Digital Edition)",
    sampleContent: "บทนำสู่ Vibe Coding ยุคใหม่: สั่งงานทีละโมดูล ตรวจสอบความถูกต้อง และทำความเข้าใจสิ่งที่ AI สร้างขึ้น..."
  },
  {
    id: "nextjs-supabase-mastery",
    title: "Next.js & Supabase Mastery",
    subtitle: "สร้าง Fullstack App ระดับโปร รวดเร็ว ปลอดภัย",
    author: "Somchai Tech",
    price: 289,
    originalPrice: 490,
    coverColor: "from-emerald-600 to-teal-800",
    badge: "Recommended",
    description: "เทคนิคการเชื่อมต่อ Database, ออกแบบ RLS Policy, Server Actions และระบบ Storage อย่างกระชับ พร้อม Deploy ขึ้น Vercel",
    pages: 210,
    format: "PDF (Digital Edition)",
    sampleContent: "สถาปัตยกรรม App Router, Server Components และการสร้าง Client ที่เชื่อมโยงกับ Supabase อย่างปลอดภัย..."
  },
  {
    id: "app-inventor-wrapper",
    title: "Mobile Wrapper with App Inventor",
    subtitle: "แปลง Web สู่ Mobile App APK ภายใน 15 นาที",
    author: "Anan Mobile Lab",
    price: 149,
    originalPrice: 250,
    coverColor: "from-amber-500 to-orange-700",
    badge: "Beginner Friendly",
    description: "คู่มือนำเว็บ Production มาทำเป็น Android App ด้วย MIT App Inventor จัดการ WebViewer, ปุ่มย้อนกลับ และส่งไฟล์ APK",
    pages: 98,
    format: "PDF (Digital Edition)",
    sampleContent: "การใช้งาน WebViewer ขั้นพื้นฐาน, การตั้งค่าหน้าจอให้เต็มจอ, การจัดการ Back Button Event และข้อควรระวัง..."
  }
];
