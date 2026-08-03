import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, ExternalLink, Download, X, ChevronLeft, ChevronRight, 
  Smartphone, Monitor, Sparkles, Code, Info, Check, Eye
} from 'lucide-react';

const APPS = [
  {
    id: "autoshare",
    name: "AutoShare",
    tagline: {
      en: "Automatic local network file sharing - pair once, send, and forget.",
      tr: "Otomatik yerel ağ dosya paylaşımı - bir kez eşleştirin, gerisini düşünmeyin."
    },
    description: {
      en: "AutoShare is a utility that automates file sharing between devices on the same Wi-Fi or Mobile Hotspot. Once paired, files are accepted automatically and saved to the downloads folder - removing the hassle of clicking accept for every single file.",
      tr: "AutoShare, aynı Wi-Fi veya Mobil Erişim Noktası üzerindeki cihazlar arasında dosya paylaşımını otomatikleştiren bir araçtır. Bir kez eşleştirildikten sonra, her dosya aktarımı için manuel onay vermenize gerek kalmadan dosyalar otomatik olarak kabul edilir."
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
      en: [
        "Auto-Discovery: Find devices instantly using UDP Broadcast.",
        "Secure Pairing: One-time token-based pairing system.",
        "Auto-Accept: Incoming transfers from trusted devices accept automatically.",
        "Built-in File Manager: Easily view, delete, move, or share received files.",
        "Background transfers and notifications.",
        "Play Age Signals verified."
      ],
      tr: [
        "Otomatik Keşif: UDP Yayını kullanarak cihazları anında bulun.",
        "Güvenli Eşleştirme: Tek seferlik token tabanlı eşleştirme sistemi.",
        "Otomatik Kabul: Güvenilen cihazlardan gelen transferler otomatik kabul edilir.",
        "Dahili Dosya Yöneticisi: Alınan dosyaları kolayca görüntüleyin, silin veya taşıyın.",
        "Arka plan aktarımları ve bildirimler.",
        "Play Yaş Sinyalleri doğrulaması."
      ]
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
      en: "SubZip is a modern file manager and archive utility focused on ZIP workflows. It processes files entirely locally, supports robust archive operations, and runs long-running copy, move, and extract tasks in a reliable background queue.",
      tr: "SubZip, ZIP iş akışlarına odaklanan modern bir dosya yöneticisi ve arşivleme aracıdır. Dosyaları tamamen yerel olarak işler, gelişmiş arşiv operasyonlarını destekler ve kopyalama, taşıma ve çıkarma gibi işlemleri arka planda yürütür."
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
      en: [
        "Full ZIP compression and high-speed extraction.",
        "Local-first: Offline processing for complete privacy.",
        "Background Task Queue: Run heavy operations without blocking the UI.",
        "Folder Customization and custom shortcuts.",
        "AMOLED Dark Mode support."
      ],
      tr: [
        "Tam ZIP sıkıştırma ve yüksek hızlı çıkarma.",
        "Yerel öncelikli: Eksiksiz gizlilik için çevrimdışı işleme.",
        "Arka Plan Görev Kuyruğu: Arayüzü kilitlemeden ağır işlemler yürütün.",
        "Klasör Özelleştirme ve özel kısayollar.",
        "AMOLED Koyu Mod desteği."
      ]
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
      en: "Modern Workout Tracker is a sleek, offline-first fitness journal designed to track workouts, log sets and cardio sessions, explore an extensive library of 870+ exercises with animations, and visualize body progress with interactive analytics.",
      tr: "Modern Workout Tracker, antrenmanları kaydetmek, setleri ve kardiyo seanslarını izlemek, animasyonlu 870+ egzersiz kütüphanesini keşfetmek ve vücut gelişimini grafiklerle görselleştirmek için tasarlanmış şık bir fitness günlüğüdür."
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
      en: [
        "870+ exercise library with muscle group categorization and animations.",
        "Body progress line charts and muscle volume distribution analytics.",
        "AMOLED Black, Light, and Dark themes with 6 color palettes.",
        "Workout plans and calendar-based routine scheduling.",
        "Secure Storage Access Framework (SAF) local backups."
      ],
      tr: [
        "Kas gruplarına göre kategorize edilmiş 870'den fazla egzersiz kütüphanesi ve animasyonlar.",
        "Vücut gelişim çizgi grafikleri ve kas hacmi dağılım analizleri.",
        "6 renk paletiyle AMOLED Siyah, Açık ve Koyu tema seçenekleri.",
        "Egzersiz planları ve takvim tabanlı rutin planlama.",
        "Secure Storage Access Framework (SAF) yerel yedeklemeleri."
      ]
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
      en: "Flappy Rogue combines the classic addictive tapping mechanics of Flappy Bird with rogue-like progression. Dodge spikes, collect gold, and unlock powerful permanent meta-upgrades to flap deeper into the dark dungeons.",
      tr: "Flappy Rogue, Flappy Bird'ün klasik bağımlılık yapıcı mekaniklerini rogue-like ilerleme ile birleştirir. Dikenlerden kaçın, altın toplayın ve karanlık zindanların daha derinlerine inmek için kalıcı dükkan yükseltmelerini açın."
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
      en: [
        "Challenging procedural rogue-like dungeon obstacles.",
        "Permanent store upgrades (speed, coin multiplier, shields).",
        "Unique character skins to unlock.",
        "Responsive offline gameplay with zero ads or tracking.",
        "Animated retro physics and sound effects."
      ],
      tr: [
        "Zorlu prosedürel rogue-like zindan engelleri.",
        "Kalıcı mağaza yükseltmeleri (hız, altın çarpanı, kalkanlar).",
        "Kilidi açılabilir benzersiz karakter kaplamaları.",
        "Sıfır reklam veya takip içeren duyarlı çevrimdışı oynanış.",
        "Animasyonlu retro fizik ve ses efektleri."
      ]
    },
    version: "2.1.0",
    size: "15 MB",
    rating: "4.7",
    reviews: "56",
    releaseDate: "2026-06-24"
  },
  {
    id: "stream_app",
    name: "StreamApp",
    tagline: {
      en: "Media browser and player with extensible source add-ons.",
      tr: "Genişletilebilir kaynak eklentilerine sahip medya tarayıcısı ve oynatıcı."
    },
    description: {
      en: "StreamApp is a Flutter-based media client powered by a local FastAPI backend. It features an add-on manager to install and manage custom scrapers/resolvers, aggregates movies and series metadata from TMDB, and streams content through VLC/WebView plugins.",
      tr: "StreamApp, yerel bir FastAPI arka ucuyla desteklenen Flutter tabanlı bir medya istemcisidir. Özel çözücüleri yönetmek için eklenti yöneticisi barındırır, TMDB'den film/dizi verilerini çeker ve VLC/WebView entegrasyonuyla oynatır."
    },
    icon: "./apps/stream_app/icon.png",
    category: {
      en: "Entertainment",
      tr: "Eğlence / Sinema"
    },
    platforms: ["Android", "Windows"],
    playStoreUrl: null,
    githubUrl: "https://github.com/serdevir91/stream_app",
    screenshots: [
      "./apps/stream_app/ss1.png",
      "./apps/stream_app/ss2.png",
      "./apps/stream_app/ss3.png",
      "./apps/stream_app/ss4.png"
    ],
    features: {
      en: [
        "Extensible Add-on Architecture: Install scrapers from JSON manifests or URLs.",
        "Rich UI: Discover trending titles, search, and view detailed metadata.",
        "Watch History: Progress tracking and resume playback functionality.",
        "Local API: Runs a lightweight python FastAPI server for streaming.",
        "Multi-language and external subtitle selector."
      ],
      tr: [
        "Genişletilebilir Eklenti Mimarisi: JSON veya URL ile kazıyıcılar yükleyin.",
        "Zengin Arayüz: Trend filmleri keşfedin, arayın ve detaylı verileri görüntüleyin.",
        "İzleme Geçmişi: İlerleme takibi ve oynatmaya devam etme işlevleri.",
        "Yerel API: Akış işlemleri için hafif bir python FastAPI sunucusu çalıştırır.",
        "Çoklu dil ve harici altyazı seçici."
      ]
    },
    version: "1.0.13",
    size: "30 MB",
    rating: "4.8 (Dev)",
    reviews: "Github Release",
    releaseDate: "2026-07-13"
  },
  {
    id: "stokapp",
    name: "Stokapp",
    tagline: {
      en: "Modern inventory & stock management system with financial analytics.",
      tr: "Finansal analizler sunan modern stok ve envanter yönetim sistemi."
    },
    description: {
      en: "Stokapp is an intuitive stock and inventory tracking web application built with React, Vite, and Tailwind CSS. It offers real-time profit/loss tracking, low-stock warnings, and Excel import/export capability.",
      tr: "Stokapp; React, Vite ve Tailwind CSS ile geliştirilmiş sezgisel bir stok ve envanter takip web uygulamasıdır. Anlık kâr/zarar takibi, kritik stok uyarıları ve Excel içe/dışa aktarım desteği sunar."
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
      en: [
        "Product Management: Fast stock addition and deduction.",
        "Smart Alerts: Red alert warnings for critical stock thresholds.",
        "Financial Analytics: Automatic profit/loss charts and inventory valuation.",
        "Excel Integration: Import and export inventory lists easily."
      ],
      tr: [
        "Ürün Yönetimi: Hızlı stok ekleme ve düşme işlemleri.",
        "Akıllı Uyarılar: Kritik stok seviyeleri için kırmızı alarm uyarısı.",
        "Finansal Analiz: Otomatik kâr/zarar grafikleri ve kasa bakiyesi.",
        "Excel Entegrasyonu: Envanter listelerini kolayca içe ve dışa aktarın."
      ]
    },
    version: "1.0.0",
    size: "Web App",
    rating: "4.9",
    reviews: "Web App",
    releaseDate: "2025-12-07"
  }
];

