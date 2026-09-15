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
  coverImage: string;
  previewImages: string[];
  tableOfContents: string[];
}

export const BOOKS: Book[] = [
  {
    id: "tarot-app",
    title: "Tarot Reading PRO 🔮",
    subtitle: "คู่มือสถาปัตยกรรมและโปรแกรมทำนายดวงไพ่ยิปซี 3 ใบ พร้อม BGM Engine",
    author: "นายปรเมศว์ เดนนิส โฮค อาร์ริงตัน (HW3)",
    price: 199,
    originalPrice: 350,
    coverColor: "from-purple-700 to-indigo-900",
    badge: "ไพ่ทาโรต์ (HW3)",
    description: "คู่มือเชิงลึกและสถาปัตยกรรมระบบทำนายดวงไพ่ยิปซี 3 ใบ (Past, Present, Future) ไม่ซ้ำกันด้วย random.sample พร้อมโมดูลเพลงประกอบ (BGM Engine) และระบบ Fallback ภาพสูญหาย พัฒนาด้วย PyQt6",
    pages: 12,
    format: "PDF E-Book (คู่มือสถาปัตยกรรม + Source Code)",
    downloadFileName: "tarot-reading-pro-guide.pdf",
    coverImage: "/covers/tarot-cover.png",
    previewImages: [
      "/previews/tarot-app-run.png",
      "/previews/tarot-mockup.png"
    ],
    tableOfContents: [
      "บทที่ 1: ความต้องการของระบบ (Three-Card Spread & BGM Engine)",
      "บทที่ 2: สถาปัตยกรรมซอฟต์แวร์แยกโมดูล (cards.py & card_widget.py)",
      "บทที่ 3: การควบคุม AI Agent และ Acceptance Criteria",
      "บทที่ 4: การทดสอบเชิงลึก: Image Missing Fallback & Collision Test",
      "บทที่ 5: คู่มือการรันและการบิลด์ Standalone .exe ด้วย PyInstaller"
    ],
    sampleContent: "Tarot Reading PRO: สถาปัตยกรรมการเปิดไพ่ 3 ใบ (อดีต ปัจจุบัน อนาคต) ป้องกันไพ่ซ้ำ 100% ด้วย random.sample(CARDS, 3) พร้อมโครงสร้างแยกโมดูลเพื่อความง่ายในการบำรุงรักษา..."
  },
  {
    id: "media-player-pro",
    title: "Media Player PRO 🎵",
    subtitle: "คู่มือระบบจัดการและเล่นสื่อมีเดียเดสก์ท็อป พร้อม Audio Core Architecture",
    author: "นายปรเมศว์ เดนนิส โฮค อาร์ริงตัน (HW3)",
    price: 249,
    originalPrice: 450,
    coverColor: "from-blue-600 to-cyan-900",
    badge: "จัดการมีเดีย (HW3)",
    description: "คู่มือการออกแบบ Audio Engine และ Playlist Core ขั้นสูง รองรับการเลือกหลายไฟล์พร้อมกัน, Scrubbing Timeline แบบเรียลไทม์ไม่สะดุด, ปรับระดับเสียง และสถาปัตยกรรมแยกส่วน Audio Core ออกจาก UI",
    pages: 10,
    format: "PDF E-Book (คู่มือสถาปัตยกรรม + Source Code)",
    downloadFileName: "media-player-pro-guide.pdf",
    coverImage: "/covers/media-player-cover.png",
    previewImages: [
      "/previews/media-player-mockup.png",
      "/previews/media-player-plan.png"
    ],
    tableOfContents: [
      "บทที่ 1: ความต้องการของระบบ (Playlist Management & Timeline Control)",
      "บทที่ 2: สถาปัตยกรรมแยกโมดูล (audio_engine.py, playlist_manager.py, player_ui.py)",
      "บทที่ 3: การจัดการ Race Condition ขณะเลื่อน Slider (_user_is_scrubbing)",
      "บทที่ 4: การทดสอบ Fault-tolerant เมื่อไฟล์เสียงสูญหายหรือเสียหาย",
      "บทที่ 5: การคอมไพล์โปรแกรมสู่ Windows Executable"
    ],
    sampleContent: "Media Player PRO: สถาปัตยกรรมแยก Audio Engine ออกจาก GUI ป้องกัน Race Condition ขณะ Scrubbing Timeline และระบบจัดการคิวเพลงอัจฉริยะ..."
  },
  {
    id: "task-manager-pro",
    title: "SQLite Task Manager PRO 📋",
    subtitle: "คู่มือระบบจัดการงานฐานข้อมูลเดสก์ท็อป และสถาปัตยกรรม 3-Tier ปลอดภัย",
    author: "นายปรเมศว์ เดนนิส โฮค อาร์ริงตัน (HW3)",
    price: 179,
    originalPrice: 290,
    coverColor: "from-emerald-700 to-teal-900",
    badge: "SQLite Database (HW3)",
    description: "คู่มือและพิมพ์เขียวการพัฒนา Desktop Task Manager สถาปัตยกรรม 3-Tier (Data, Service, Presentation) เชื่อมต่อ SQLite Database บังคับใช้ Parameterized Query ป้องกัน SQL Injection 100% พร้อมระบบนำเข้า CSV",
    pages: 10,
    format: "PDF E-Book (คู่มือสถาปัตยกรรม + Source Code)",
    downloadFileName: "sqlite-task-manager-guide.pdf",
    coverImage: "/covers/task-manager-cover.png",
    previewImages: [
      "/previews/task-manager-run.png",
      "/previews/task-manager-mockup.png"
    ],
    tableOfContents: [
      "บทที่ 1: ความต้องการระบบ (CRUD, Priority Levels & CSV Import/Export)",
      "บทที่ 2: สถาปัตยกรรม 3-Tier (database.py, csv_service.py, main_window.py)",
      "บทที่ 3: ความปลอดภัยขั้นสูง: Parameterized Query ป้องกัน SQL Injection",
      "บทที่ 4: การทดสอบ Edge Cases และการตรวจจับข้อมูลขยะ (Garbage Data)",
      "บทที่ 5: คู่มือการสำรองฐานข้อมูลและการ Deploy"
    ],
    sampleContent: "SQLite Task Manager PRO: ออกแบบระบบฐานข้อมูลแบบ 3-Tier รับประกันความปลอดภัยด้วย Parameterized Query 100% พร้อมระบบ Soft Delete ป้องกันข้อมูลสูญหาย..."
  }
];
