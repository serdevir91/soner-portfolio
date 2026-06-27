import React from 'react';
import { Layers, Activity, Code, Wrench, Users, Globe } from 'lucide-react';

const Skills = ({ lang }) => {
  const content = {
    en: {
      sectionTitle: "Technical Skills",
      categories: {
        cad: {
          title: "CAD & Design",
          icon: <Layers size={18} style={{ color: 'var(--primary)' }} />,
          skills: ["SolidWorks", "Creo", "AutoCAD", "Fusion 360"]
        },
        simulation: {
          title: "Simulation & Analysis",
          icon: <Activity size={18} style={{ color: 'var(--primary)' }} />,
          skills: ["ANSYS", "SolidWorks Simulation", "FEA Analysis"]
        },
        programming: {
          title: "Programming & Software",
          icon: <Code size={18} style={{ color: 'var(--primary)' }} />,
          skills: ["MATLAB", "Python (basic)", "Flutter", "MS Office"]
        },
        manufacturing: {
          title: "Manufacturing & Prototyping",
          icon: <Wrench size={18} style={{ color: 'var(--primary)' }} />,
          skills: ["Composite Fabrication", "CNC Familiarity", "3D Printing"]
        },
        team: {
          title: "Project & Team Skills",
          icon: <Users size={18} style={{ color: 'var(--primary)' }} />,
          skills: ["Leadership", "Technical Report Writing", "Multidisciplinary Collaboration"]
        },
        languages: {
          title: "Languages",
          icon: <Globe size={18} style={{ color: 'var(--primary)' }} />,
          skills: ["Turkish (Native / Anadil)", "English (B2 - Intensive Training)"]
        }
      }
    },
    tr: {
      sectionTitle: "Teknik Beceriler",
      categories: {
        cad: {
          title: "CAD & Tasarım",
          icon: <Layers size={18} style={{ color: 'var(--primary)' }} />,
          skills: ["SolidWorks", "Creo", "AutoCAD", "Fusion 360"]
        },
        simulation: {
          title: "Simülasyon & Analiz",
          icon: <Activity size={18} style={{ color: 'var(--primary)' }} />,
          skills: ["ANSYS", "SolidWorks Simulation", "Sonlu Elemanlar Analizi (FEA)"]
        },
        programming: {
          title: "Programlama & Yazılım",
          icon: <Code size={18} style={{ color: 'var(--primary)' }} />,
          skills: ["MATLAB", "Python (temel)", "Flutter", "MS Office"]
        },
        manufacturing: {
          title: "İmalat & Prototipleme",
          icon: <Wrench size={18} style={{ color: 'var(--primary)' }} />,
          skills: ["Kompozit İmalatı", "CNC Aşinalığı", "3D Yazıcılar"]
        },
        team: {
          title: "Proje & Ekip Becerileri",
          icon: <Users size={18} style={{ color: 'var(--primary)' }} />,
          skills: ["Liderlik", "Teknik Raporlama", "Disiplinler Arası İş Birliği"]
        },
        languages: {
          title: "Diller",
          icon: <Globe size={18} style={{ color: 'var(--primary)' }} />,
          skills: ["Türkçe (Anadil)", "İngilizce (B2 - Yoğun Dil Eğitimi)"]
        }
      }
    }
  };

  const t = content[lang];

  return (
    <section className="section" id="skills">
      <div className="section-header">
        <h2 className="gradient-text">{t.sectionTitle}</h2>
      </div>

      <div className="skills-grid">
        {Object.entries(t.categories).map(([key, category]) => (
          <div key={key} className="skill-card">
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              {category.icon}
              <span style={{ marginLeft: '0.5rem', fontSize: '1rem', fontWeight: '700' }}>
                {category.title}
              </span>
            </h3>
            <div className="skill-list" style={{ marginTop: '0.8rem' }}>
              {category.skills.map((skill, index) => (
                <div key={index} className="skill-tag" style={{ fontSize: '0.85rem' }}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
