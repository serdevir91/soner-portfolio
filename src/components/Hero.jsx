import React, { useState } from 'react';
import { Mail, Linkedin, Phone, MapPin, Copy, Check } from 'lucide-react';

const Hero = ({ lang }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const profileText = {
    en: {
      title: "Mechanical Engineer | R&D, Design & Simulation",
      location: "Ankara, Turkey",
      aboutTitle: "Profile",
      aboutDesc: "I am a highly motivated and results-driven Mechanical Engineer (graduated 3rd of class) with a strong foundation in mechanical design, CAD modeling, structural analysis (FEA), and advanced fabrication. I have demonstrated leadership excellence as a TUSAŞ Lift Up R&D Project Team Leader and TÜBİTAK Electric Vehicle Mechanical Captain. I am experienced in delivering end-to-end engineering solutions—from conceptual CAD and FEA validation to CNC manufacturing and testing—with a key focus on lightweight design, durability, and sustainable mobility."
    },
    tr: {
      title: "Makine Mühendisi | Ar-Ge, Tasarım & Simülasyon",
      location: "Ankara, Türkiye",
      aboutTitle: "Profil",
      aboutDesc: "Makine mühendisliği bölümünü dönem 3.sü olarak tamamlamış; mekanik tasarım, CAD modelleme, yapısal analiz (FEA) ve gelişmiş imalat teknikleri konularında güçlü bir temele sahip, motivasyonu yüksek ve sonuç odaklı bir Makine Mühendisiyim. TUSAŞ Lift Up Ar-Ge projesinde Takım Liderliği ve TÜBİTAK Efficiency Challenge elektrikli araç takımında Mekanik Bölüm Kaptanlığı gibi önemli liderlik rolleri üstlendim. Konsept tasarımdan FEA doğrulamasına, CNC imalatından test ve kalite kontrol aşamalarına kadar uçtan uca mühendislik çözümleri sunma konusunda kanıtlanmış bir başarı geçmişine sahibim. Çalışmalarımda özellikle hafif tasarım, dayanıklılık ve sürdürülebilir mobilite sistemlerine odaklanıyorum."
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const t = profileText[lang];

  return (
    <header className="glass-card" style={{ marginBottom: '2rem', overflow: 'hidden' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        {/* Name and Designation */}
        <div>
          <h1 className="gradient-text" style={{
            fontSize: '3rem',
            fontWeight: '800',
            lineHeight: '1.1',
            letterSpacing: '-1.5px',
            marginBottom: '0.5rem',
            textTransform: 'uppercase'
          }}>
            Soner Erdevir
          </h1>
          <p style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: 'var(--text-main)',
            opacity: '0.9'
          }}>
            {t.title}
          </p>
        </div>

        {/* Contact Links */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          fontSize: '0.9rem',
          minWidth: '260px'
        }}>
          {/* Email */}
          <div style={contactRow}>
            <Mail size={16} style={{ color: 'var(--primary)' }} />
            <a href="mailto:sonererdevir@gmail.com" style={{ marginRight: 'auto' }}>
              sonererdevir@gmail.com
            </a>
            <button 
              onClick={() => copyToClipboard('sonererdevir@gmail.com', 'email')}
              className={`icon-btn copy-tooltip ${copiedEmail ? 'active' : ''} no-print`}
              style={{ padding: '0.25rem', border: 'none', background: 'transparent' }}
              title="Copy Email"
            >
              {copiedEmail ? <Check size={14} style={{ color: 'var(--accent)' }} /> : <Copy size={14} />}
            </button>
          </div>

          {/* Phone */}
          <div style={contactRow}>
            <Phone size={16} style={{ color: 'var(--primary)' }} />
            <a href="tel:+905441230119" style={{ marginRight: 'auto' }}>
              +90 544 123 01 19
            </a>
            <button 
              onClick={() => copyToClipboard('+905441230119', 'phone')}
              className={`icon-btn copy-tooltip ${copiedPhone ? 'active' : ''} no-print`}
              style={{ padding: '0.25rem', border: 'none', background: 'transparent' }}
              title="Copy Phone"
            >
              {copiedPhone ? <Check size={14} style={{ color: 'var(--accent)' }} /> : <Copy size={14} />}
            </button>
          </div>

          {/* LinkedIn */}
          <div style={contactRow}>
            <Linkedin size={16} style={{ color: 'var(--primary)' }} />
            <a 
              href="https://www.linkedin.com/in/soner-erdevir" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ marginRight: 'auto' }}
            >
              linkedin.com/in/soner-erdevir
            </a>
          </div>

          {/* Location */}
          <div style={contactRow}>
            <MapPin size={16} style={{ color: 'var(--primary)' }} />
            <span>{t.location}</span>
          </div>
        </div>
      </div>

      {/* Profile/About Me Section */}
      <div>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          marginBottom: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: 'var(--primary)'
        }}>
          {t.aboutTitle}
        </h2>
        <p style={{
          fontSize: '1.05rem',
          lineHeight: '1.7',
          color: 'var(--text-main)',
          opacity: 0.95
        }}>
          {t.aboutDesc}
        </p>
      </div>
    </header>
  );
};

const contactRow = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  color: 'var(--text-main)',
  padding: '0.2rem 0'
};

export default Hero;
