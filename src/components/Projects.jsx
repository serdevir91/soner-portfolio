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
          period: "October 2025 – June 2026",
          details: [
            "Led a 5-member engineering team in the R&D and validation of an aerospace-grade composite matrix supported gasket, meeting all project milestones ahead of schedule.",
            "Performed advanced FEA simulations in ANSYS to predict gasket behavior under thermal and high-pressure conditions, optimizing design to improve pressure sealing by 18%.",
            "Coordinated with TUSAŞ technical advisors and academic mentors to execute physical testing and validation reports."
          ],
          tags: ["Composite Materials", "Testing & Validation", "R&D", "Team Leadership", "SolidWorks", "ANSYS FEA", "TUSAŞ"]
        },
        {
          title: "YILKAT Electric Vehicle Team",
          role: "Mechanical Division Captain",
          subTitle: "TÜBİTAK Efficiency Challenge Electric Vehicle Project",
          period: "2024 – 2026",
          details: [
            "Managed the mechanical division (5 engineers) in the design, CAD modeling, and manufacturing of chassis, steering, braking, and drivetrain systems for an electric race vehicle.",
            "Performed structural FEA on the tubular steel chassis using ANSYS, reducing chassis weight by 15% while improving torsional rigidity by 8%.",
            "Oversaw physical assembly and integration of mechanical systems with electrical components, passing all TÜBİTAK technical inspections on the first attempt."
          ],
          tags: ["EV Design", "Chassis & Drivetrain", "Suspension", "FEA Analysis", "ANSYS", "SolidWorks Simulation", "TÜBİTAK"]
        },
        {
          title: "UMAY Electromobile Team",
          role: "Mechanical Design Member",
          subTitle: "TÜBİTAK Efficiency Challenge Electric Vehicle Project",
          period: "2023 – 2024",
          details: [
            "Developed the aerodynamic outer shell and carbon fiber body of the EV prototype using SolidWorks Surface Modeling, reducing the drag coefficient (Cd) by 12%.",
            "Fabricated carbon fiber composite body panels using vacuum bagging techniques, achieving a 20% weight reduction compared to fiberglass alternatives.",
            "Integrated shell mounting points with the chassis frame, ensuring structural alignment and ease of assembly."
          ],
          tags: ["Aerodynamics", "Carbon Fiber Fabrication", "Surface Modeling", "Weight Optimization", "TÜBİTAK"]
        },
        {
          title: "WAST Electromobile Team",
          role: "Chassis Designer",
          subTitle: "TÜBİTAK Efficiency Challenge Electric Vehicle Project",
          period: "2022 – 2023",
          details: [
            "Designed and modeled the tubular safety frame for the electric vehicle using SolidWorks Weldments.",
            "Conducted structural impact simulations to verify driver cell safety, satisfying TÜBİTAK regulatory requirements.",
            "Prepared BOMs and production drawings for chassis welding, reducing manufacturing assembly time by 10%."
          ],
          tags: ["Tubular Frame Design", "Chassis Modeling", "SolidWorks Weldments", "BOM Creation", "TÜBİTAK"]
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
          period: "Ekim 2025 – Haziran 2026",
          details: [
            "Havacılık standartlarına uygun kompozit destekli conta tasarımı ve doğrulanması süreçlerinde 5 kişilik mühendislik ekibine liderlik ettim, tüm proje kilometre taşlarını planlanan süreden önce tamamladım.",
            "Contanın termal ve yüksek basınç altındaki davranışlarını öngörmek için ANSYS ortamında gelişmiş FEA simülasyonları gerçekleştirdim, tasarımı sızdırmazlık performansını %18 artıracak şekilde optimize ettim.",
            "TUSAŞ teknik danışmanları ve akademik danışmanlarla koordineli olarak fiziksel testleri ve doğrulama raporlarını başarıyla yürüttüm."
          ],
          tags: ["Kompozit Malzemeler", "Test & Doğrulama", "Ar-Ge", "Takım Liderliği", "SolidWorks", "ANSYS FEA", "TUSAŞ"]
        },
        {
          title: "YILKAT Elektrikli Araç Takımı",
          role: "Mekanik Birim Kaptanı",
          subTitle: "TÜBİTAK Efficiency Challenge Elektrikli Araç Projesi",
          period: "2024 – 2026",
          details: [
            "Yüksek verimli elektrikli yarış aracı projesinde şasi, direksiyon, fren ve güç aktarma organlarının tasarımı, CAD modellemesi ve üretimi süreçlerinde 5 kişilik mekanik ekibi yönettim.",
            "Boru profilli çelik şasinin ANSYS ile yapısal FEA analizlerini yürüttüm; şasi ağırlığını %15 azaltırken burulma direncini %8 oranında artırdım.",
            "Mekanik sistemlerin elektrik ve kontrol elemanlarıyla entegrasyonunu ve fiziksel montajını denetledim; TÜBİTAK teknik kontrollerinden ilk seferde başarıyla geçilmesini sağladım."
          ],
          tags: ["Elektrikli Araç Tasarımı", "Şasi & Aktarma", "Süspansiyon", "FEA Simülasyonu", "ANSYS", "SolidWorks Simülasyonu", "TÜBİTAK"]
        },
        {
          title: "UMAY Electromobile Takımı",
          role: "Mekanik Tasarım Üyesi",
          subTitle: "TÜBİTAK Efficiency Challenge Elektrikli Araç Projesi",
          period: "2023 – 2024",
          details: [
            "Elektrikli araç prototipinin aerodinamik dış kabuğunu SolidWorks Yüzey Modelleme araçlarını kullanarak tasarladım ve rüzgar direncini (Cd) %12 oranında azalttım.",
            "Vakum torbalama yöntemiyle karbon fiber kompozit gövde panellerinin üretimini gerçekleştirdim; fiberglas alternatiflerine kıyasla gövdede %20 ağırlık tasarrufu sağladım.",
            "Dış kabuk bağlantı noktalarını şasiyle entegre ederek yapısal hizalama ve montaj kolaylığı sağladım."
          ],
          tags: ["Aerodinamik Tasarım", "Karbon Fiber Üretimi", "Yüzey Modelleme", "Ağırlık Optimizasyonu", "TÜBİTAK"]
        },
        {
          title: "WAST Electromobile Takımı",
          role: "Şasi Tasarımcısı",
          subTitle: "TÜBİTAK Efficiency Challenge Elektrikli Araç Projesi",
          period: "2022 – 2023",
          details: [
            "Elektrikli araç için boru profilli çelik güvenlik kafesini SolidWorks Weldments kullanarak tasarladım ve modelledim.",
            "Sürücü güvenliğini doğrulamak amacıyla yapısal darbe simülasyonları gerçekleştirdim ve TÜBİTAK güvenlik regülasyonlarına tam uyum sağladım.",
            "Şasi imalatı için malzeme listeleri (BOM) ve imalat resimleri hazırlayarak üretim-montaj süresini %10 oranında kısalttım."
          ],
          tags: ["Boru Şasi Tasarımı", "Şasi Modelleme", "SolidWorks Weldments", "BOM Oluşturma", "TÜBİTAK"]
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
