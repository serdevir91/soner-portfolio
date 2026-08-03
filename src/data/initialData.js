export const INITIAL_PORTFOLIO_DATA = {
  profile: {
    name: "Soner Erdevir",
    title: "Mechanical R&D, Design & Simulation Engineer",
    location: "Ankara, Turkey",
    phone: "+90 544 123 01 19",
    email: "sonererdevir@gmail.com",
    linkedin: "https://www.linkedin.com/in/soner-erdevir",
    avatar: "profile.jpeg",
    bio: {
      en: "Mechanical Engineer specializing in composite-supported rubber seals, FEA simulation (ANSYS/SolidWorks), thermo-fluid systems, and cross-platform software development (Flutter/React/Python).",
      tr: "Kompozit destekli kauçuk conta tasarımı, FEA simülasyonları (ANSYS/SolidWorks), termo-akışkan sistemler ve çapraz platform yazılım geliştirme (Flutter/React/Python) alanlarında uzmanlaşmış Makine Mühendisi."
    }
  },

  experience: [
    {
      id: "exp_1",
      role: { en: "Laboratuvar Mühendisi (Araştırmacı)", tr: "Laboratuvar Mühendisi (Araştırmacı)" },
      company: "Akdeniz Üniversitesi Makine Mühendisliği Laboratuvarları",
      date: "Şubat 2025 – Haziran 2025",
      bullets: {
        tr: [
          "Çekme, yorulma ve sertlik ölçüm gibi mekanik test cihazlarının kurulumu, kalibrasyonu ve iş güvenliği protokollerinin yönetimini üstlendim; 5 aylık süreçte sıfır iş kazası ile operasyonları tamamladım.",
          "Akademik kadroya ve 50'den fazla lisans öğrencisine deneysel testler ve veri toplama süreçlerinde destek verdim, ayrıntılı teknik raporlar hazırladım.",
          "Atölye ekipmanlarının düzenli bakım ve arıza tespit işlemlerini yürüterek cihazların çalışma süresini (uptime) %20 oranında artırdım."
        ],
        en: [
          "Managed installation, calibration, and safety protocols for tensile, fatigue, and hardness testing equipment with zero incidents.",
          "Assisted academic staff and 50+ undergraduate students in experimental testing and data collection.",
          "Increased equipment uptime by 20% through preventive maintenance and troubleshooting."
        ]
      }
    },
    {
      id: "exp_2",
      role: { en: "Mühendislik Stajyeri", tr: "Mühendislik Stajyeri" },
      company: "Kristal Endüstriyel A.Ş.",
      date: "Temmuz 2024 – Ağustos 2024",
      bullets: {
        tr: [
          "Endüstriyel mutfak ve soğutma ekipmanları için sac metal tasarımı ve CNC programlama süreçlerine katılarak atölye üretim süreçlerinin hızlandırılmasına katkı sağladım.",
          "Ayrıntılı imalat resimleri ve teknik dokümantasyonlar (BOM) hazırlayarak montaj aşamasındaki hizalama hatalarını %12 oranında azalttım.",
          "Gelen malzemelerin ve tamamlanan montajların kalite kontrol testlerine katıldım, toleransların teknik şartnamelere uygunluğunu doğruladım."
        ],
        en: [
          "Contributed to sheet metal design and CNC programming for industrial kitchen and cooling equipment.",
          "Prepared detailed manufacturing drawings and Bill of Materials (BOM), reducing assembly errors by 12%.",
          "Performed quality control inspections on incoming raw materials and finished assemblies."
        ]
      }
    }
  ],

  projects: [
    {
      id: "proj_1",
      title: "Kompozit Matris Yapı Destekli Silikon Kauçuk Conta Tasarımı ve Test Doğrulaması",
      role: "Takım Lideri",
      company: "TUSAŞ Lift Up Ar-Ge Projesi",
      date: "Ekim 2025 – Haziran 2026",
      bullets: {
        tr: [
          "Havacılık standartlarına uygun kompozit destekli conta tasarımı ve doğrulanması süreçlerinde 5 kişilik mühendislik ekibine liderlik ettim.",
          "Contanın termal ve yüksek basınç altındaki davranışlarını öngörmek için ANSYS ortamında gelişmiş FEA simülasyonları gerçekleştirdim, sızdırmazlık performansını %18 artırdım.",
          "TUSAŞ teknik danışmanları ve akademik danışmanlarla koordineli olarak fiziksel testleri ve doğrulama raporlarını başarıyla yürüttüm."
        ],
        en: [
          "Led a 5-person engineering team in designing and validating composite-reinforced aerospace seals.",
          "Executed advanced FEA simulations in ANSYS under high thermal and pressure conditions, improving sealing performance by 18%.",
          "Coordinated physical testing and verification reports with TUSAŞ technical advisors."
        ]
      }
    },
    {
      id: "proj_2",
      title: "TÜBİTAK Elektrikli Araç Yarışı Mekanik Geliştirme",
      role: "Mekanik Bölüm Kaptanı",
      company: "YILKAT Elektrikli Araç Takımı",
      date: "2024 – 2026",
      bullets: {
        tr: [
          "Elektrikli yarış aracının şasi, direksiyon ve fren sistemlerinin SolidWorks ortamında 3D CAD optimizasyonunu ve FEA analizlerini yönettim.",
          "Toplam araç ağırlığını %15 hafifleterek batarya menzilinde ve ivmelenmede önemli performans artışı sağladım."
        ],
        en: [
          "Managed 3D CAD modeling and FEA optimization of chassis, steering, and braking systems in SolidWorks.",
          "Reduced total vehicle weight by 15%, increasing battery range and acceleration performance."
        ]
      }
    }
  ],

  education: [
    {
      id: "edu_1",
      degree: "Lisans, Makine Mühendisliği",
      school: "Akdeniz Üniversitesi (Antalya)",
      date: "Mezuniyet: 2026",
      honors: "Bölüm Dönem 3.lüğü ile Mezuniyet"
    },
    {
      id: "edu_2",
      degree: "Yoğunlaştırılmış İngilizce Eğitimi",
      school: "Berlitz Dil Akademisi (Esas Sosyal Programı)",
      date: "2025 – 2026",
      honors: "B2+ İleri Düzey Sertifika"
    },
    {
      id: "edu_3",
      degree: "Lise Diploması",
      school: "Ceyhan Eczacı Bahattin Sevinç Erdinç Fen Lisesi (Adana)",
      date: "Mezuniyet: 2021",
      honors: "Fen Lisesi Derece Mezunu"
    }
  ],

  languages: [
    { id: "lang_1", name: "Türkçe", level: "Ana Dil" },
    { id: "lang_2", name: "İngilizce", level: "Profesyonel Çalışma Yetkinliği (B2+)" }
  ],

  certificates: [
    {
      id: "cert_1",
      title: "TUSAŞ Lift Up Ar-Ge Projesi Başarı Belgesi",
      issuer: "Türk Havacılık ve Uzay Sanayii (TUSAŞ)",
      date: "2026",
      credentialUrl: ""
    },
    {
      id: "cert_2",
      title: "Berlitz İleri Düzey İngilizce Sertifikası (B2+)",
      issuer: "Berlitz Dil Akademisi & Esas Sosyal",
      date: "2026",
      credentialUrl: ""
    },
    {
      id: "cert_3",
      title: "TÜBİTAK Efficiency Challenge Katılım & Derece Belgesi",
      issuer: "TÜBİTAK",
      date: "2025",
      credentialUrl: ""
    }
  ],

  references: [
    {
      id: "ref_1",
      name: "Doç. Dr. H. Ersin Kovan",
      title: "Akdeniz Üniversitesi, Makine Mühendisliği Bölümü (Konstrüksiyon ve İmalat)",
      phone: "+90 242 310 6344",
      email: "kovan@akdeniz.edu.tr",
      profileUrl: "https://avesis.akdeniz.edu.tr/kovan"
    },
    {
      id: "ref_2",
      name: "Prof. İbrahim Atmaca",
      title: "Akdeniz Üniversitesi, Makine Mühendisliği Bölümü (Termodinamik)",
      phone: "+90 242 310 6337",
      email: "atmaca@akdeniz.edu.tr",
      profileUrl: "http://makine.muhfak.akdeniz.edu.tr/ibrahim-atmaca"
    },
    {
      id: "ref_3",
      name: "Doç. Dr. Okan Oral",
      title: "Akdeniz Üniversitesi, Makine Mühendisliği Bölümü",
      phone: "+90 242 310 6377",
      email: "okan@akdeniz.edu.tr",
      profileUrl: "https://avesis.akdeniz.edu.tr/okanoral"
    }
  ],

  apps: [
    {
      id: "autoshare",
      name: "AutoShare",
      tagline: {
        en: "Automatic local network file sharing - pair once, send, and forget.",
        tr: "Otomatik yerel ağ dosya paylaşımı - bir kez eşleştirin, gerisini düşünmeyin."
      },
      description: {
        en: "AutoShare is a utility that automates file sharing between devices on the same Wi-Fi or Mobile Hotspot.",
        tr: "AutoShare, aynı Wi-Fi veya Mobil Erişim Noktası üzerindeki cihazlar arasında dosya paylaşımını otomatikleştiren bir araçtır."
      },
      icon: "./apps/autoshare/icon.png",
      category: { en: "Utility / Tools", tr: "Araçlar / Dosya Paylaşımı" },
      platforms: ["Android", "Windows"],
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.autoshare.app",
      githubUrl: "https://github.com/serdevir91/autoshare",
      screenshots: [
        "./apps/autoshare/ss1.jpeg",
        "./apps/autoshare/ss2.jpeg",
        "./apps/autoshare/ss3.jpeg",
        "./apps/autoshare/ss4.jpeg"
      ],
      features: {
        en: ["Auto-Discovery via UDP", "Secure Pairing", "Auto-Accept", "Built-in File Manager"],
        tr: ["UDP ile Otomatik Keşif", "Güvenli Eşleştirme", "Otomatik Kabul", "Dahili Dosya Yöneticisi"]
      },
      version: "1.0.8",
      size: "18 MB",
      rating: "4.8",
      reviews: "42",
      releaseDate: "2026-07-05"
    },
    {
      id: "supzip",
      name: "SubZip",
      tagline: {
        en: "Powerful ZIP manager with background operations & AMOLED theme.",
        tr: "Arka plan işlemleri ve AMOLED temalı güçlü ZIP yöneticisi."
      },
      description: {
        en: "SubZip is a modern file manager and archive utility focused on ZIP workflows with local processing.",
        tr: "SubZip, ZIP iş akışlarına odaklanan modern bir dosya yöneticisi ve arşivleme aracıdır."
      },
      icon: "./apps/supzip/icon.png",
      category: { en: "Productivity / Tools", tr: "Verimlilik / Araçlar" },
      platforms: ["Android", "Windows"],
      playStoreUrl: "https://play.google.com/store/apps/details?id=www.subzip.app",
      githubUrl: "https://github.com/serdevir91/supzip",
      screenshots: [
        "./apps/supzip/ss1.png",
        "./apps/supzip/ss2.png",
        "./apps/supzip/ss3.png",
        "./apps/supzip/ss.png"
      ],
      features: {
        en: ["ZIP compression & extraction", "Local-first privacy", "Background Queue", "AMOLED Dark Mode"],
        tr: ["ZIP sıkıştırma ve çıkarma", "Yerel öncelikli gizlilik", "Arka Plan Kuyruğu", "AMOLED Koyu Mod"]
      },
      version: "1.1.2",
      size: "12 MB",
      rating: "4.9",
      reviews: "31",
      releaseDate: "2026-06-27"
    },
    {
      id: "workout_tracker",
      name: "Workout Tracker",
      tagline: {
        en: "Track sets, reps, weight, and view body progress with beautiful charts.",
        tr: "Setleri, tekrarları, ağırlıkları izleyin ve ilerlemenizi harika grafiklerle görün."
      },
      description: {
        en: "Modern Workout Tracker is a sleek fitness journal to track workouts, log sets, and explore 870+ exercises.",
        tr: "Modern Workout Tracker, antrenmanları kaydetmek ve 870+ egzersiz kütüphanesini keşfetmek için tasarlanmış şık bir fitness günlüğüdür."
      },
      icon: "./apps/workout_tracker/icon.png",
      category: { en: "Health & Fitness", tr: "Sağlık ve Spor" },
      platforms: ["Android", "Windows"],
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.workouttracker.workout_tracker",
      githubUrl: "https://github.com/serdevir91/Workout-Tracker",
      screenshots: [
        "./apps/workout_tracker/ss1.png",
        "./apps/workout_tracker/ss2.png",
        "./apps/workout_tracker/ss3.png"
      ],
      features: {
        en: ["870+ exercise database", "Body progress analytics", "AMOLED themes", "SAF local backups"],
        tr: ["870+ egzersiz veritabanı", "Vücut gelişim analitiği", "AMOLED temalar", "SAF yerel yedekleri"]
      },
      version: "3.1.21",
      size: "24 MB",
      rating: "4.9",
      reviews: "88",
      releaseDate: "2026-07-09"
    },
    {
      id: "flappy_rogue",
      name: "Flappy Rogue",
      tagline: {
        en: "Retro-style arcade hopper with rogue-like dungeon upgrades.",
        tr: "Rogue-like zindan geliştirmeleri sunan retro tarzı atlama oyunu."
      },
      description: {
        en: "Flappy Rogue combines Flappy Bird mechanics with rogue-like progression.",
        tr: "Flappy Rogue, Flappy Bird mekaniklerini rogue-like ilerleme ile birleştirir."
      },
      icon: "./apps/flappy_rogue/icon.png",
      category: { en: "Games / Arcade", tr: "Oyunlar / Atari" },
      platforms: ["Android"],
      playStoreUrl: "https://play.google.com/store/apps/details?id=www.flappyrogue.app",
      githubUrl: "https://github.com/serdevir91/flappy_rogue",
      screenshots: [
        "./apps/flappy_rogue/ss1.png",
        "./apps/flappy_rogue/ss2.png",
        "./apps/flappy_rogue/ss3.png",
        "./apps/flappy_rogue/ss4.png",
        "./apps/flappy_rogue/ss5.png",
        "./apps/flappy_rogue/ss6.png",
        "./apps/flappy_rogue/ss7.png"
      ],
      features: {
        en: ["Procedural rogue-like obstacles", "Permanent store upgrades", "Unlockable skins", "Offline play"],
        tr: ["Prosedürel engeller", "Kalıcı mağaza geliştirmeleri", "Açılabilir kaplamalar", "Çevrimdışı oyun"]
      },
      version: "2.1.0",
      size: "15 MB",
      rating: "4.7",
      reviews: "56",
      releaseDate: "2026-06-24"
    },
    {
      id: "stokapp",
      name: "Stokapp",
      tagline: {
        en: "Modern inventory & stock management system with financial analytics.",
        tr: "Finansal analizler sunan modern stok ve envanter yönetim sistemi."
      },
      description: {
        en: "Stokapp is an intuitive stock and inventory tracking web application built with React, Vite, and Tailwind CSS.",
        tr: "Stokapp; React, Vite ve Tailwind CSS ile geliştirilmiş sezgisel bir stok ve envanter takip web uygulamasıdır."
      },
      icon: "./apps/stokapp/icon.png",
      category: { en: "Business / Finance", tr: "İş & Finans" },
      platforms: ["Web", "Windows"],
      playStoreUrl: null,
      githubUrl: "https://github.com/serdevir91/Stokapp",
      screenshots: [],
      features: {
        en: ["Fast stock operations", "Red alert threshold warnings", "Profit/loss charts", "Excel integration"],
        tr: ["Hızlı stok işlemleri", "Kritik stok uyarısı", "Kâr/zarar grafikleri", "Excel entegrasyonu"]
      },
      version: "1.0.0",
      size: "Web App",
      rating: "4.9",
      reviews: "Web App",
      releaseDate: "2025-12-07"
    }
  ]
};
