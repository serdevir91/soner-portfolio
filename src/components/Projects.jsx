import React from 'react';

const Projects = ({ lang }) => {
  const content = {
    en: {
      sectionTitle: "Projects & Engineering Experience",
      projects: [
        {
          title: "TUSAŞ Lift Up Project",
          role: "Team Leader",
          subTitle: "Composite Matrix Structure Supported Silicone Rubber Gasket Design and Test Validation",
          period: "2025 – June 2026",
          details: [
            "Leading the design and test validation phases for a composite matrix structure supported silicone rubber gasket.",
            "Coordinating with academic advisors and team members to successfully meet project objectives and deadlines."
          ],
          tags: ["Composite Materials", "Testing & Validation", "R&D", "Team Leadership", "SolidWorks", "TUSAŞ"]
        },
        {
          title: "YILKAT Electric Vehicle Team",
          role: "Mechanical Division Captain",
          subTitle: "TÜBİTAK Efficiency Challenge",
          period: "2024 – Present",
          details: [
            "Led the design and manufacturing of mechanical systems (chassis, drivetrain, suspension) for a high-efficiency electric vehicle.",
            "Oversaw CAD modeling, FEA simulations, and physical assembly.",
            "Coordinated the mechanical team and ensured successful integration with electrical and control systems."
          ],
          tags: ["EV Design", "Chassis & Drivetrain", "Suspension", "FEA Analysis", "SolidWorks Simulation", "TÜBİTAK"]
        },
        {
          title: "UMAY Electromobile Team",
          role: "Mechanical Design Member",
          subTitle: "TÜBİTAK Efficiency Challenge",
          period: "2023 – 2024",
          details: [
            "Contributed to the aerodynamic shell design and carbon fiber body fabrication of a concept EV prototype.",
            "Collaborated on lightweight structural components and chassis integration."
          ],
          tags: ["Aerodynamics", "Carbon Fiber Fabrication", "Lightweight Structural Design", "TÜBİTAK"]
        },
        {
          title: "WAST Electromobile Team",
          role: "Chassis Designer",
          subTitle: "TÜBİTAK Efficiency Challenge",
          period: "2022 – 2023",
          details: [
            "Designed and modeled the tubular frame and mounting system.",
            "Focused on safety, weight optimization, and durability in the early design phase."
          ],
          tags: ["Tubular Frame Design", "Chassis Modeling", "Weight Optimization", "AutoCAD", "TÜBİTAK"]
        }
      ]
    },
    tr: {
      sectionTitle: "Projeler & Mühendislik Deneyimi",
      projects: [
        {
          title: "TUSAŞ Lift Up Projesi",
          role: "Takım Lideri",
          subTitle: "Kompozit Matris Yapı Destekli Silikon Kauçuk Conta Tasarımı ve Test Doğrulaması",
          period: "2025 – Haziran 2026",
          details: [
            "Kompozit matris yapı destekli silikon kauçuk contanın tasarım ve test doğrulama aşamalarına liderlik etmektedir.",
            "Proje hedeflerine ve teslim tarihlerine başarıyla ulaşmak için akademik danışmanlar ve ekip üyeleriyle koordinasyonu sağlamaktadır."
          ],
          tags: ["Kompozit Malzemeler", "Test & Doğrulama", "Ar-Ge", "Takım Liderliği", "SolidWorks", "TUSAŞ"]
        },
        {
          title: "YILKAT Elektrikli Araç Takımı",
          role: "Mekanik Birim Kaptanı",
          subTitle: "TÜBİTAK Efficiency Challenge",
          period: "2024 – Günümüz",
          details: [
            "Yüksek verimli bir elektrikli araç için mekanik sistemlerin (şasi, aktarma organları, süspansiyon) tasarım ve imalatına liderlik etti.",
            "CAD modelleme, FEA simülasyonları ve fiziksel montaj süreçlerini yönetti.",
            "Mekanik ekibi koordine etti ve elektrik/kontrol sistemleriyle başarılı entegrasyonu sağladı."
          ],
          tags: ["Elektrikli Araç Tasarımı", "Şasi & Aktarma", "Süspansiyon", "FEA Simülasyonu", "SolidWorks Simülasyonu", "TÜBİTAK"]
        },
        {
          title: "UMAY Electromobile Takımı",
          role: "Mekanik Tasarım Üyesi",
          subTitle: "TÜBİTAK Efficiency Challenge",
          period: "2023 – 2024",
          details: [
            "Konsept bir elektrikli araç prototipinin aerodinamik kabuk tasarımı ve karbon fiber gövde üretimine katkıda bulundu.",
            "Hafif yapısal bileşenler ve şasi entegrasyonu üzerinde iş birliği yaptı."
          ],
          tags: ["Aerodinamik Tasarım", "Karbon Fiber Üretimi", "Hafif Yapısal Tasarım", "TÜBİTAK"]
        },
        {
          title: "WAST Electromobile Takımı",
          role: "Şasi Tasarımcısı",
          subTitle: "TÜBİTAK Efficiency Challenge",
          period: "2022 – 2023",
          details: [
            "Boru tipi kafes şasi ve montaj sistemini tasarladı ve modelledi.",
            "Erken tasarım aşamasında güvenlik, ağırlık optimizasyonu ve dayanıklılığa odaklandı."
          ],
          tags: ["Boru Şasi Tasarımı", "Şasi Modelleme", "Ağırlık Optimizasyonu", "AutoCAD", "TÜBİTAK"]
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section className="section" id="projects">
      <div className="section-header">
        <h2 className="gradient-text">{t.sectionTitle}</h2>
      </div>

      <div className="projects-grid">
        {t.projects.map((project, index) => (
          <div key={index} className="glass-card project-card">
            <div>
              <div className="project-header">
                <span className="project-title">{project.title}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                  {project.period}
                </span>
              </div>
              
              <div className="project-role">
                {project.role}
              </div>

              <div style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-main)', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                lineHeight: '1.4'
              }}>
                {project.subTitle}
              </div>

              <ul className="project-list">
                {project.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="badge-container" style={{ marginTop: '1.2rem' }}>
              {project.tags.map((tag, i) => (
                <span key={i} className="badge badge-accent">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