const Store = ({ lang }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'android', 'windows', 'playstore'
  const [selectedApp, setSelectedApp] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedApp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedApp]);

  const filteredApps = APPS.filter(app => {
    if (filter === 'all') return true;
    if (filter === 'android') return app.platforms.includes('Android');
    if (filter === 'windows') return app.platforms.includes('Windows');
    if (filter === 'playstore') return app.playStoreUrl !== null;
    return true;
  });

  const t = {
    en: {
      title: "Applications Portal",
      subtitle: "Explore my mobile and desktop software projects, games, and productivity tools.",
      filterAll: "All Apps",
      filterAndroid: "Android",
      filterWindows: "Windows",
      filterPlayStore: "On Google Play",
      getPlayStore: "Get it on Google Play",
      viewGithub: "View on GitHub",
      details: "Details & Screenshots",
      platforms: "Platforms",
      category: "Category",
      version: "Version",
      size: "Size",
      rating: "Rating",
      reviews: "Reviews",
      releaseDate: "Released",
      features: "Key Features",
      downloads: "Download Channels",
      close: "Close",
      githubSource: "Open Source Code",
      directApk: "Download Direct APK",
      windowsSetup: "Download Windows Setup",
      publishedPlay: "Published on Play Store",
      githubProject: "GitHub Repository",
      devChannel: "Developer Channel"
    },
    tr: {
      title: "Uygulamalar Portalı",
      subtitle: "Geliştirdiğim mobil ve masaüstü yazılım projelerini, oyunları ve üretkenlik araçlarını keşfedin.",
      filterAll: "Tüm Uygulamalar",
      filterAndroid: "Android",
      filterWindows: "Windows",
      filterPlayStore: "Google Play'de",
      getPlayStore: "Google Play'den İndir",
      viewGithub: "GitHub'da Görüntüle",
      details: "Detaylar & Görseller",
      platforms: "Platformlar",
      category: "Kategori",
      version: "Sürüm",
      size: "Boyut",
      rating: "Puan",
      reviews: "Değerlendirme",
      releaseDate: "Yayınlanma",
      features: "Öne Çıkan Özellikler",
      downloads: "İndirme Kanalları",
      close: "Kapat",
      githubSource: "Açık Kaynak Kodları",
      directApk: "Doğrudan APK İndir",
      windowsSetup: "Windows Kurulum Dosyası İndir",
      publishedPlay: "Play Store'da Yayında",
      githubProject: "GitHub Projesi",
      devChannel: "Geliştirici Kanalı"
    }
  }[lang];

  const handleNextScreenshot = (e) => {
    e.stopPropagation();
    if (!selectedApp) return;
    setCurrentImgIndex((prev) => (prev + 1) % selectedApp.screenshots.length);
  };

  const handlePrevScreenshot = (e) => {
    e.stopPropagation();
    if (!selectedApp) return;
    setCurrentImgIndex((prev) => (prev - 1 + selectedApp.screenshots.length) % selectedApp.screenshots.length);
  };

  return (
    <section className="section" id="app-store">
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 className="gradient-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <ShoppingBag size={28} /> {t.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '1.05rem' }}>
          {t.subtitle}
        </p>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
        <div className="segmented-control">
          <button 
            className={`segment-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            {t.filterAll}
          </button>
          <button 
            className={`segment-btn ${filter === 'android' ? 'active' : ''}`} 
            onClick={() => setFilter('android')}
          >
            <Smartphone size={13} style={{ marginRight: '4px', display: 'inline', verticalAlign: 'middle' }} /> {t.filterAndroid}
          </button>
          <button 
            className={`segment-btn ${filter === 'windows' ? 'active' : ''}`} 
            onClick={() => setFilter('windows')}
          >
            <Monitor size={13} style={{ marginRight: '4px', display: 'inline', verticalAlign: 'middle' }} /> {t.filterWindows}
          </button>
          <button 
            className={`segment-btn ${filter === 'playstore' ? 'active' : ''}`} 
            onClick={() => setFilter('playstore')}
          >
            <Sparkles size={13} style={{ marginRight: '4px', display: 'inline', verticalAlign: 'middle' }} /> {t.filterPlayStore}
          </button>
        </div>
      </div>

      {/* APPS GRID */}
      <div className="store-grid">
        {filteredApps.map((app) => (
          <div key={app.id} className="glass-card store-card" onClick={() => { setSelectedApp(app); setCurrentImgIndex(0); }}>
            <div className="store-card-badge">
              {app.playStoreUrl ? (
                <span className="badge badge-accent" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  Google Play
                </span>
              ) : (
                <span className="badge badge-accent" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                  GitHub Only
                </span>
              )}
            </div>

            <div className="store-card-header">
              <img src={app.icon} alt={`${app.name} icon`} className="store-app-icon" onError={(e) => { e.target.src = './apps/autoshare/icon.png'; }} />
              <div className="store-app-meta">
                <h3 className="store-app-name">{app.name}</h3>
                <span className="store-app-cat">{app.category[lang]}</span>
                <div className="store-app-platforms">
                  {app.platforms.includes('Android') && <Smartphone size={14} title="Android" />}
                  {app.platforms.includes('Windows') && <Monitor size={14} title="Windows" />}
                  <span className="store-app-platform-text">{app.platforms.join(' & ')}</span>
                </div>
              </div>
            </div>

            <p className="store-app-tagline">
              {app.tagline[lang]}
            </p>

            <div className="store-card-actions" onClick={(e) => e.stopPropagation()}>
              <button className="btn store-detail-btn" onClick={() => { setSelectedApp(app); setCurrentImgIndex(0); }}>
                <Eye size={14} /> {t.details}
              </button>

              {app.playStoreUrl ? (
                <a href={app.playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary store-action-btn">
                  Play Store <ExternalLink size={12} />
                </a>
              ) : (
                <a href={app.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary store-action-btn" style={{ background: '#334155', borderColor: '#475569' }}>
                  GitHub <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* APP DETAILS MODAL */}
      {selectedApp && (
        <div className="store-modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="store-modal" onClick={(e) => e.stopPropagation()}>
            <button className="store-modal-close" onClick={() => setSelectedApp(null)} title={t.close}>
              <X size={20} />
            </button>

            <div className="store-modal-body">
              {/* MODAL HEADER */}
              <div className="store-modal-header">
                <img src={selectedApp.icon} alt={`${selectedApp.name} icon`} className="store-modal-icon" onError={(e) => { e.target.src = './apps/autoshare/icon.png'; }} />
                <div className="store-modal-meta">
                  <h2>{selectedApp.name}</h2>
                  <p className="store-modal-subtitle">{selectedApp.category[lang]}</p>
                  
                  <div className="store-modal-stats-row">
                    <div className="store-modal-stat">
                      <span className="store-modal-stat-label">{t.rating}</span>
                      <span className="store-modal-stat-val">★ {selectedApp.rating}</span>
                    </div>
                    <div className="store-modal-stat">
                      <span className="store-modal-stat-label">{t.reviews}</span>
                      <span className="store-modal-stat-val" style={{ fontSize: '0.85rem' }}>{selectedApp.reviews}</span>
                    </div>
                    <div className="store-modal-stat">
                      <span className="store-modal-stat-label">{t.size}</span>
                      <span className="store-modal-stat-val">{selectedApp.size}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* MODAL GRID CONTENT */}
              <div className="store-modal-grid">
                {/* LEFT BLOCK: INFO & LINKS */}
                <div className="store-modal-left">
                  <div className="glass-card store-info-box">
                    <div className="info-row">
                      <span className="info-label">{t.platforms}</span>
                      <span className="info-value">{selectedApp.platforms.join(', ')}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">{t.version}</span>
                      <span className="info-value">{selectedApp.version}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">{t.releaseDate}</span>
                      <span className="info-value">{selectedApp.releaseDate}</span>
                    </div>
                  </div>

                  <h3 className="store-section-title" style={{ marginTop: '1.5rem' }}>{t.downloads}</h3>
                  <div className="store-download-links">
                    {selectedApp.playStoreUrl && (
                      <a href={selectedApp.playStoreUrl} target="_blank" rel="noopener noreferrer" className="download-link-btn playstore-download">
                        <span className="download-btn-icon">🤖</span>
                        <div className="download-btn-text">
                          <span className="dl-small">{t.publishedPlay}</span>
                          <span className="dl-large">Google Play</span>
                        </div>
                      </a>
                    )}
                    
                    <a href={selectedApp.githubUrl} target="_blank" rel="noopener noreferrer" className="download-link-btn github-download">
                      <span className="download-btn-icon"><Code size={18} /></span>
                      <div className="download-btn-text">
                        <span className="dl-small">{t.githubProject}</span>
                        <span className="dl-large">GitHub Source</span>
                      </div>
                    </a>

                    {selectedApp.id === 'autoshare' && (
                      <>
                        <a href="https://github.com/serdevir91/autoshare/releases/latest/download/autoshare-release.apk" target="_blank" rel="noopener noreferrer" className="download-link-btn direct-download">
                          <span className="download-btn-icon"><Download size={16} /></span>
                          <div className="download-btn-text">
                            <span className="dl-small">{t.devChannel}</span>
                            <span className="dl-large">Direct APK</span>
                          </div>
                        </a>
                        <a href="https://github.com/serdevir91/autoshare/releases/latest/download/windows-setup-AutoShare.exe" target="_blank" rel="noopener noreferrer" className="download-link-btn direct-download">
                          <span className="download-btn-icon"><Monitor size={16} /></span>
                          <div className="download-btn-text">
                            <span className="dl-small">{t.devChannel}</span>
                            <span className="dl-large">Windows Setup</span>
                          </div>
                        </a>
                      </>
                    )}

                    {selectedApp.id === 'supzip' && (
                      <a href="https://github.com/serdevir91/supzip/releases" target="_blank" rel="noopener noreferrer" className="download-link-btn direct-download">
                        <span className="download-btn-icon"><Download size={16} /></span>
                        <div className="download-btn-text">
                          <span className="dl-small">{t.devChannel}</span>
                          <span className="dl-large">Releases & Assets</span>
                        </div>
                      </a>
                    )}

                    {selectedApp.id === 'workout_tracker' && (
                      <a href="https://github.com/serdevir91/Workout-Tracker/releases" target="_blank" rel="noopener noreferrer" className="download-link-btn direct-download">
                        <span className="download-btn-icon"><Download size={16} /></span>
                        <div className="download-btn-text">
                          <span className="dl-small">{t.devChannel}</span>
                          <span className="dl-large">Releases & APKs</span>
                        </div>
                      </a>
                    )}

                    {selectedApp.id === 'stream_app' && (
                      <>
                        <a href="https://github.com/serdevir91/stream_app/releases/download/v1.0.13/app-arm64-v8a-release.apk" target="_blank" rel="noopener noreferrer" className="download-link-btn direct-download">
                          <span className="download-btn-icon"><Download size={16} /></span>
                          <div className="download-btn-text">
                            <span className="dl-small">FastAPI Client</span>
                            <span className="dl-large">Android APK</span>
                          </div>
                        </a>
                        <a href="https://github.com/serdevir91/stream_app/releases/download/v1.0.13/StreamApp-Setup-v1.0.13.exe" target="_blank" rel="noopener noreferrer" className="download-link-btn direct-download">
                          <span className="download-btn-icon"><Monitor size={16} /></span>
                          <div className="download-btn-text">
                            <span className="dl-small">FastAPI Client</span>
                            <span className="dl-large">Windows Setup</span>
                          </div>
                        </a>
                      </>
                    )}

                    {selectedApp.id === 'stokapp' && (
                      <a href="https://serdevir91.github.io/Stokapp/" target="_blank" rel="noopener noreferrer" className="download-link-btn direct-download" style={{ background: 'rgba(59, 130, 246, 0.15)', borderColor: 'rgba(59, 130, 246, 0.3)', color: '#60a5fa' }}>
                        <span className="download-btn-icon"><ExternalLink size={16} /></span>
                        <div className="download-btn-text">
                          <span className="dl-small">Live Web App</span>
                          <span className="dl-large">Open Stokapp</span>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                {/* RIGHT BLOCK: DESCRIPTIONS & FEATURES */}
                <div className="store-modal-right">
                  <p className="store-modal-description">
                    {selectedApp.description[lang]}
                  </p>

                  <h3 className="store-section-title" style={{ marginTop: '1.2rem' }}>{t.features}</h3>
                  <ul className="store-features-list">
                    {selectedApp.features[lang].map((feature, i) => (
                      <li key={i}>
                        <Check size={14} className="feature-check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FULL-WIDTH LOWER BLOCK: SCREENSHOTS CAROUSEL */}
              <div className="store-modal-screenshots-section">
                <h3 className="store-section-title">Screenshots</h3>
                
                <div className="store-carousel-wrapper">
                  <button className="carousel-nav-btn prev" onClick={handlePrevScreenshot} aria-label="Previous image">
                    <ChevronLeft size={24} />
                  </button>

                  <div className="store-carousel-track">
                    <div className="store-carousel-slide" onClick={() => setZoomedImage(selectedApp.screenshots[currentImgIndex])}>
                      <img 
                        src={selectedApp.screenshots[currentImgIndex]} 
                        alt={`${selectedApp.name} screenshot ${currentImgIndex + 1}`} 
                        className="carousel-screenshot"
                      />
                      <div className="screenshot-overlay-hint">
                        <Eye size={18} />
                      </div>
                    </div>
                  </div>

                  <button className="carousel-nav-btn next" onClick={handleNextScreenshot} aria-label="Next image">
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* DOTS PAGINATION */}
                <div className="carousel-dots">
                  {selectedApp.screenshots.map((_, i) => (
                    <button 
                      key={i} 
                      className={`carousel-dot ${i === currentImgIndex ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setCurrentImgIndex(i); }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL SCREEN ZOOMED IMAGE LIGHTBOX */}
      {zoomedImage && (
        <div className="store-zoom-overlay" onClick={() => setZoomedImage(null)}>
          <button className="store-zoom-close" onClick={() => setZoomedImage(null)}>
            <X size={24} />
          </button>
          <img src={zoomedImage} alt="Zoomed screenshot" className="store-zoomed-image" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
};

export default Store;
