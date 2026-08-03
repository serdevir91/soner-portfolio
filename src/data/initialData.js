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

  skills: [
    {
      id: "skill_cat_1",
      category: { tr: "CAD & Modelleme", en: "CAD & Modeling" },
      tags: ["SolidWorks", "PTC Creo", "AutoCAD", "Autodesk Fusion 360", "Gelişmiş Yüzey Modelleme", "Profil Tasarımı (Weldments)", "İmalat Çizimleri"]
    },
    {
      id: "skill_cat_2",
      category: { tr: "Simülasyon & Mühendislik Metotları", en: "Simulation & Engineering Methods" },
      tags: ["ANSYS", "SolidWorks Simulation", "Sonlu Elemanlar Analizi (FEA)", "GD&T (Geometrik Toleranslandırma)", "DFM (Üretilebilirlik için Tasarım)", "BOM Oluşturma", "Tolerans Analizi", "Malzeme Seçimi"]
    },
    {
      id: "skill_cat_3",
      category: { tr: "İmalat & Yazılım", en: "Manufacturing & Software" },
      tags: ["CNC İşleme Süreçleri", "Kompozit İmalatı (Karbon Fiber)", "3D Yazıcı / Eklemeli İmalat", "Sac Metal Tasarımı", "MATLAB", "Python", "Flutter", "Teknik Rapor Hazırlama"]
    }
  ],

  experience: [
    {
      id: "exp_1",
      role: { en: "Engineering Intern", tr: "Mühendislik Stajyeri" },
      company: "Deico Engineering Inc.",
      date: "July 2025 – August 2025",
      bullets: {
        en: [
          "Designed and modeled precision mechanical components and structural assemblies for aerospace and defense projects using SolidWorks and Creo, ensuring strict adherence to GD&T standards.",
          "Conducted Finite Element Analysis (FEA) to validate component durability and weight optimization, reducing structural mass by 10% while maintaining target safety factors.",
          "Assisted in DFM reviews and collaborated with CNC machinists to optimize manufacturing workflows, reducing prototyping cycle time by 15%."
        ],
        tr: [
          "Havacılık ve savunma projeleri için hassas mekanik bileşenlerin ve yapısal montajların SolidWorks ve Creo kullanarak tasarımını ve modellemesini gerçekleştirdim, GD&T standartlarına tam uyum sağladım.",
          "Bileşen dayanıklılığını ve ağırlık optimizasyonunu doğrulamak için Sonlu Elemanlar Analizi (FEA) yürüttüm, hedeflenen güvenlik faktörlerini koruyarak yapısal kütleyi %10 azalttım.",
          "DFM incelemelerine yardımcı oldum ve imalat iş akışlarını optimize etmek için CNC operatörleriyle iş birliği yaparak prototip oluşturma döngü süresini %15 kısalttım."
        ]
      }
    },
    {
      id: "exp_2",
      role: { en: "Laboratory Assistant (İŞKUR Program)", tr: "Laboratuvar Mühendisi (Araştırmacı - İŞKUR)" },
      company: "Akdeniz University Mechanical Laboratory",
      date: "February 2025 – June 2025",
      bullets: {
        en: [
          "Managed setup, calibration, and safety protocols for laboratory testing machinery (tensile, fatigue, and hardness testing), achieving zero safety incidents over 5 months.",
          "Supported faculty and 50+ undergraduate students in conducting experimental tests and data acquisition, preparing detailed technical reports.",
          "Performed regular maintenance and troubleshooting of workshop tools, increasing equipment uptime by 20%."
        ],
        tr: [
          "Çekme, yorulma ve sertlik ölçüm gibi mekanik test cihazlarının kurulumu, kalibrasyonu ve iş güvenliği protokollerinin yönetimini üstlendim; 5 aylık süreçte sıfır iş kazası ile operasyonları tamamladım.",
          "Akademik kadroya ve 50'den fazla lisans öğrencisine deneysel testler ve veri toplama süreçlerinde destek verdim, ayrıntılı teknik raporlar hazırladım.",
          "Atölye ekipmanlarının düzenli bakım ve arıza tespit işlemlerini yürüterek cihazların çalışma süresini (uptime) %20 oranında artırdım."
        ]
      }
    },
    {
      id: "exp_3",
      role: { en: "Engineering Intern", tr: "Mühendislik Stajyeri" },
      company: "Kristal Industry Inc.",
      date: "July 2024 – August 2024",
      bullets: {
        en: [
          "Participated in sheet metal design and CNC programming for industrial kitchen and refrigeration equipment, streamlining shop-floor fabrication.",
          "Created detailed engineering drawings and manufacturing documentation (BOMs), reducing assembly alignment errors by 12%.",
          "Supported quality control inspections of incoming materials and finished assemblies, verifying tolerances against technical specifications."
        ],
        tr: [
          "Endüstriyel mutfak ve soğutma ekipmanları için sac metal tasarımı ve CNC programlama süreçlerine katılarak atölye üretim süreçlerinin hızlandırılmasına katkı sağladım.",
          "Ayrıntılı imalat resimleri ve teknik dokümantasyonlar (BOM) hazırlayarak montaj aşamasındaki hizalama hatalarını %12 oranında azalttım.",
          "Gelen malzemelerin ve tamamlanan montajların kalite kontrol testlerine katıldım, toleransların teknik şartnamelere uygunluğunu doğruladım."
        ]
      }
    }
  ],

  projects: [
    {
      id: "proj_1",
      title: "Composite Matrix Structure Supported Silicone Rubber Gasket Design and Test Validation",
      role: "Team Leader",
      company: "TUSAŞ Lift Up R&D Project",
      date: "October 2025 – June 2026",
      bullets: {
        en: [
          "Led a 5-member engineering team in the R&D and validation of an aerospace-grade composite matrix supported gasket, meeting all project milestones ahead of schedule.",
          "Performed advanced FEA simulations in ANSYS to predict gasket behavior under thermal and high-pressure conditions, optimizing design to improve pressure sealing by 18%.",
          "Coordinated with TUSAŞ technical advisors and academic mentors to execute physical testing and validation reports."
        ],
        tr: [
          "Havacılık standartlarına uygun kompozit destekli conta tasarımı ve doğrulanması süreçlerinde 5 kişilik mühendislik ekibine liderlik ettim.",
          "Contanın termal ve yüksek basınç altındaki davranışlarını öngörmek için ANSYS ortamında gelişmiş FEA simülasyonları gerçekleştirdim, sızdırmazlık performansını %18 artırdım.",
          "TUSAŞ teknik danışmanları ve akademik danışmanlarla koordineli olarak fiziksel testleri ve doğrulama raporlarını başarıyla yürüttüm."
        ]
      }
    },
    {
      id: "proj_2",
      title: "YILKAT Electric Vehicle Team (TÜBİTAK Challenge)",
      role: "Mechanical Division Captain",
      company: "YILKAT Electric Vehicle Team",
      date: "2024 – 2026",
      bullets: {
        en: [
          "Managed the mechanical division (5 engineers) in the design, CAD modeling, and manufacturing of chassis, steering, braking, and drivetrain systems for an electric race vehicle.",
          "Performed structural FEA on the tubular steel chassis using ANSYS, reducing chassis weight by 15% while improving torsional rigidity by 8%.",
          "Oversaw physical assembly and integration of mechanical systems with electrical components, passing all TÜBİTAK technical inspections on the first attempt."
        ],
        tr: [
          "Elektrikli yarış aracının şasi, direksiyon, fren ve aktarma organları sistemlerinin tasarımı, CAD modellemesi ve imalatında 5 kişilik mekanik ekibi yönettim.",
          "ANSYS kullanarak boru tipi çelik şasi üzerinde yapısal FEA gerçekleştirdim, burulma rijitliğini %8 artırırken şasi ağırlığını %15 hafiflettim.",
          "Mekanik sistemlerin elektrikli bileşenlerle fiziksel montajını ve entegrasyonunu gözeterek tüm TÜBİTAK teknik kontrollerinden ilk seferde geçmeyi sağladım."
        ]
      }
    },
    {
      id: "proj_3",
      title: "UMAY Electromobile Team (TÜBİTAK Challenge)",
      role: "Mechanical Designer",
      company: "UMAY Electromobile Team",
      date: "2023 – 2024",
      bullets: {
        en: [
          "Developed the aerodynamic outer shell and carbon fiber body of the EV prototype using SolidWorks Surface Modeling, reducing the drag coefficient (Cd) by 12%.",
          "Fabricated carbon fiber composite body panels using vacuum bagging techniques, achieving a 20% weight reduction compared to fiberglass alternatives.",
          "Integrated shell mounting points with the chassis frame, ensuring structural alignment and ease of assembly."
        ],
        tr: [
          "SolidWorks Yüzey Modelleme kullanarak EV prototipinin aerodinamik dış kabuğunu ve karbon fiber gövdesini geliştirdim, sürüklenme katsayısını (Cd) %12 azalttım.",
          "Vakum torbalama tekniklerini kullanarak karbon fiber kompozit gövde panelleri imal ettim, cam elyaf alternatiflerine kıyasla %20 ağırlık tasarrufu sağladım.",
          "Kabuk montaj noktalarını şasi çerçevesi ile entegre ederek yapısal hizalamayı ve montaj kolaylığını sağladım."
        ]
      }
    },
    {
      id: "proj_4",
      title: "WAST Electromobile Team (TÜBİTAK Challenge)",
      role: "Chassis Designer",
      company: "WAST Electromobile Team",
      date: "2022 – 2023",
      bullets: {
        en: [
          "Designed and modeled the tubular safety frame for the electric vehicle using SolidWorks Weldments.",
          "Conducted structural impact simulations to verify driver cell safety, satisfying TÜBİTAK regulatory requirements.",
          "Prepared BOMs and production drawings for chassis welding, reducing manufacturing assembly time by 10%."
        ],
        tr: [
          "SolidWorks Weldments kullanarak elektrikli araç için boru tipi güvenlik çerçevesini tasarladım ve modelledim.",
          "Sürücü hücresi güvenliğini doğrulamak ve TÜBİTAK mevzuat gereksinimlerini karşılamak için yapısal darbe simülasyonları yürüttüm.",
          "Şasi kaynağı için malzeme listeleri (BOM) ve üretim çizimleri hazırlayarak imalat montaj süresini %10 azalttım."
        ]
      }
    }
  ],

  education: [
    {
      id: "edu_master",
      degree: "M.Sc. in Mechanical Engineering (With Thesis)",
      school: "Ankara Yıldırım Beyazıt University (Ankara, Turkey)",
      date: "2026 – 2029 (Ongoing)",
      honors: "Yüksek Lisans (Tezli)"
    },
    {
      id: "edu_1",
      degree: "B.Sc. in Mechanical Engineering",
      school: "Akdeniz University (Antalya, Turkey)",
      date: "Graduated: 2026",
      honors: "Graduated 3rd in the Department"
    },
    {
      id: "edu_2",
      degree: "Intensive English Language Program",
      school: "Berlitz Language Academy (Esas Sosyal Program)",
      date: "2025 – 2026",
      honors: "B2+ İleri Düzey Sertifika"
    },
    {
      id: "edu_3",
      degree: "High School Diploma",
      school: "Ceyhan Science High School (Adana, Turkey)",
      date: "Graduated: 2021",
      honors: "Fen Lisesi Derece Mezunu"
    }
  ],

  languages: [
    { id: "lang_1", name: "Turkish", level: "Native Speaker" },
    { id: "lang_2", name: "English", level: "B2 Professional" }
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
      name: "Prof. Dr. Volkan Kovan (Academic Advisor)",
      title: "Akdeniz University, Dept. of Mechanical Engineering (Construction and Mfg)",
      phone: "+90 242 310 6344",
      email: "kovan@akdeniz.edu.tr",
      profileUrl: "https://avesis.akdeniz.edu.tr/kovan"
    },
    {
      id: "ref_2",
      name: "Prof. İbrahim Atmaca",
      title: "Akdeniz University, Dept. of Mechanical Engineering (Thermodynamics)",
      phone: "+90 242 310 6337",
      email: "atmaca@akdeniz.edu.tr",
      profileUrl: "http://makine.muhfak.akdeniz.edu.tr/ibrahim-atmaca"
    },
    {
      id: "ref_3",
      name: "Doç. Dr. Okan Oral",
      title: "Akdeniz University, Dept. of Mechanical Engineering",
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
