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
  downloadFileName: string;
}

export const BOOKS: Book[] = [
  {
    id: "tarot-app",
    title: "Tarot Reading PRO 🔮",
    subtitle: "โปรแกรมทำนายดวงไพ่ยิปซี 3 ใบ (อดีต, ปัจจุบัน, อนาคต) พร้อมดนตรีประกอบ",
    author: "Desktop AI Studio (HW3)",
    price: 199,
    originalPrice: 350,
    coverColor: "from-purple-700 to-indigo-900",
    badge: "ไพ่ทาโรต์ (HW3)",
    description: "แอปพลิเคชัน Desktop สุ่มพยากรณ์ไพ่ยิปซี 3 ใบ ไม่ซ้ำกัน พร้อมระบบเล่นเพลงบรรยากาศ (BGM Engine) และระบบ Fallback ปลอดภัย พัฒนาด้วย Python PyQt6",
    pages: 1,
    format: "Windows Executable (.exe)",
    downloadFileName: "tarot-app.exe",
    sampleContent: "Tarot Reading PRO: สุ่มไพ่ 3 ใบ อดีต ปัจจุบัน อนาคต พร้อมดนตรีสร้างบรรยากาศ..."
  },
  {
    id: "media-player-pro",
    title: "Media Player PRO 🎵",
    subtitle: "ระบบจัดการและเล่นสื่อมีเดียเดสก์ท็อป พร้อมระบบ Playlist ขั้นสูง",
    author: "Desktop AI Studio (HW3)",
    price: 249,
    originalPrice: 450,
    coverColor: "from-blue-600 to-cyan-900",
    badge: "ระบบจัดการ Media (HW3)",
    description: "โปรแกรมเล่นเพลงและจัดการคิวเพลงระดับโปร รองรับการเพิ่มหลายไฟล์, เลื่อนไทม์ไลน์แบบเรียลไทม์, ปรับระดับเสียง, และสถาปัตยกรรมแยกส่วน Audio Core",
    pages: 1,
    format: "Windows Executable (.exe)",
    downloadFileName: "media-player-pro.exe",
    sampleContent: "Media Player PRO: ควบคุมคิวเพลง ปรับตำแหน่งเวลา และระบบ Fault-tolerant..."
  },
  {
    id: "task-manager-pro",
    title: "SQLite Task Manager PRO 📋",
    subtitle: "ระบบจัดการงานและฐานข้อมูลเดสก์ท็อป เชื่อมต่อ SQLite Database",
    author: "Desktop AI Studio (HW3)",
    price: 179,
    originalPrice: 290,
    coverColor: "from-emerald-700 to-teal-900",
    badge: "จัดการงาน SQLite (HW3)",
    description: "โปรแกรมจัดการ To-Do List และ Task ประจำวัน บันทึกสถานะงานลงฐานข้อมูล SQLite ปลอดภัย ค้นหาและกรองสถานะงานได้อย่างรวดเร็ว",
    pages: 1,
    format: "Windows Executable (.exe)",
    downloadFileName: "task-manager-pro.exe",
    sampleContent: "Task Manager PRO: จัดเก็บข้อมูล CRUD บน SQLite และรายงานผลการทำงาน..."
  }
];
