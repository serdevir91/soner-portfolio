import React, { useState, useEffect } from 'react';
import { 
  Settings, Sliders, Printer, Sun, Moon, FileText, Eye, 
  User, Mail, Phone, Linkedin, MapPin, CheckCircle2, 
  Trophy, GraduationCap, Languages, Users, Award, Briefcase, Wrench,
  ShoppingBag, Lock, ShieldCheck, LogOut
} from 'lucide-react';

import Store from './components/Store';
import AdminDashboard from './components/AdminDashboard';
import { isAdminAuthenticated, logoutAdmin } from './utils/auth';
import { INITIAL_PORTFOLIO_DATA } from './data/initialData';

function App() {
  const [lang, setLang] = useState('en');
  const [viewMode, setViewMode] = useState('interactive');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Portfolio Data state (with smart ID-based merging)
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const mergeById = (parsedList, initialList) => {
          if (!parsedList || !Array.isArray(parsedList) || parsedList.length === 0) return initialList;
          const existingIds = new Set(parsedList.map(item => item.id));
          const missing = initialList.filter(item => !existingIds.has(item.id));
          return [...parsedList, ...missing];
        };

        return {
          ...INITIAL_PORTFOLIO_DATA,
          ...parsed,
          profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...(parsed.profile || {}) },
          experience: mergeById(parsed.experience, INITIAL_PORTFOLIO_DATA.experience),
          projects: mergeById(parsed.projects, INITIAL_PORTFOLIO_DATA.projects),
          education: mergeById(parsed.education, INITIAL_PORTFOLIO_DATA.education),
          skills: mergeById(parsed.skills, INITIAL_PORTFOLIO_DATA.skills),
          languages: mergeById(parsed.languages, INITIAL_PORTFOLIO_DATA.languages),
          certificates: mergeById(parsed.certificates, INITIAL_PORTFOLIO_DATA.certificates),
          references: mergeById(parsed.references, INITIAL_PORTFOLIO_DATA.references),
          apps: mergeById(parsed.apps, INITIAL_PORTFOLIO_DATA.apps),
        };
      } catch (e) {}
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  // Admin Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(() => isAdminAuthenticated());
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSaveData = (newData) => {
    setPortfolioData(newData);
    localStorage.setItem('portfolio_data', JSON.stringify(newData));
  };

  const handleResetData = () => {
    setPortfolioData(INITIAL_PORTFOLIO_DATA);
    localStorage.removeItem('portfolio_data');
    setShowAdminPanel(false);
    alert(lang === 'tr' ? 'Tüm veriler varsayılana sıfırlandı!' : 'Data reset to defaults!');
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsLoggedIn(false);
    setShowAdminPanel(false);
  };

  const handlePrint = () => {
    const previousView = viewMode;
    setViewMode('ats');
    setTimeout(() => {
      window.print();
      setViewMode(previousView);
    }, 150);
  };

  return (
    <div className={theme === 'light' ? 'light-theme' : ''}>
      
      {/* DASHBOARD HEADER (SCREEN ONLY) */}
      <header className="dashboard-header no-print">
        <div class="container header-wrapper">
          <div class="logo">
            <Settings size={20} className="logo-icon" />
            <span>SONER ERDEVİR</span>
          </div>
          
          {/* CONTROLS */}
          <div class="controls">
            {/* Language Switcher */}
            <div class="segmented-control">
              <button 
                className={`segment-btn ${lang === 'en' ? 'active' : ''}`} 
                onClick={() => setLang('en')}
              >
                English
              </button>
              <button 
                className={`segment-btn ${lang === 'tr' ? 'active' : ''}`} 
                onClick={() => setLang('tr')}
              >
                Türkçe
              </button>
            </div>

            {/* Layout Selector (Interactive vs App Store vs ATS Print) */}
            <div className="segmented-control">
              <button 
                className={`segment-btn ${viewMode === 'interactive' ? 'active' : ''}`} 
                onClick={() => setViewMode('interactive')}
              >
                <Sliders size={14} style={{ marginRight: '4px', display: 'inline' }} /> Dashboard
              </button>
              <button 
                className={`segment-btn ${viewMode === 'store' ? 'active' : ''}`} 
                onClick={() => setViewMode('store')}
              >
                <ShoppingBag size={14} style={{ marginRight: '4px', display: 'inline' }} /> {lang === 'en' ? 'App Store' : 'Mağaza'}
              </button>
              <button 
                className={`segment-btn ${viewMode === 'ats' ? 'active' : ''}`} 
                onClick={() => setViewMode('ats')}
              >
                <Printer size={14} style={{ marginRight: '4px', display: 'inline' }} /> ATS Print View
              </button>
            </div>

            {/* Admin Dashboard Action */}
            <button 
              className={`btn ${viewMode === 'admin' ? 'btn-primary' : ''}`}
              onClick={() => setViewMode('admin')}
              title="Admin Control Center"
              style={isLoggedIn ? { background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: 'white' } : {}}
            >
              {isLoggedIn ? <ShieldCheck size={16} /> : <Lock size={16} />}
              <span>{isLoggedIn ? 'Admin Panel' : 'Admin'}</span>
            </button>

            {/* Theme Toggle */}
            <button class="btn" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Print Action */}
            <button class="btn btn-primary" onClick={handlePrint}>
              <Printer size={16} /> {lang === 'en' ? 'Save / Print PDF' : 'Save / Print PDF'}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN WRAPPER */}
      <main class="container">
        
        <div class="view-mode-indicator no-print">
          <Eye size={16} /> 
          {viewMode === 'interactive' 
            ? (lang === 'en' ? 'Currently viewing: Interactive Design Dashboard (optimized for screen display)' : 'Şu anki görünüm: İnteraktif Tasarım Paneli (ekran gösterimi için optimize edilmiştir)')
            : (lang === 'en' ? 'Currently viewing: ATS Print Preview (what will be exported to PDF)' : 'Şu anki görünüm: ATS Baskı Önizlemesi (PDF olarak dışa aktarılacak format)')
          }
        </div>

        {/* 1. INTERACTIVE VIEWPORT (SCREEN ONLY) */}
        {viewMode === 'interactive' && (
          <div class="cv-dashboard">
            
            {/* SIDEBAR */}
            <aside class="sidebar-card no-print">
              <div className="avatar-placeholder" style={{ overflow: 'hidden', padding: 0 }}>
                <img 
                  src={portfolioData.profile.avatar || "profile.jpeg"} 
                  alt={portfolioData.profile.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <h1 className="profile-name">{portfolioData.profile.name}</h1>
              <div className="profile-title">
                {portfolioData.profile.title}
              </div>
              
              <ul className="contact-list">
                <li className="contact-item">
                  <Mail size={16} />
                  <a href={`mailto:${portfolioData.profile.email}`}>{portfolioData.profile.email}</a>
                </li>
                <li className="contact-item">
                  <Phone size={16} />
                  <span>{portfolioData.profile.phone}</span>
                </li>
                <li className="contact-item">
                  <Linkedin size={16} />
                  <a href={portfolioData.profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/soner-erdevir</a>
                </li>
                <li className="contact-item">
                  <MapPin size={16} />
                  <span>{portfolioData.profile.location}</span>
                </li>
              </ul>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', borderTop: '1px dashed var(--border-color)', paddingTop: '15px', width: '100%' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--accent)', display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} /> AI & ATS Recruitment Optimized
              </div>
            </aside>

            {/* DETAILS AREA */}
            <div className="details-area">
              
              {/* ENGLISH INTERACTIVE VERSION */}
              {lang === 'en' ? (
                <div>
                  {/* Profile Card */}
                  <section className="dashboard-card" style={{ marginBottom: '24px' }}>
                    <h2 className="section-title"><User size={18} /> Professional Summary</h2>
                    <p className="profile-summary-text">
                      {portfolioData.profile.bio.en || portfolioData.profile.bio.tr}
                    </p>
                  </section>

                  {/* Technical Skills Card */}
                  <section className="dashboard-card" style={{ marginBottom: '24px' }}>
                    <h2 className="section-title"><Wrench size={18} /> Technical & Soft Skills</h2>
                    <div className="skills-category-wrapper">
                      {(portfolioData.skills || INITIAL_PORTFOLIO_DATA.skills).map(sk => (
                        <div key={sk.id} className="skills-group">
                          <div className="skills-group-title">{typeof sk.category === 'object' ? (sk.category.en || sk.category.tr) : sk.category}</div>
                          <div className="skills-list">
                            {(sk.tags || []).map((tag, idx) => (
                              <span key={idx} className="skill-tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Experience Card */}
                  <section class="dashboard-card" style={{ marginBottom: '24px' }}>
                    <h2 class="section-title"><Briefcase size={18} /> Work Experience</h2>
                    <div class="timeline">
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Engineering Intern</span>
                            <div class="timeline-company">Deico Engineering Inc.</div>
                          </div>
                          <span class="timeline-date">July 2025 – August 2025</span>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Designed and modeled precision mechanical components and structural assemblies for aerospace and defense projects using SolidWorks and Creo, ensuring strict adherence to GD&T standards.</li>
                            <li>Conducted Finite Element Analysis (FEA) to validate component durability and weight optimization, reducing structural mass by 10% while maintaining target safety factors.</li>
                            <li>Assisted in DFM reviews and collaborated with CNC machinists to optimize manufacturing workflows, reducing prototyping cycle time by 15%.</li>
                          </ul>
                        </div>
                      </div>
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Laboratory Assistant (İŞKUR Program)</span>
                            <div class="timeline-company">Akdeniz University Mechanical Laboratory</div>
                          </div>
                          <span class="timeline-date">February 2025 – June 2025</span>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Managed setup, calibration, and safety protocols for laboratory testing machinery (tensile, fatigue, and hardness testing), achieving zero safety incidents over 5 months.</li>
                            <li>Supported faculty and 50+ undergraduate students in conducting experimental tests and data acquisition, preparing detailed technical reports.</li>
                            <li>Performed regular maintenance and troubleshooting of workshop tools, increasing equipment uptime by 20%.</li>
                          </ul>
                        </div>
                      </div>
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Engineering Intern</span>
                            <div class="timeline-company">Kristal Industry Inc.</div>
                          </div>
                          <span class="timeline-date">July 2024 – August 2024</span>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Participated in sheet metal design and CNC programming for industrial kitchen and refrigeration equipment, streamlining shop-floor fabrication.</li>
                            <li>Created detailed engineering drawings and manufacturing documentation (BOMs), reducing assembly alignment errors by 12%.</li>
                            <li>Supported quality control inspections of incoming materials and finished assemblies, verifying tolerances against technical specifications.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Projects Card */}
                  <section class="dashboard-card" style={{ marginBottom: '24px' }}>
                    <h2 class="section-title"><Trophy size={18} /> Projects & Leadership</h2>
                    <div class="timeline">
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Team Leader</span>
                            <div class="timeline-company">TUSAŞ Lift Up R&D Project</div>
                          </div>
                          <span class="timeline-date">October 2025 – June 2026</span>
                        </div>
                        <div class="timeline-body">
                          <div style={{ fontWeight: '600', marginBottom: '6px', fontSize: '0.875rem' }}>Composite Matrix Structure Supported Silicone Rubber Gasket Design and Test Validation</div>
                          <ul>
                            <li>Led a 5-member engineering team in the R&D and validation of an aerospace-grade composite matrix supported gasket, meeting all project milestones ahead of schedule.</li>
                            <li>Performed advanced FEA simulations in ANSYS to predict gasket behavior under thermal and high-pressure conditions, optimizing design to improve pressure sealing by 18%.</li>
                            <li>Coordinated with TUSAŞ technical advisors and academic mentors to execute physical testing and validation reports.</li>
                          </ul>
                        </div>
                      </div>
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Mechanical Division Captain</span>
                            <div class="timeline-company">YILKAT Electric Vehicle Team (TÜBİTAK Challenge)</div>
                          </div>
                          <span class="timeline-date">2024 – 2026</span>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Managed the mechanical division (5 engineers) in the design, CAD modeling, and manufacturing of chassis, steering, braking, and drivetrain systems for an electric race vehicle.</li>
                            <li>Performed structural FEA on the tubular steel chassis using ANSYS, reducing chassis weight by 15% while improving torsional rigidity by 8%.</li>
                            <li>Oversaw physical assembly and integration of mechanical systems with electrical components, passing all TÜBİTAK technical inspections on the first attempt.</li>
                          </ul>
                        </div>
                      </div>
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Mechanical Designer</span>
                            <div class="timeline-company">UMAY Electromobile Team (TÜBİTAK Challenge)</div>
                          </div>
                          <span class="timeline-date">2023 – 2024</span>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Developed the aerodynamic outer shell and carbon fiber body of the EV prototype using SolidWorks Surface Modeling, reducing the drag coefficient (Cd) by 12%.</li>
                            <li>Fabricated carbon fiber composite body panels using vacuum bagging techniques, achieving a 20% weight reduction compared to fiberglass alternatives.</li>
                            <li>Integrated shell mounting points with the chassis frame, ensuring structural alignment and ease of assembly.</li>
                          </ul>
                        </div>
                      </div>
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Chassis Designer</span>
                            <div class="timeline-company">WAST Electromobile Team (TÜBİTAK Challenge)</div>
                          </div>
                          <span class="timeline-date">2022 – 2023</span>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Designed and modeled the tubular safety frame for the electric vehicle using SolidWorks Weldments.</li>
                            <li>Conducted structural impact simulations to verify driver cell safety, satisfying TÜBİTAK regulatory requirements.</li>
                            <li>Prepared BOMs and production drawings for chassis welding, reducing manufacturing assembly time by 10%.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Education Card */}
                  <section class="dashboard-card" style={{ marginBottom: '24px' }}>
                    <h2 class="section-title"><GraduationCap size={18} /> Education</h2>
                    <div class="edu-grid">
                      <div class="edu-item">
                        <div>
                          <div class="edu-degree">M.Sc. in Mechanical Engineering (With Thesis)</div>
                          <div class="edu-school">Ankara Yıldırım Beyazıt University (Ankara, Turkey)</div>
                        </div>
                        <span class="timeline-date">2026 – 2029 (Ongoing)</span>
                      </div>
                      <div class="edu-item">
                        <div>
                          <div class="edu-degree">B.Sc. in Mechanical Engineering</div>
                          <div class="edu-school">Akdeniz University (Antalya, Turkey)</div>
                          <div class="edu-rank"><Award size={12} style={{ display: 'inline', marginRight: '4px' }} /> Graduated 3rd in the Department</div>
                        </div>
                        <span class="timeline-date">Graduated: 2026</span>
                      </div>
                      <div class="edu-item">
                        <div>
                          <div class="edu-degree">Intensive English Language Program</div>
                          <div class="edu-school">Berlitz Language Academy (Esas Sosyal Program)</div>
                        </div>
                        <span class="timeline-date">2025 – 2026</span>
                      </div>
                      <div class="edu-item">
                        <div>
                          <div class="edu-degree">High School Diploma</div>
                          <div class="edu-school">Ceyhan Science High School (Adana, Turkey)</div>
                        </div>
                        <span class="timeline-date">Graduated: 2021</span>
                      </div>
                    </div>
                  </section>

                  {/* Languages and References */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    <section class="dashboard-card">
                      <h2 class="section-title"><Languages size={18} /> Languages</h2>
                      <div class="lang-list">
                        <div class="lang-item">
                          <div class="lang-name">Turkish</div>
                          <div class="lang-level">Native Speaker</div>
                        </div>
                        <div class="lang-item">
                          <div class="lang-name">English</div>
                          <div class="lang-level">B2 Professional</div>
                        </div>
                      </div>
                    </section>
                    
                    <section class="dashboard-card">
                      <h2 class="section-title"><Users size={18} /> References</h2>
                      <div class="ref-wrapper-interactive">
                        <div class="ref-item-interactive">
                          <strong>Prof. Dr. Volkan Kovan</strong> (Academic Advisor)<br/>
                          <div>Akdeniz University, Dept. of Mechanical Engineering (Construction and Mfg)</div>
                          <div>Phone: +90 242 310 6344 | Email: kovan@akdeniz.edu.tr</div>
                          <div>Web: <a href="https://avesis.akdeniz.edu.tr/kovan" target="_blank" rel="noopener noreferrer">avesis.akdeniz.edu.tr/kovan</a></div>
                        </div>
                        <div class="ref-item-interactive">
                          <strong>Prof. İbrahim Atmaca</strong><br/>
                          <div>Akdeniz University, Dept. of Mechanical Engineering (Thermodynamics)</div>
                          <div>Phone: +90 242 310 6337 | Email: atmaca@akdeniz.edu.tr</div>
                          <div>Web: <a href="http://makine.muhfak.akdeniz.edu.tr/ibrahim-atmaca" target="_blank" rel="noopener noreferrer">Bölüm Sayfası</a></div>
                        </div>
                        <div class="ref-item-interactive">
                          <strong>Doç. Dr. Okan Oral</strong><br/>
                          <div>Akdeniz University, Dept. of Mechanical Engineering</div>
                          <div>Phone: +90 242 310 6377 | Email: okan@akdeniz.edu.tr</div>
                          <div>Web: <a href="https://avesis.akdeniz.edu.tr/okanoral" target="_blank" rel="noopener noreferrer">avesis.akdeniz.edu.tr/okanoral</a></div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              ) : (
                /* TURKISH INTERACTIVE VERSION */
                <div>
                  <section className="dashboard-card" style={{ marginBottom: '24px' }}>
                    <h2 className="section-title"><User size={18} /> Profesyonel Özet</h2>
                    <p className="profile-summary-text">
                      {portfolioData.profile.bio.tr || portfolioData.profile.bio.en}
                    </p>
                  </section>

                  <section className="dashboard-card" style={{ marginBottom: '24px' }}>
                    <h2 className="section-title"><Wrench size={18} /> Teknik & Kişisel Yetkinlikler</h2>
                    <div className="skills-category-wrapper">
                      {(portfolioData.skills || INITIAL_PORTFOLIO_DATA.skills).map(sk => (
                        <div key={sk.id} className="skills-group">
                          <div className="skills-group-title">{typeof sk.category === 'object' ? (sk.category.tr || sk.category.en) : sk.category}</div>
                          <div className="skills-list">
                            {(sk.tags || []).map((tag, idx) => (
                              <span key={idx} className="skill-tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section class="dashboard-card" style={{ marginBottom: '24px' }}>
                    <h2 class="section-title"><Briefcase size={18} /> İş Deneyimi</h2>
                    <div class="timeline">
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Mühendislik Stajyeri</span>
                            <div class="timeline-company">Deico Mühendislik A.Ş.</div>
                          </div>
                          <span class="timeline-date">Temmuz 2025 – Ağustos 2025</span>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Havacılık ve savunma sanayii projelerine yönelik hassas mekanik parça ve yapısal montajların SolidWorks ve Creo programlarında GD&T standartlarına uygun olarak tasarımını ve modellemesini gerçekleştirdim.</li>
                            <li>Parçaların dayanıklılığını ve ağırlık optimizasyonunu doğrulamak için Sonlu Elemanlar Analizi (FEA) gerçekleştirdim; hedeflenen güvenlik katsayılarını koruyarak yapısal kütleyi %10 oranında azalttım.</li>
                            <li>DFM (Üretilebilirlik için Tasarım) süreçlerine katıldım ve CNC imalat ekipleriyle koordineli çalışarak prototip üretim süreçlerini %15 oranında kısalttım.</li>
                          </ul>
                        </div>
                      </div>
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Laboratuvar Asistanı (İŞKUR Programı)</span>
                            <div class="timeline-company">Akdeniz Üniversitesi Makine Laboratuvarı</div>
                          </div>
                          <span class="timeline-date">Şubat 2025 – Haziran 2025</span>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Çekme, yorulma ve sertlik ölçüm gibi mekanik test cihazlarının kurulumu, kalibrasyonu ve iş güvenliği protokollerinin yönetimini üstlendim; 5 aylık süreçte sıfır iş kazası ile operasyonları tamamladım.</li>
                            <li>Akademik kadroya ve 50'den fazla lisans öğrencisine deneysel testler ve veri toplama süreçlerinde destek verdim, ayrıntılı teknik raporlar hazırladım.</li>
                            <li>Atölye ekipmanlarının düzenli bakım ve arıza tespit işlemlerini yürüterek cihazların çalışma süresini (uptime) %20 oranında artırdım.</li>
                          </ul>
                        </div>
                      </div>
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Mühendislik Stajyeri</span>
                            <div class="timeline-company">Kristal Endüstriyel A.Ş.</div>
                          </div>
                          <span class="timeline-date">Temmuz 2024 – Ağustos 2024</span>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Endüstriyel mutfak ve soğutma ekipmanları için sac metal tasarımı ve CNC programlama süreçlerine katılarak atölye üretim süreçlerinin hızlandırılmasına katkı sağladım.</li>
                            <li>Ayrıntılı imalat resimleri ve teknik dokümantasyonlar (BOM) hazırlayarak montaj aşamasındaki hizalama hatalarını %12 oranında azalttım.</li>
                            <li>Gelen malzemelerin ve tamamlanan montajlerin kalite kontrol testlerine katıldım, toleransların teknik şartnamelere uygunluğunu doğruladım.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section class="dashboard-card" style={{ marginBottom: '24px' }}>
                    <h2 class="section-title"><Trophy size={18} /> Projeler & Liderlik Rolleri</h2>
                    <div class="timeline">
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Takım Lideri</span>
                            <div class="timeline-company">TUSAŞ Lift Up Ar-Ge Projesi</div>
                          </div>
                          <span class="timeline-date">Ekim 2025 – Haziran 2026</span>
                        </div>
                        <div class="timeline-body">
                          <div style={{ fontWeight: '600', marginBottom: '6px', fontSize: '0.875rem' }}>Kompozit Matris Yapı Destekli Silikon Kauçuk Conta Tasarımı ve Test Doğrulaması</div>
                          <ul>
                            <li>Havacılık standartlarına uygun kompozit destekli conta tasarımı ve doğrulanması süreçlerinde 5 kişilik mühendislik ekibine liderlik ettim, tüm proje kilometre taşlarını planlanan süreden önce tamamladım.</li>
                            <li>Contanın termal ve yüksek basınç altındaki davranışlarını öngörmek için ANSYS ortamında gelişmiş FEA simülasyonları gerçekleştirdim, tasarımı sızdırmazlık performansını %18 artıracak şekilde optimize ettim.</li>
                            <li>TUSAŞ teknik danışmanları ve akademik danışmanlarla koordineli olarak fiziksel testleri ve doğrulama raporlarını başarıyla yürüttüm.</li>
                          </ul>
                        </div>
                      </div>
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Mekanik Bölüm Kaptanı</span>
                            <div class="timeline-company">YILKAT Elektrikli Araç Takımı (TÜBİTAK Yarışı)</div>
                          </div>
                          <span class="timeline-date">2024 – 2026</span>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Yüksek verimli elektrikli yarış aracı projesinde şasi, direksiyon, fren ve güç aktarma organlarının tasarımı, CAD modellemesi ve üretimi süreçlerinde 5 kişilik mekanik ekibi yönettim.</li>
                            <li>Boru profilli çelik şasinin ANSYS ile yapısal FEA analizlerini yürüttüm; şasi ağırlığını %15 azaltırken burulma direncini %8 oranında artırdım.</li>
                            <li>Mekanik sistemlerin elektrik ve kontrol elemanlarıyla entegrasyonunu ve fiziksel montajını denetledim; TÜBİTAK teknik kontrollerinden ilk seferde başarıyla geçilmesini sağladım.</li>
                          </ul>
                        </div>
                      </div>
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Mekanik Tasarımcı</span>
                            <div class="timeline-company">UMAY Electromobile Takımı (TÜBİTAK Yarışı)</div>
                          </div>
                          <span class="timeline-date">2023 – 2024</span>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Elektrikli araç prototipinin aerodinamik dış kabuğunu SolidWorks Yüzey Modelleme araçlarını kullanarak tasarladım ve rüzgar direncini (Cd) %12 oranında azalttım.</li>
                            <li>Vakum torbalama yöntemiyle karbon fiber kompozit gövde panellerinin üretimini gerçekleştirdim; fiberglas alternatiflerine kıyasla gövdede %20 ağırlık tasarrufu sağladım.</li>
                            <li>Dış kabuk bağlantı noktalarını şasiyle entegre ederek yapısal hizalama ve montaj kolaylığı sağladı.</li>
                          </ul>
                        </div>
                      </div>
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-header">
                          <div>
                            <span class="timeline-role">Şasi Tasarımcısı</span>
                            <div class="timeline-company">WAST Electromobile Takımı (TÜBİTAK Yarışı)</div>
                          </div>
                          <span class="timeline-date">2022 – 2023</span>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Elektrikli araç için boru profilli çelik güvenlik kafesini SolidWorks Weldments kullanarak tasarladım ve modelledim.</li>
                            <li>Sürücü güvenliğini doğrulamak amacıyla yapısal darbe simülasyonları gerçekleştirdim ve TÜBİTAK güvenlik regülasyonlarına tam uyum sağladım.</li>
                            <li>Şasi imalatı için malzeme listeleri (BOM) ve imalat resimleri hazırlayarak üretim-montaj süresini %10 oranında kısalttım.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section class="dashboard-card" style={{ marginBottom: '24px' }}>
                    <h2 class="section-title"><GraduationCap size={18} /> Eğitim Bilgileri</h2>
                    <div class="edu-grid">
                      <div class="edu-item">
                        <div>
                          <div class="edu-degree">Tezli Yüksek Lisans (M.Sc.) - Makine Mühendisliği</div>
                          <div class="edu-school">Ankara Yıldırım Beyazıt Üniversitesi (Ankara, Türkiye)</div>
                        </div>
                        <span class="timeline-date">2026 – 2029 (Devam Ediyor)</span>
                      </div>
                      <div class="edu-item">
                        <div>
                          <div class="edu-degree">Lisans (B.Sc.) - Makine Mühendisliği</div>
                          <div class="edu-school">Akdeniz Üniversitesi (Antalya, Türkiye)</div>
                          <div class="edu-rank"><Award size={12} style={{ display: 'inline', marginRight: '4px' }} /> Bölüm Dönem 3.lüğü ile Mezuniyet</div>
                        </div>
                        <span class="timeline-date">Mezuniyet: 2026</span>
                      </div>
                      <div class="edu-item">
                        <div>
                          <div class="edu-degree">Yoğunlaştırılmış İngilizce Eğitimi</div>
                          <div class="edu-school">Berlitz Dil Akademisi (Esas Sosyal Programı)</div>
                        </div>
                        <span class="timeline-date">2025 – 2026</span>
                      </div>
                      <div class="edu-item">
                        <div>
                          <div class="edu-degree">Lise Diploması</div>
                          <div class="edu-school">Ceyhan Eczacı Bahattin Sevinç Erdinç Fen Lisesi (Adana)</div>
                        </div>
                        <span class="timeline-date">Mezuniyet: 2021</span>
                      </div>
                    </div>
                  </section>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    <section class="dashboard-card">
                      <h2 class="section-title"><Languages size={18} /> Yabancı Diller</h2>
                      <div class="lang-list">
                        <div class="lang-item">
                          <div class="lang-name">Türkçe</div>
                          <div class="lang-level">Ana Dil</div>
                        </div>
                        <div class="lang-item">
                          <div class="lang-name">İngilizce</div>
                          <div class="lang-level">B2 Düzeyinde</div>
                        </div>
                      </div>
                    </section>
                    
                    <section class="dashboard-card">
                      <h2 class="section-title"><Users size={18} /> Referanslar</h2>
                      <div class="ref-wrapper-interactive">
                        <div class="ref-item-interactive">
                          <strong>Prof. Dr. Volkan Kovan</strong> (Akademik Danışman)<br/>
                          <div>Akdeniz Üniversitesi, Makine Mühendisliği Bölümü (Konstrüksiyon ve İmalat)</div>
                          <div>Tel: +90 242 310 6344 | E-posta: kovan@akdeniz.edu.tr</div>
                          <div>Profil: <a href="https://avesis.akdeniz.edu.tr/kovan" target="_blank" rel="noopener noreferrer">avesis.akdeniz.edu.tr/kovan</a></div>
                        </div>
                        <div class="ref-item-interactive">
                          <strong>Prof. İbrahim Atmaca</strong><br/>
                          <div>Akdeniz Üniversitesi, Makine Mühendisliği Bölümü (Termodinamik)</div>
                          <div>Tel: +90 242 310 6337 | E-posta: atmaca@akdeniz.edu.tr</div>
                          <div>Profil: <a href="http://makine.muhfak.akdeniz.edu.tr/ibrahim-atmaca" target="_blank" rel="noopener noreferrer">Bölüm Sayfası</a></div>
                        </div>
                        <div class="ref-item-interactive">
                          <strong>Doç. Dr. Okan Oral</strong><br/>
                          <div>Akdeniz Üniversitesi, Makine Mühendisliği Bölümü</div>
                          <div>Tel: +90 242 310 6377 | E-posta: okan@akdeniz.edu.tr</div>
                          <div>Profil: <a href="https://avesis.akdeniz.edu.tr/okanoral" target="_blank" rel="noopener noreferrer">avesis.akdeniz.edu.tr/okanoral</a></div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}

              {/* STORE SECTION IN DASHBOARD */}
              <div style={{ marginTop: '32px' }}>
                <Store lang={lang} customApps={portfolioData.apps} />
              </div>

            </div>
          </div>
        )}

        {/* 2. APP STORE FULL VIEW */}
        {viewMode === 'store' && (
          <div style={{ padding: '20px 0' }}>
            <Store lang={lang} customApps={portfolioData.apps} />
          </div>
        )}

        {/* 3. DEDICATED ADMIN CONTROL CENTER VIEW */}
        {viewMode === 'admin' && (
          <AdminDashboard 
            isLoggedIn={isLoggedIn}
            onLoginSuccess={() => setIsLoggedIn(true)}
            onLogout={handleLogout}
            data={portfolioData}
            onSaveData={handleSaveData}
            onResetData={handleResetData}
            onSwitchView={setViewMode}
            lang={lang}
          />
        )}

        {/* 3. ATS PREVIEW VIEW (SCREEN & PRINT COMPATIBLE) */}
        {viewMode === 'ats' && (
          <div class="ats-preview-container" style={{ display: 'block' }}>
            
            {/* ATS ENGLISH */}
            {lang === 'en' ? (
              <div class="ats-resume">
                <h1>SONER ERDEVİR</h1>
                <div class="ats-title">Mechanical Engineer | R&D, Design & Simulation</div>
                <div class="ats-contacts">
                  Ankara, Turkey &nbsp;|&nbsp; +90 544 123 01 19 &nbsp;|&nbsp; sonererdevir@gmail.com &nbsp;|&nbsp; <a href="https://www.linkedin.com/in/soner-erdevir" target="_blank" rel="noopener noreferrer">linkedin.com/in/soner-erdevir</a>
                </div>

                <h2>Professional Summary</h2>
                <p>
                  I am a highly motivated and results-driven Mechanical Engineer (graduated 3rd of class) with a strong foundation in mechanical design, CAD modeling, structural analysis (FEA), and advanced fabrication. I have demonstrated leadership excellence as a TUSAŞ Lift Up R&D Project Team Leader and TÜBİTAK Electric Vehicle Mechanical Captain. I am experienced in delivering end-to-end engineering solutions—from conceptual CAD and FEA validation to CNC manufacturing and testing—with a key focus on lightweight design, durability, and sustainable mobility.
                </p>

                <h2>Work Experience</h2>
                
                <div class="ats-job">
                  <div class="ats-job-header">
                    <span>ENGINEERING INTERN</span>
                    <span>July 2025 – August 2025</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>Deico Engineering Inc.</span>
                    <span>Ankara, Turkey</span>
                  </div>
                  <ul>
                    <li>Designed and modeled precision mechanical components and structural assemblies for aerospace and defense projects using SolidWorks and Creo, ensuring strict adherence to GD&T standards.</li>
                    <li>Conducted Finite Element Analysis (FEA) to validate component durability and weight optimization, reducing structural mass by 10% while maintaining target safety factors.</li>
                    <li>Assisted in DFM reviews and collaborated with CNC machinists to optimize manufacturing workflows, reducing prototyping cycle time by 15%.</li>
                  </ul>
                </div>

                <div class="ats-job">
                  <div class="ats-job-header">
                    <span>LABORATORY ASSISTANT (İŞKUR Program)</span>
                    <span>February 2025 – June 2025</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>Akdeniz University Mechanical Laboratory</span>
                    <span>Antalya, Turkey</span>
                  </div>
                  <ul>
                    <li>Managed setup, calibration, and safety protocols for laboratory testing machinery (tensile, fatigue, and hardness testing), achieving zero safety incidents over 5 months.</li>
                    <li>Supported faculty and 50+ undergraduate students in conducting experimental tests and data acquisition, preparing detailed technical reports.</li>
                    <li>Performed regular maintenance and troubleshooting of workshop tools, increasing equipment uptime by 20%.</li>
                  </ul>
                </div>

                <div class="ats-job">
                  <div class="ats-job-header">
                    <span>ENGINEERING INTERN</span>
                    <span>July 2024 – August 2024</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>Kristal Industry Inc.</span>
                    <span>Antalya, Turkey</span>
                  </div>
                  <ul>
                    <li>Participated in sheet metal design and CNC programming for industrial kitchen and refrigeration equipment, streamlining shop-floor fabrication.</li>
                    <li>Created detailed engineering drawings and manufacturing documentation (BOMs), reducing assembly alignment errors by 12%.</li>
                    <li>Supported quality control inspections of incoming materials and finished assemblies, verifying tolerances against technical specifications.</li>
                  </ul>
                </div>

                <h2>Projects & Leadership</h2>
                
                <div class="ats-job">
                  <div class="ats-job-header">
                    <span>TEAM LEADER – TUSAŞ LIFT UP R&D PROJECT</span>
                    <span>October 2025 – June 2026</span>
                  </div>
                  <div style={{ fontSize: '10pt', fontWeight: 'bold', marginBottom: '2px' }}>Composite Matrix Structure Supported Silicone Rubber Gasket Design and Test Validation</div>
                  <ul>
                    <li>Led a 5-member engineering team in the R&D and validation of an aerospace-grade composite matrix supported gasket, meeting all project milestones ahead of schedule.</li>
                    <li>Performed advanced FEA simulations in ANSYS to predict gasket behavior under thermal and high-pressure conditions, optimizing design to improve pressure sealing by 18%.</li>
                    <li>Coordinated with TUSAŞ technical advisors and academic mentors to execute physical testing and validation reports.</li>
                  </ul>
                </div>

                <div class="ats-job">
                  <div class="ats-job-header">
                    <span>MECHANICAL DIVISION CAPTAIN – YILKAT ELECTRIC VEHICLE TEAM</span>
                    <span>2024 – 2026</span>
                  </div>
                  <div style={{ fontSize: '10pt', fontWeight: 'bold', marginBottom: '2px' }}>TÜBİTAK Efficiency Challenge Electric Vehicle Project</div>
                  <ul>
                    <li>Managed the mechanical division (5 engineers) in the design, CAD modeling, and manufacturing of chassis, steering, braking, and drivetrain systems for an electric race vehicle.</li>
                    <li>Performed structural FEA on the tubular steel chassis using ANSYS, reducing chassis weight by 15% while improving torsional rigidity by 8%.</li>
                    <li>Oversaw physical assembly and integration of mechanical systems with electrical components, passing all TÜBİTAK technical inspections on the first attempt.</li>
                  </ul>
                </div>

                <div class="ats-job">
                  <div class="ats-job-header">
                    <span>MECHANICAL DESIGNER – UMAY ELECTROMOBILE TEAM</span>
                    <span>2023 – 2024</span>
                  </div>
                  <ul>
                    <li>Developed the aerodynamic outer shell and carbon fiber body of the EV prototype using SolidWorks Surface Modeling, reducing the drag coefficient (Cd) by 12%.</li>
                    <li>Fabricated carbon fiber composite body panels using vacuum bagging techniques, achieving a 20% weight reduction compared to fiberglass alternatives.</li>
                    <li>Integrated shell mounting points with the chassis frame, ensuring structural alignment and ease of assembly.</li>
                  </ul>
                </div>

                <div class="ats-job" style={{ marginBottom: 0 }}>
                  <div class="ats-job-header">
                    <span>CHASSIS DESIGNER – WAST ELECTROMOBILE TEAM</span>
                    <span>2022 – 2023</span>
                  </div>
                  <ul>
                    <li>Designed and modeled the tubular safety frame for the electric vehicle using SolidWorks Weldments.</li>
                    <li>Conducted structural impact simulations to verify driver cell safety, satisfying TÜBİTAK regulatory requirements.</li>
                    <li>Prepared BOMs and production drawings for chassis welding, reducing manufacturing assembly time by 10%.</li>
                  </ul>
                </div>

                <h2>Education</h2>
                <div class="ats-job" style={{ marginBottom: '2px' }}>
                  <div class="ats-job-header">
                    <span>ANKARA YILDIRIM BEYAZIT UNIVERSITY</span>
                    <span>2026 – 2029 (Ongoing)</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>M.Sc. in Mechanical Engineering (With Thesis)</span>
                    <span>Ankara, Turkey</span>
                  </div>
                </div>
                <div class="ats-job" style={{ marginBottom: '2px' }}>
                  <div class="ats-job-header">
                    <span>AKDENIZ UNIVERSITY</span>
                    <span>Graduated: 2026</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>B.Sc. in Mechanical Engineering (Graduated 3rd in the Department)</span>
                    <span>Antalya, Turkey</span>
                  </div>
                </div>
                <div class="ats-job" style={{ marginBottom: '2px' }}>
                  <div class="ats-job-header">
                    <span>BERLITZ LANGUAGE ACADEMY</span>
                    <span>May 2025 – March 2026</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>Intensive English Training (Esas Sosyal &quot;İngilizce Dil Fırsatım&quot; Program)</span>
                    <span>Istanbul, Turkey</span>
                  </div>
                </div>
                <div class="ats-job" style={{ marginBottom: '4px' }}>
                  <div class="ats-job-header">
                    <span>CEYHAN SCIENCE HIGH SCHOOL</span>
                    <span>Graduated: 2021</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>High School Diploma</span>
                    <span>Adana, Turkey</span>
                  </div>
                </div>

                <h2>Technical Skills & Languages</h2>
                <div class="ats-skills-grid">
                  <strong>CAD & Design:</strong> SolidWorks, PTC Creo, AutoCAD, Autodesk Fusion 360 (Surface Modeling, Weldments)<br/>
                  <strong>Simulation & Analysis:</strong> ANSYS, SolidWorks Simulation (FEA, Structural & Vibration Analysis, GD&T, DFM, BOM Creation)<br/>
                  <strong>Manufacturing & Prototyping:</strong> CNC Machining, Carbon Fiber Composites, 3D Printing, Sheet Metal Design<br/>
                  <strong>Languages:</strong> Turkish (Native), English (B2 - Professional Working Proficiency)
                </div>

                <h2>References</h2>
                <div class="ats-ref-grid">
                  <div class="ats-ref-item">
                    <strong>Prof. Dr. Volkan Kovan</strong> (Academic Advisor)<br/>
                    Akdeniz University, Dept. of Mechanical Engineering (Construction and Manufacturing)<br/>
                    Phone: +90 242 310 6344 | Email: kovan@akdeniz.edu.tr | Web: avesis.akdeniz.edu.tr/kovan
                  </div>
                  <div class="ats-ref-item">
                    <strong>Prof. İbrahim Atmaca</strong><br/>
                    Akdeniz University, Dept. of Mechanical Engineering (Thermodynamics)<br/>
                    Phone: +90 242 310 6337 | Email: atmaca@akdeniz.edu.tr | Web: makine.muhfak.akdeniz.edu.tr/ibrahim-atmaca
                  </div>
                  <div class="ats-ref-item">
                    <strong>Doç. Dr. Okan Oral</strong><br/>
                    Akdeniz University, Dept. of Mechanical Engineering<br/>
                    Phone: +90 242 310 6377 | Email: okan@akdeniz.edu.tr | Web: avesis.akdeniz.edu.tr/okanoral
                  </div>
                </div>
              </div>
            ) : (
              /* ATS TURKISH */
              <div class="ats-resume">
                <h1>SONER ERDEVİR</h1>
                <div class="ats-title">Makine Mühendisi | Ar-Ge, Tasarım & Simülasyon</div>
                <div class="ats-contacts">
                  Ankara, Türkiye &nbsp;|&nbsp; +90 544 123 01 19 &nbsp;|&nbsp; sonererdevir@gmail.com &nbsp;|&nbsp; <a href="https://www.linkedin.com/in/soner-erdevir" target="_blank" rel="noopener noreferrer">linkedin.com/in/soner-erdevir</a>
                </div>

                <h2>Profesyonel Özet</h2>
                <p>
                  Makine mühendisliği bölümünü dönem 3.sü olarak tamamlamış; mekanik tasarım, CAD modelleme, yapısal analiz (FEA) ve gelişmiş imalat teknikleri konularında güçlü bir temele sahip, motivasyonu yüksek ve sonuç odaklı bir Makine Mühendisim. TUSAŞ Lift Up Ar-Ge projesinde Takım Liderliği ve TÜBİTAK Efficiency Challenge elektrikli araç takımında Mekanik Bölüm Kaptanlığı gibi önemli liderlik rolleri üstlendim. Konsept tasarımdan FEA doğrulamasına, CNC imalatından test ve kalite kontrol aşamalarına kadar uçtan uca mühendislik çözümleri sunma konusunda kanıtlanmış bir başarı geçmişine sahibim. Çalışmalarımda özellikle hafif tasarım, dayanıklılık ve sürdürülebilir mobilite sistemlerine odaklanıyorum.
                </p>

                <h2>İş Deneyimi</h2>
                
                <div class="ats-job">
                  <div class="ats-job-header">
                    <span>MÜHENDİSLİK STAJYERİ</span>
                    <span>Temmuz 2025 – Ağustos 2025</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>Deico Mühendislik A.Ş.</span>
                    <span>Ankara, Türkiye</span>
                  </div>
                  <ul>
                    <li>Havacılık ve savunma sanayii projelerine yönelik hassas mekanik parça ve yapısal montajların SolidWorks ve Creo programlarında GD&T standartlarına uygun olarak tasarımını ve modellemesini gerçekleştirdim.</li>
                    <li>Parçaların dayanıklılığını ve ağırlık optimizasyonunu doğrulamak için Sonlu Elemanlar Analizi (FEA) gerçekleştirdim; hedeflenen güvenlik katsayılarını koruyarak yapısal kütleyi %10 oranında azalttım.</li>
                    <li>DFM (Üretilebilirlik için Tasarım) süreçlerine katıldım ve CNC imalat ekipleriyle koordineli çalışarak prototip üretim süreçlerini %15 oranında kısalttım.</li>
                  </ul>
                </div>

                <div class="ats-job">
                  <div class="ats-job-header">
                    <span>LABORATUVAR ASİSTANI (İŞKUR Programı)</span>
                    <span>Şubat 2025 – Haziran 2025</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>Akdeniz Üniversitesi Makine Laboratuvarı</span>
                    <span>Antalya, Türkiye</span>
                  </div>
                  <ul>
                    <li>Çekme, yorulma ve sertlik ölçüm gibi mekanik test cihazlarının kurulumu, kalibrasyonu ve iş güvenliği protokollerinin yönetimini üstlendim; 5 aylık süreçte sıfır iş kazası ile operasyonları tamamladım.</li>
                    <li>Akademik kadroya ve 50'den fazla lisans öğrencisine deneysel testler ve veri toplama süreçlerinde destek verdim, ayrıntılı teknik raporlar hazırladım.</li>
                    <li>Atölye ekipmanlarının düzenli bakım ve arıza tespit işlemlerini yürüterek cihazların çalışma süresini (uptime) %20 oranında artırdım.</li>
                  </ul>
                </div>

                <div class="ats-job">
                  <div class="ats-job-header">
                    <span>MÜHENDİSLİK STAJYERİ</span>
                    <span>Temmuz 2024 – Ağustos 2024</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>Kristal Endüstriyel A.Ş.</span>
                    <span>Antalya, Türkiye</span>
                  </div>
                  <ul>
                    <li>Endüstriyel mutfak ve soğutma ekipmanları için sac metal tasarımı ve CNC programlama süreçlerine katılarak atölye üretim süreçlerinin hızlandırılmasına katkı sağladım.</li>
                    <li>Ayrıntılı imalat resimleri ve teknik dokümantasyonlar (BOM) hazırlayarak montaj aşamasındaki hizalama hatalarını %12 oranında azalttım.</li>
                    <li>Gelen malzemelerin ve tamamlanan montajlerin kalite kontrol testlerine katıldım, toleransların teknik şartnamelere uygunluğunu doğruladım.</li>
                  </ul>
                </div>

                <h2>Projeler ve Liderlik</h2>
                
                <div class="ats-job">
                  <div class="ats-job-header">
                    <span>TAKIM LİDERİ – TUSAŞ LIFT UP AR-GE PROJESİ</span>
                    <span>Ekim 2025 – Haziran 2026</span>
                  </div>
                  <div style={{ fontSize: '10pt', fontWeight: 'bold', marginBottom: '2px' }}>Kompozit Matris Yapı Destekli Silikon Kauçuk Conta Tasarımı ve Test Doğrulaması</div>
                  <ul>
                    <li>Havacılık standartlarına uygun kompozit destekli conta tasarımı ve doğrulanması süreçlerinde 5 kişilik mühendislik ekibine liderlik ettim, tüm proje kilometre taşlarını planlanan süreden önce tamamladım.</li>
                    <li>Contanın termal ve yüksek basınç altındaki davranışlarını öngörmek için ANSYS ortamında gelişmiş FEA simülasyonları gerçekleştirdim, tasarımı sızdırmazlık performansını %18 artıracak şekilde optimize ettim.</li>
                    <li>TUSAŞ teknik danışmanları ve akademik danışmanlarla koordineli olarak fiziksel testleri ve doğrulama raporlarını başarıyla yürüttüm.</li>
                  </ul>
                </div>

                <div class="ats-job">
                  <div class="ats-job-header">
                    <span>MEKANİK BÖLÜM KAPTANI – YILKAT ELEKTRİKLİ ARAÇ TAKIMI</span>
                    <span>2024 – 2026</span>
                  </div>
                  <div style={{ fontSize: '10pt', fontWeight: 'bold', marginBottom: '2px' }}>TÜBİTAK Efficiency Challenge Elektrikli Yarış Aracı Projesi</div>
                  <ul>
                    <li>Yüksek verimli elektrikli yarış aracı projesinde şasi, direksiyon, fren ve güç aktarma organlarının tasarımı, CAD modellemesi ve üretimi süreçlerinde 5 kişilik mekanik ekibi yönettim.</li>
                    <li>Boru profilli çelik şasinin ANSYS ile yapısal FEA analizlerini yürüttüm; şasi ağırlığını %15 azaltırken burulma direncini %8 oranında artırdım.</li>
                    <li>Mekanik sistemlerin elektrik ve kontrol elemanlarıyla entegrasyonunu ve fiziksel montajını denetledim; TÜBİTAK teknik kontrollerinden ilk seferde başarıyla geçilmesini sağladım.</li>
                  </ul>
                </div>

                <div class="ats-job">
                  <div class="ats-job-header">
                    <span>MEKANİK TASARIMCI – UMAY ELECTROMOBILE TAKIMI</span>
                    <span>2023 – 2024</span>
                  </div>
                  <ul>
                    <li>Elektrikli araç prototipinin aerodinamik dış kabuğunu SolidWorks Yüzey Modelleme araçlarını kullanarak tasarladım ve rüzgar direncini (Cd) %12 oranında azalttım.</li>
                    <li>Vakum torbalama yöntemiyle karbon fiber kompozit gövde panellerinin üretimini gerçekleştirdim; fiberglas alternatiflerine kıyasla gövdede %20 ağırlık tasarrufu sağladım.</li>
                    <li>Dış kabuk bağlantı noktalarını şasiyle entegre ederek yapısal hizalama ve montaj kolaylığı sağladı.</li>
                  </ul>
                </div>

                <div class="ats-job" style={{ marginBottom: 0 }}>
                  <div class="ats-job-header">
                    <span>ŞASİ TASARIMCISI – WAST ELECTROMOBILE TAKIMI</span>
                    <span>2022 – 2023</span>
                  </div>
                  <ul>
                    <li>Elektrikli araç için boru profilli çelik güvenlik kafesini SolidWorks Weldments kullanarak tasarladım ve modelledi.</li>
                    <li>Sürücü güvenliğini doğrulamak amacıyla yapısal darbe simülasyonları gerçekleştirdim ve TÜBİTAK güvenlik regülasyonlarına tam uyum sağladım.</li>
                    <li>Şasi imalatı için malzeme listeleri (BOM) ve imalat resimleri hazırlayarak üretim-montaj süresini %10 oranında kısalttım.</li>
                  </ul>
                </div>

                <h2>Eğitim</h2>
                <div class="ats-job" style={{ marginBottom: '2px' }}>
                  <div class="ats-job-header">
                    <span>ANKARA YILDIRIM BEYAZIT ÜNİVERSİTESİ</span>
                    <span>2026 – 2029 (Devam Ediyor)</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>Tezli Makine Mühendisliği Yüksek Lisansı (M.Sc.)</span>
                    <span>Ankara, Türkiye</span>
                  </div>
                </div>
                <div class="ats-job" style={{ marginBottom: '2px' }}>
                  <div class="ats-job-header">
                    <span>AKDENİZ ÜNİVERSİTESİ</span>
                    <span>Mezuniyet: 2026</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>Makine Mühendisliği Lisansı (Bölüm Dönem 3.lüğü Derecesi)</span>
                    <span>Antalya, Türkiye</span>
                  </div>
                </div>
                <div class="ats-job" style={{ marginBottom: '2px' }}>
                  <div class="ats-job-header">
                    <span>BERLİTZ DİL AKADEMİSİ</span>
                    <span>Mayıs 2025 – Mart 2026</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>Yoğunlaştırılmış İngilizce Eğitimi (Esas Sosyal &quot;İngilizce Dil Fırsatım&quot; Programı)</span>
                    <span>İstanbul, Türkiye</span>
                  </div>
                </div>
                <div class="ats-job" style={{ marginBottom: '4px' }}>
                  <div class="ats-job-header">
                    <span>CEYHAN ECZACI BAHATTİN SEVİNÇ ERDİNÇ FEN LİSESİ</span>
                    <span>Mezuniyet: 2021</span>
                  </div>
                  <div class="ats-job-subheader">
                    <span>Lise Diploması</span>
                    <span>Adana, Türkiye</span>
                  </div>
                </div>

                <h2>Teknik Yetkinlikler ve Diller</h2>
                <div class="ats-skills-grid">
                  <strong>CAD & Tasarım:</strong> SolidWorks, PTC Creo, AutoCAD, Autodesk Fusion 360 (Gelişmiş Yüzey Modelleme, Weldments)<br/>
                  <strong>Simülasyon & Analiz:</strong> ANSYS, SolidWorks Simulation (FEA, Gerilme & Titreşim Analizi, GD&T, DFM, BOM Oluşturma)<br/>
                  <strong>İmalat & Prototipleme:</strong> CNC İşleme, Karbon Fiber Kompozitler, 3D Yazıcı, Sac Metal Tasarımı<br/>
                  <strong>Yabancı Diller:</strong> Türkçe (Ana Dil), İngilizce (B2 - Profesyonel Seviye)
                </div>

                <h2>Referanslar</h2>
                <div class="ats-ref-grid">
                  <div class="ats-ref-item">
                    <strong>Prof. Dr. Volkan Kovan</strong> (Akademik Danışman)<br/>
                    Akdeniz Üniversitesi, Makine Mühendisliği Bölümü (Konstrüksiyon ve İmalat)<br/>
                    Tel: +90 242 310 6344 | E-posta: kovan@akdeniz.edu.tr | Profil: avesis.akdeniz.edu.tr/kovan
                  </div>
                  <div class="ats-ref-item">
                    <strong>Prof. İbrahim Atmaca</strong><br/>
                    Akdeniz Üniversitesi, Makine Mühendisliği Bölümü (Termodinamik)<br/>
                    Tel: +90 242 310 6337 | E-posta: atmaca@akdeniz.edu.tr | Profil: makine.muhfak.akdeniz.edu.tr/ibrahim-atmaca
                  </div>
                  <div class="ats-ref-item">
                    <strong>Doç. Dr. Okan Oral</strong><br/>
                    Akdeniz Üniversitesi, Makine Mühendisliği Bölümü<br/>
                    Tel: +90 242 310 6377 | E-posta: okan@akdeniz.edu.tr | Profil: avesis.akdeniz.edu.tr/okanoral
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* SCREEN ONLY FOOTER */}
      <footer className="no-print">
        <div className="container">
          <p>&copy; 2026 Soner Erdevir. Interactive Resume designed in compliance with modern HR ATS recruitment guidelines.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
