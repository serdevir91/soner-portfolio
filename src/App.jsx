import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import References from './components/References';
import { Sun, Moon, Globe, Download, Printer } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'tr' : 'en'));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar no-print">
        <div className="nav-container">
          <div className="logo gradient-text">Soner Erdevir</div>
          <div className="nav-controls">
            {/* Language Selector */}
            <button 
              onClick={toggleLang} 
              className="icon-btn" 
              title={lang === 'en' ? 'Türkçe' : 'English'}
              aria-label="Toggle language"
            >
              <Globe size={18} style={{ marginRight: '4px' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                {lang === 'en' ? 'TR' : 'EN'}
              </span>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="icon-btn" 
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Print CV */}
            <button 
              onClick={handlePrint} 
              className="icon-btn" 
              title={lang === 'en' ? 'Print Resume / Save as PDF' : 'CV Yazdır / PDF Kaydet'}
              aria-label="Print resume"
            >
              <Printer size={18} />
            </button>

            {/* Download PDF */}
            <a 
              href="/Soner_Erdevir_CV.pdf" 
              download="Soner_Erdevir_CV.pdf"
              className="btn-primary"
              title={lang === 'en' ? 'Download CV PDF' : 'CV PDF İndir'}
            >
              <Download size={16} />
              <span className="no-print-mobile">
                {lang === 'en' ? 'Download PDF' : 'PDF İndir'}
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="app-container">
        <Hero lang={lang} />
        
        <main className="main-content">
          <Skills lang={lang} />
          <Experience lang={lang} />
          <Projects lang={lang} />
          <Education lang={lang} />
          <References lang={lang} />
        </main>
      </div>
    </div>
  );
}

export default App;
