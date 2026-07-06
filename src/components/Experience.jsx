import React from 'react';

const Experience = ({ lang }) => {
  const content = {
    en: {
      sectionTitle: "Professional Experience",
      experiences: [
        {
          company: "Deico Engineering Inc.",
          role: "Engineering Intern",
          location: "Ankara, Turkey",
          period: "Summer 2025 (Jul 2025 – Aug 2025)",
          details: [
            "Designed and modeled precision mechanical components and structural assemblies for aerospace and defense projects using SolidWorks and Creo, ensuring strict adherence to GD&T standards.",
            "Conducted Finite Element Analysis (FEA) to validate component durability and weight optimization, reducing structural mass by 10% while maintaining target safety factors.",
            "Assisted in DFM reviews and collaborated with CNC machinists to optimize manufacturing workflows, reducing prototyping cycle time by 15%."
          ],
          tags: ["SolidWorks", "Creo", "FEA Analysis", "GD&T", "DFM", "CNC Machining", "CAD Modeling"]
        },
        {
          company: "Akdeniz University Mechanical Laboratory",
          role: "Laboratory Assistant – İŞKUR Youth Program",
          location: "Antalya, Turkey",
          period: "Feb 2025 – Jun 2025",
          details: [
            "Managed setup, calibration, and safety protocols for laboratory testing machinery (tensile, fatigue, and hardness testing), achieving zero safety incidents over 5 months.",
            "Supported faculty and 50+ undergraduate students in conducting experimental tests and data acquisition, preparing detailed technical reports.",
            "Performed regular maintenance and troubleshooting of workshop tools, increasing equipment uptime by 20%."
          ],
          tags: ["Testing & Calibration", "Lab Maintenance", "Workshop Safety", "Academic Support", "Report Writing"]
        },
        {
          company: "Kristal Industry Inc.",
          role: "Engineering Intern",
          location: "Antalya, Turkey",
          period: "Summer 2024 (Jul 2024 – Aug 2024)",
          details: [
            "Participated in sheet metal design and CNC programming for industrial kitchen and refrigeration equipment, streamlining shop-floor fabrication.",
            "Created detailed engineering drawings and manufacturing documentation (BOMs), reducing assembly alignment errors by 12%.",
            "Supported quality control inspections of incoming materials and finished assemblies, verifying tolerances against technical specifications."
          ],
          tags: ["Production", "Quality Control", "CNC Programming", "Industrial Assembly", "Sheet Metal Design", "BOM Creation"]
        }
      ]
    },
    tr: {
      sectionTitle: "Mesleki Deneyim",
      experiences: [
        {
          company: "Deico Mühendislik A.Ş.",
          role: "Mühendislik Stajyeri",
          location: "Ankara, Türkiye",
          period: "Yaz 2025 (Temmuz 2025 – Ağustos 2025)",
          details: [
            "Havacılık ve savunma sanayii projelerine yönelik hassas mekanik parça ve yapısal montajların SolidWorks ve Creo programlarında GD&T standartlarına uygun olarak tasarımını ve modellemesini gerçekleştirdim.",
            "Parçaların dayanıklılığını ve ağırlık optimizasyonunu doğrulamak için Sonlu Elemanlar Analizi (FEA) gerçekleştirdim; hedeflenen güvenlik katsayılarını koruyarak yapısal kütleyi %10 oranında azalttım.",
            "DFM (Üretilebilirlik için Tasarım) süreçlerine katıldım ve CNC imalat ekipleriyle koordineli çalışarak prototip üretim süreçlerini %15 oranında kısalttım."
          ],
          tags: ["SolidWorks", "Creo", "FEA Analizi", "GD&T", "DFM", "CNC Talaşlı İmalat", "CAD Modelleme"]
        },
        {
          company: "Akdeniz Üniversitesi Makine Laboratuvarı",
          role: "Laboratuvar Asistanı – İŞKUR Yarı Zamanlı Programı",
          location: "Antalya, Türkiye",
          period: "Şubat 2025 – Haziran 2025",
          details: [
            "Çekme, yorulma ve sertlik ölçüm gibi mekanik test cihazlarının kurulumu, kalibrasyonu ve iş güvenliği protokollerinin yönetimini üstlendim; 5 aylık süreçte sıfır iş kazası ile operasyonları tamamladım.",
            "Akademik kadroya ve 50'den fazla lisans öğrencisine deneysel testler ve veri toplama süreçlerinde destek verdim, ayrıntılı teknik raporlar hazırladım.",
            "Atölye ekipmanlarının düzenli bakım ve arıza tespit işlemlerini yürüterek cihazların çalışma süresini (uptime) %20 oranında artırdım."
          ],
          tags: ["Test & Kalibrasyon", "Lab Bakımı", "Atölye Güvenliği", "Akademik Destek", "Teknik Raporlama"]
        },
        {
          company: "Kristal Endüstri A.Ş.",
          role: "Mühendislik Stajyeri",
          location: "Antalya, Türkiye",
          period: "Yaz 2024 (Temmuz 2024 – Ağustos 2024)",
          details: [
            "Endüstriyel mutfak ve soğutma ekipmanları için sac metal tasarımı ve CNC programlama süreçlerine katılarak atölye üretim süreçlerinin hızlandırılmasına katkı sağladım.",
            "Ayrıntılı imalat resimleri ve teknik dokümantasyonlar (BOM) hazırlayarak montaj aşamasındaki hizalama hatalarını %12 oranında azalttım.",
            "Gelen malzemelerin ve tamamlanan montajların kalite kontrol testlerine katıldım, toleransların teknik şartnamelere uygunluğunu doğruladım."
          ],
          tags: ["Üretim", "Kalite Kontrol", "CNC Programlama", "Endüstriyel Montaj", "Sac Metal Tasarımı", "BOM Oluşturma"]
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section className="section" id="experience">
      <div className="section-header">
        <h2 className="gradient-text">{t.sectionTitle}</h2>
      </div>

      <div className="timeline">
        {t.experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-card">
              <div className="timeline-meta">
                <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                  {exp.company}
                </span>
                <span>
                  {exp.location} | {exp.period}
                </span>
              </div>
              <div style={{ 
                fontWeight: '600', 
                color: 'var(--accent)', 
                fontSize: '0.95rem',
                marginBottom: '0.75rem' 
              }}>
                {exp.role}
              </div>
              <ul style={{ 
                paddingLeft: '1.2rem', 
                fontSize: '0.92rem', 
                color: 'var(--text-muted)',
                marginBottom: '1rem',
                lineHeight: '1.5'
              }}>
                {exp.details.map((detail, i) => (
                  <li key={i} style={{ marginBottom: '0.3rem', listStyleType: 'circle' }}>
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="badge-container">
                {exp.tags.map((tag, i) => (
                  <span key={i} className="badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
