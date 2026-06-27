import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';

const References = ({ lang }) => {
  const content = {
    en: {
      sectionTitle: "Academic References",
      roleAdvisor: "Academic Advisor",
      deptConstruction: "Faculty of Engineering, Dept of Mechanical Engineering, Construction & Manufacturing",
      deptThermodynamics: "Faculty of Engineering, Dept of Mechanical Engineering, Thermodynamics",
      visitProfile: "View Profile"
    },
    tr: {
      sectionTitle: "Akademik Referanslar",
      roleAdvisor: "Akademik Danışman",
      deptConstruction: "Mühendislik Fakültesi, Makine Mühendisliği Bölümü, Konstrüksiyon ve İmalat Anabilim Dalı",
      deptThermodynamics: "Mühendislik Fakültesi, Makine Mühendisliği Bölümü, Termodinamik Anabilim Dalı",
      visitProfile: "Profili Görüntüle"
    }
  };

  const t = content[lang];

  const references = [
    {
      name: "Prof. Dr. Volkan Kovan",
      role: t.roleAdvisor,
      dept: t.deptConstruction,
      phone: "+902423106344",
      phoneFormatted: "+90 242 310 6344",
      email: "kovan@akdeniz.edu.tr",
      profile: "https://avesis.akdeniz.edu.tr/kovan"
    },
    {
      name: "Prof. Dr. İbrahim Atmaca",
      role: lang === 'en' ? "Professor" : "Profesör",
      dept: t.deptThermodynamics,
      phone: "+902423106337",
      phoneFormatted: "+90 242 310 6337",
      email: "atmaca@akdeniz.edu.tr",
      profile: "http://makine.muhfak.akdeniz.edu.tr/ibrahim-atmaca"
    }
  ];

  return (
    <section className="section" id="references">
      <div className="section-header">
        <h2 className="gradient-text">{t.sectionTitle}</h2>
      </div>

      <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {references.map((ref, index) => (
          <div key={index} className="glass-card" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            gap: '1rem' 
          }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.2rem' }}>
                {ref.name}
              </h3>
              <div style={{ 
                fontSize: '0.85rem', 
                fontWeight: '600', 
                color: 'var(--accent)', 
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.5rem' 
              }}>
                {ref.role}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {ref.dept}
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.5rem', 
              fontSize: '0.9rem',
              borderTop: '1px solid var(--border)',
              paddingTop: '0.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} style={{ color: 'var(--primary)' }} />
                <a href={`tel:${ref.phone}`} style={{ color: 'var(--text-main)' }}>
                  {ref.phoneFormatted}
                </a>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} style={{ color: 'var(--primary)' }} />
                <a href={`mailto:${ref.email}`} style={{ color: 'var(--text-main)' }}>
                  {ref.email}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                <ExternalLink size={14} style={{ color: 'var(--primary)' }} />
                <a 
                  href={ref.profile} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'var(--primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                >
                  {t.visitProfile}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default References;
