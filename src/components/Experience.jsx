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
          period: "Summer 2025",
          details: [
            "Contributed to mechanical design and analysis tasks in engineering projects.",
            "Assisted in CAD modeling, structural evaluations, and prototype development.",
            "Gained hands-on experience with CNC machining processes and manufacturing workflows."
          ],
          tags: ["SolidWorks", "Creo", "FEA Analysis", "CNC Machining", "CAD Modeling"]
        },
        {
          company: "Akdeniz University Mechanical Laboratory",
          role: "Laboratory Assistant – İŞKUR Youth Program",
          location: "Antalya, Turkey",
          period: "Feb 2025 – Jun 2025",
          details: [
            "Assisted in the management, setup, and maintenance of laboratory equipment and experimental setups.",
            "Supported undergraduate students and faculty during practical laboratory sessions and hands-on engineering applications.",
            "Gained practical experience in testing, calibration, and workshop safety protocols."
          ],
          tags: ["Testing & Calibration", "Lab Maintenance", "Workshop Safety", "Academic Support"]
        },
        {
          company: "Kristal Industry Inc.",
          role: "Engineering Intern",
          location: "Antalya, Turkey",
          period: "Summer 2024",
          details: [
            "Participated in mechanical production and quality control processes in a real manufacturing environment.",
            "Worked with technical documentation, CNC machining, and industrial assembly.",
            "Gained insights into lean manufacturing, workplace safety, and interdisciplinary communication on the shop floor."
          ],
          tags: ["Production", "Quality Control", "CNC Machining", "Industrial Assembly", "Lean Manufacturing"]
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
          period: "Yaz 2025",
          details: [
            "Mühendislik projelerindeki mekanik tasarım ve analiz çalışmalarına katkıda bulundu.",
            "CAD modelleme, yapısal değerlendirmeler ve prototip geliştirme süreçlerine yardımcı oldu.",
            "CNC işleme süreçleri ve üretim iş akışlarında pratik deneyim kazandı."
          ],
          tags: ["SolidWorks", "Creo", "FEA Analizi", "CNC İşleme", "CAD Modelleme"]
        },
        {
          company: "Akdeniz Üniversitesi Makine Laboratuvarı",
          role: "Laboratuvar Asistanı – İŞKUR Yarı Zamanlı Programı",
          location: "Antalya, Türkiye",
          period: "Şubat 2025 – Haziran 2025",
          details: [
            "Laboratuvar ekipmanlarının ve deneysel kurulumların yönetimi, kurulumu ve bakımına yardımcı oldu.",
            "Uygulamalı laboratuvar dersleri ve pratik mühendislik çalışmaları sırasında lisans öğrencilerini ve öğretim üyelerini destekledi.",
            "Test, kalibrasyon ve atölye güvenlik protokolleri konularında pratik deneyim kazandı."
          ],
          tags: ["Test & Kalibrasyon", "Lab Bakımı", "Atölye Güvenliği", "Akademik Destek"]
        },
        {
          company: "Kristal Endüstri A.Ş.",
          role: "Mühendislik Stajyeri",
          location: "Antalya, Türkiye",
          period: "Yaz 2024",
          details: [
            "Gerçek bir üretim ortamında mekanik üretim ve kalite kontrol süreçlerine katıldı.",
            "Teknik dokümantasyon, CNC işleme ve endüstriyel montaj konularında çalıştı.",
            "Yalın üretim, iş sağlığı ve güvenliği ile atölye düzeyinde disiplinler arası iletişim konularında deneyim kazandı."
          ],
          tags: ["Üretim", "Kalite Kontrol", "CNC İşleme", "Endüstriyel Montaj", "Yalın Üretim"]
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
