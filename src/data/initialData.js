export const INITIAL_PORTFOLIO_DATA = {
  profile: {
    name: "Soner Erdevir",
    title: "Mechanical R&D, Design & Simulation Engineer",
    location: "Ankara, Turkey",
    phone: "+90 544 123 01 19",
    email: "sonererdevir@gmail.com",
    linkedin: "https://www.linkedin.com/in/soner-erdevir",
    bio: {
      en: "Mechanical Engineer specializing in composite-supported rubber seals, FEA simulation (ANSYS/SolidWorks), thermo-fluid systems, and cross-platform software development (Flutter/React/Python).",
      tr: "Kompozit destekli kauçuk conta tasarımı, FEA simülasyonları (ANSYS/SolidWorks), termo-akışkan sistemler ve çapraz platform yazılım geliştirme (Flutter/React/Python) alanlarında uzmanlaşmış Makine Mühendisi."
    }
  },
  apps: [
    {
      id: "autoshare",
      name: "AutoShare",
      tagline: {
        en: "Automatic local network file sharing - pair once, send, and forget.",
        tr: "Otomatik yerel ağ dosya paylaşımı - bir kez eşleştirin, gerisini düşünmeyin."
      },
      description: {
        en: "AutoShare is a utility that automates file sharing between devices on the same Wi-Fi or Mobile Hotspot. Once paired, files are accepted automatically.",
        tr: "AutoShare, aynı Wi-Fi veya Mobil Erişim Noktası üzerindeki cihazlar arasında dosya paylaşımını otomatikleştiren bir araçtır."
      },
      icon: "./apps/autoshare/icon.png",
      category: {
        en: "Utility / Tools",
        tr: "Araçlar / Dosya Paylaşımı"
      },
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
      category: {
        en: "Productivity / Tools",
        tr: "Verimlilik / Araçlar"
      },
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
        en: "Modern Workout Tracker is a sleek fitness journal to track workouts, log sets, and explore 870+ exercises with animations.",
        tr: "Modern Workout Tracker, antrenmanları kaydetmek ve 870+ egzersiz kütüphanesini keşfetmek için tasarlanmış şık bir fitness günlüğüdür."
      },
      icon: "./apps/workout_tracker/icon.png",
      category: {
        en: "Health & Fitness",
        tr: "Sağlık ve Spor"
      },
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
        en: "Flappy Rogue combines Flappy Bird mechanics with rogue-like progression, store upgrades, and customizable skins.",
        tr: "Flappy Rogue, Flappy Bird mekaniklerini rogue-like ilerleme ve mağaza yükseltmeleri ile birleştirir."
      },
      icon: "./apps/flappy_rogue/icon.png",
      category: {
        en: "Games / Arcade",
        tr: "Oyunlar / Atari"
      },
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
      category: {
        en: "Business / Finance",
        tr: "İş & Finans"
      },
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
