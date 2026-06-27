import React from 'react';

const Education = ({ lang }) => {
  const content = {
    en: {
      sectionTitle: "Education",
      education: [
        {
          school: "Akdeniz University",
          degree: "B.Sc. in Mechanical Engineering",
          location: "Antalya, Turkey",
          period: "Class of 2026",
          details: ["Graduated 3rd in the Department", "Strong focus on R&D, structural design, and simulation"]
        },
        {
          school: "Berlitz Language Academy",
          degree: "Intensive English Training",
          location: "Istanbul, Turkey (Online)",
          period: "May 2025 – March 2026",
          details: ["Esas Sosyal \"İngilizce Dil Fırsatım\" Program participant"]
        },
        {
          school: "Ceyhan Eczacı Bahattin Sevinç Erdinç Science High School",
          degree: "High School Diploma",
          location: "Adana, Turkey",
          period: "Class of 2021",
          details: ["Rigorous science and mathematics curriculum"]
        }
      ]
    },
    tr: {
      sectionTitle: "Eğitim",
      education: [
        {
          school: "Akdeniz Üniversitesi",
          degree: "Makine Mühendisliği Lisans Derecesi (B.Sc.)",
          location: "Antalya, Türkiye",
          period: "2026 Mezuniyeti",
          details: ["Bölüm Üçüncüsü olarak üstün dereceyle mezun olmuştur", "Ar-Ge, yapısal tasarım ve simülasyon odaklı mühendislik eğitimi"]
        },
        {
          school: "Berlitz Dil Akademisi",
          degree: "Yoğun İngilizce Dil Eğitimi",
          location: "İstanbul, Türkiye (Çevrim içi)",
          period: "Mayıs 2025 – Mart 2026",
          details: ["Esas Sosyal \"İngilizce Dil Fırsatım\" Programı bursiyeri"]
        },
        {
          school: "Ceyhan Eczacı Bahattin Sevinç Erdinç Fen Lisesi",
          degree: "Lise Diploması",
          location: "Adana, Türkiye",
          period: "2021 Mezuniyeti",
          details: ["Yoğunlaştırılmış fen ve matematik müfredatı"]
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section className="section" id="education">
      <div className="section-header">
        <h2 className="gradient-text">{t.sectionTitle}</h2>
      </div>

      <div className="timeline">
        {t.education.map((edu, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker" style={{ background: 'var(--primary)' }}></div>
            <div className="timeline-card">
              <div className="timeline-meta">
                <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                  {edu.school}
                </span>
                <span>
                  {edu.location} | {edu.period}
                </span>
              </div>
              <div style={{ 
                fontWeight: '600', 
                color: 'var(--accent)', 
                fontSize: '0.95rem',
                marginBottom: '0.5rem' 
              }}>
                {edu.degree}
              </div>
              <ul style={{ 
                paddingLeft: '1.2rem', 
                fontSize: '0.9rem', 
                color: 'var(--text-muted)',
                lineHeight: '1.4'
              }}>
                {edu.details.map((detail, i) => (
                  <li key={i} style={{ marginBottom: '0.2rem', listStyleType: 'circle' }}>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
