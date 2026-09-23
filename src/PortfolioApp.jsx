import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Download, Github, Linkedin, Mail, MapPin, Moon, Sun, Wrench, X } from 'lucide-react';
import Store from './components/Store';
import ContentEditor from './components/ContentEditor';
import { INITIAL_PORTFOLIO_DATA } from './data/initialData';
import { safeExternalUrl, safeEmail } from './utils/safeLinks';
import './modern.css';

const storageKey = 'soner_portfolio_local_draft_v3';
const localized = (value, lang) => typeof value === 'object' && value !== null ? (value[lang] || value.en || value.tr || '') : (value || '');
const labels = {
  tr: { work: 'Çalışmalar', about: 'Hakkımda', contact: 'İletişim', apps: 'Uygulamalar', editor: 'İçerik editörü', available: 'Yeni projelere açık', greeting: 'Merhaba, ben Soner.', headline: 'Fikirleri çalışan sistemlere dönüştürüyorum.', intro: 'Mekanik tasarım, simülasyon ve yazılımı bir araya getirerek gerçek dünyadaki problemler için çözümler üretiyorum.', explore: 'Çalışmaları keşfet', reach: 'İletişime geç', selected: 'Seçili çalışmalar', selectedSub: 'Mühendislik, araştırma ve ürün geliştirme.', experience: 'Deneyim', expertise: 'Uzmanlık alanları', education: 'Eğitim', more: 'Uygulama koleksiyonu', contactTitle: 'Birlikte bir şey üretelim.', contactSub: 'Bir proje, iş birliği veya yalnızca bir fikir için mesaj bırakın.', name: 'Adınız', email: 'E-posta adresiniz', subject: 'Konu', message: 'Mesajınız', send: 'E-posta uygulamasında gönder', mailHint: 'Gönder düğmesi e-posta uygulamanızda hazırlanmış bir mesaj açar.', direct: 'Ya da doğrudan yazın', cv: 'CV indir', details: 'Detayları gör', theme: 'Temayı değiştir', back: 'Siteye dön' },
  en: { work: 'Work', about: 'About', contact: 'Contact', apps: 'Apps', editor: 'Content editor', available: 'Open to new projects', greeting: 'Hi, I’m Soner.', headline: 'I turn ideas into working systems.', intro: 'I bring mechanical design, simulation and software together to solve real world problems.', explore: 'Explore work', reach: 'Get in touch', selected: 'Selected work', selectedSub: 'Engineering, research and product development.', experience: 'Experience', expertise: 'Areas of expertise', education: 'Education', more: 'App collection', contactTitle: 'Let’s make something together.', contactSub: 'Have a project, collaboration or simply an idea? Leave a message.', name: 'Your name', email: 'Email address', subject: 'Subject', message: 'Your message', send: 'Send with email app', mailHint: 'The send button opens a prepared message in your email app.', direct: 'Or write directly', cv: 'Download CV', details: 'View details', theme: 'Change theme', back: 'Back to site' },
};
function readDraft() {
  try {
    const current = localStorage.getItem(storageKey);
    const value = JSON.parse(current || localStorage.getItem('soner_portfolio_local_draft_v2') || localStorage.getItem('portfolio_data'));
    if (!value || typeof value !== 'object') return INITIAL_PORTFOLIO_DATA;
    const previousApps = Array.isArray(value.apps) ? value.apps : INITIAL_PORTFOLIO_DATA.apps;
    const apps = current ? previousApps : [...previousApps, ...INITIAL_PORTFOLIO_DATA.apps.filter(app => !previousApps.some(saved => saved.id === app.id))];
    return { ...INITIAL_PORTFOLIO_DATA, ...value, apps, profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...value.profile } };
  } catch { return INITIAL_PORTFOLIO_DATA; }
}
function ContactForm({ email, lang, t }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');
  const submit = event => {
    event.preventDefault();
    if (!safeEmail(email)) { setError(lang === 'tr' ? 'İletişim adresi geçersiz.' : 'Contact address is invalid.'); return; }
    const subject = `[Portfolio] ${form.subject.trim().slice(0, 120)}`;
    const body = `${form.message.trim().slice(0, 4000)}\n\n${form.name.trim().slice(0, 100)}\n${form.email.trim().slice(0, 254)}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setError('');
  };
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>{t.name}<input required maxLength="100" autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label><label>{t.email}<input required type="email" maxLength="254" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label></div>
    <label>{t.subject}<input required maxLength="120" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></label>
    <label>{t.message}<textarea required minLength="10" maxLength="4000" rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></label>
    {error && <p role="alert" className="form-error">{error}</p>}
    <button className="action action-primary" type="submit">{t.send}<ArrowUpRight size={18} /></button><p className="form-hint">{t.mailHint}</p>
  </form>;
}
export default function PortfolioApp() {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio_lang') || (navigator.language?.startsWith('tr') ? 'tr' : 'en'));
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio_theme') || 'dark');
  const [data, setData] = useState(readDraft);
  const [view, setView] = useState('site');
  const [menu, setMenu] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const t = labels[lang];
  useEffect(() => {
    sessionStorage.removeItem('serdevir_admin_session_token');
    localStorage.removeItem('serdevir_admin_session_token_remember');
  }, []);
  useEffect(() => {
    if (localStorage.getItem(storageKey) || localStorage.getItem('soner_portfolio_local_draft_v2') || localStorage.getItem('portfolio_data')) return;
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}portfolio-data.json`)
      .then(response => response.ok ? response.json() : null)
      .then(published => {
        if (!cancelled && published?.profile && Array.isArray(published.projects) && Array.isArray(published.apps)) setData(published);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('portfolio_theme', theme); }, [theme]);
  useEffect(() => { document.documentElement.lang = lang; localStorage.setItem('portfolio_lang', lang); }, [lang]);
  useEffect(() => { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .08 }); document.querySelectorAll('.reveal').forEach(el => observer.observe(el)); return () => observer.disconnect(); }, [view, lang]);
  useEffect(() => { const handler = e => { if (e.key === 'Escape') setActiveProject(null); }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler); }, []);
  const save = next => { setData(next); localStorage.setItem(storageKey, JSON.stringify(next)); };
  const reset = () => { localStorage.removeItem(storageKey); localStorage.removeItem('soner_portfolio_local_draft_v2'); localStorage.removeItem('portfolio_data'); setData(INITIAL_PORTFOLIO_DATA); };
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const education = Array.isArray(data.education) ? data.education : [];
  const profile = data.profile || INITIAL_PORTFOLIO_DATA.profile;
  const email = safeEmail(profile.email) ? profile.email : INITIAL_PORTFOLIO_DATA.profile.email;
  const go = target => { setView(target); setMenu(false); if (target !== 'site') window.scrollTo(0, 0); };
  return <>
    <header className="site-header no-print"><div className="shell nav-inner"><a href="#top" className="brand" onClick={() => go('site')}><span className="brand-mark">S<span>.</span></span><span>SONER ERDEVİR<small>ENGINEERING + DIGITAL</small></span></a><button className="mobile-menu" onClick={() => setMenu(!menu)} aria-label="Menu" aria-expanded={menu}>{menu ? <X /> : <span className="menu-lines">☰</span>}</button><nav className={menu ? 'nav-links open' : 'nav-links'} aria-label="Main navigation"><a href="#work" onClick={() => go('site')}>{t.work}</a><a href="#about" onClick={() => go('site')}>{t.about}</a><button onClick={() => go('apps')}>{t.apps}</button><a href="#contact" onClick={() => go('site')}>{t.contact}</a></nav><div className="nav-actions"><button className="icon-btn" aria-label={t.theme} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button><button className="lang-btn" onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}>{lang.toUpperCase()} <span>⌄</span></button><a className="nav-cta" href="#contact" onClick={() => go('site')}>{t.reach}<ArrowUpRight size={16} /></a></div></div></header>
    {view === 'editor' ? <main className="shell editor-main"><ContentEditor data={data} onSaveData={save} onResetData={reset} onClose={() => go('site')} lang={lang} /></main> : view === 'apps' ? <main className="shell apps-main"><button className="eyebrow back-btn" onClick={() => go('site')}>← {t.back}</button><div className="section-heading"><div><span className="eyebrow">01 / DIGITAL PRODUCTS</span><h1>{t.more}</h1></div></div><Store lang={lang} customApps={data.apps} /></main> : <main id="top">
      <section className="hero shell"><div className="hero-copy"><div className="availability"><span className="availability-dot" />{t.available}</div><p className="eyebrow hero-kicker">MECHANICAL ENGINEER · CREATIVE BUILDER</p><h1><span>{t.greeting}</span><br />{t.headline}</h1><p className="hero-intro">{t.intro}</p><div className="hero-actions"><a className="action action-primary" href="#work">{t.explore}<ArrowDownRight size={19} /></a><a className="action action-ghost" href="#contact">{t.reach}<ArrowUpRight size={19} /></a></div><div className="hero-social"><span>FIND ME ON</span><a href={safeExternalUrl(profile.linkedin) || 'https://www.linkedin.com/'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a><a href="https://github.com/serdevir91" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={19} /></a><a href={`mailto:${email}`} aria-label="Email"><Mail size={19} /></a></div></div><div className="hero-visual"><div className="portrait-frame"><img src={`${import.meta.env.BASE_URL}profile.jpeg`} alt={profile.name} /></div></div><div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="hero-bottom-line" /></div></section>
      <section id="work" className="work-section section-pad"><div className="shell"><div className="section-heading reveal"><div><span className="eyebrow">01 / SELECTED WORK</span><h2>{t.selected}<span className="title-dot">.</span></h2><p>{t.selectedSub}</p></div><span className="section-count">({String(projects.length).padStart(2, '0')})</span></div><div className="project-grid">{projects.map((item, index) => <button className="project-card reveal" key={item.id || index} onClick={() => setActiveProject(item)}><span className="project-index">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><div className="project-art"><span className="art-orbit" /><span className="art-core">{index % 2 === 0 ? '◈' : '✳'}</span><span className="art-coordinate">R&D — {item.date}</span></div><div className="project-meta"><span>{item.company}</span><ArrowUpRight size={19} /></div><h3>{item.title || item.company}</h3><p>{localized(item.role, lang)}</p><span className="project-link">{t.details}<ArrowRight size={16} /></span></button>)}</div></div></section>
      <section id="about" className="about-section section-pad"><div className="shell about-grid"><div className="about-intro reveal"><span className="eyebrow">02 / THE PERSON BEHIND THE WORK</span><h2>{t.about}<span className="title-dot">.</span></h2><p>{localized(profile.bio, lang)}</p><div className="about-location"><MapPin size={17} />{profile.location}</div><a className="action action-outline" href={`${import.meta.env.BASE_URL}Soner_Erdevir_CV.pdf`} download>{t.cv}<Download size={17} /></a></div><div className="about-details reveal"><div className="detail-block"><div className="detail-header"><BriefcaseBusiness size={20} /><h3>{t.experience}</h3></div>{experience.map((item, index) => <div className="career-row" key={item.id || index}><div><strong>{localized(item.role, lang)}</strong><span>{item.company}</span></div><small>{item.date}</small></div>)}</div><div className="detail-block"><div className="detail-header"><Wrench size={20} /><h3>{t.expertise}</h3></div><div className="skill-groups">{skills.map((item, index) => <div key={item.id || index}><h4>{localized(item.category, lang)}</h4><div className="skill-tags">{(item.tags || []).slice(0, 7).map((tag, i) => <span key={i}>{tag}</span>)}</div></div>)}</div></div><div className="detail-block"><div className="detail-header"><span className="detail-symbol">◈</span><h3>{t.education}</h3></div>{education.slice(0, 2).map((item, index) => <div className="career-row" key={item.id || index}><div><strong>{item.degree}</strong><span>{item.school}</span></div><small>{item.date}</small></div>)}</div></div></div></section>
      <section className="apps-band"><div className="shell apps-band-inner"><div><span className="eyebrow">03 / BEYOND ENGINEERING</span><h2>{t.more}<span className="title-dot">.</span></h2><p>Flutter · React · Python</p></div><button className="round-arrow" onClick={() => go('apps')} aria-label={t.more}><ArrowUpRight size={28} /></button></div></section>
      <section id="contact" className="contact-section section-pad"><div className="shell contact-grid"><div className="contact-copy reveal"><span className="eyebrow">04 / LET'S CONNECT</span><h2>{t.contactTitle}</h2><p>{t.contactSub}</p><div className="direct-mail"><span>{t.direct}</span><a href={`mailto:${email}`}>{email}<ArrowUpRight size={18} /></a></div></div><div className="contact-panel reveal"><ContactForm key={lang} email={email} lang={lang} t={t} /></div></div></section>
    </main>}
    <footer className="site-footer no-print"><div className="shell footer-inner"><span>© {new Date().getFullYear()} SONER ERDEVİR</span><span>DESIGNED TO BUILD WHAT'S NEXT.</span><button onClick={() => go('editor')}>{t.editor}</button></div></footer>
    {activeProject && <div className="project-modal-backdrop" onClick={() => setActiveProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close"><X /></button><span className="eyebrow">PROJECT / {activeProject.date}</span><h2 id="project-dialog-title">{activeProject.title || activeProject.company}</h2><p className="modal-role">{localized(activeProject.role, lang)} · {activeProject.company}</p><ul>{(Array.isArray(localized(activeProject.bullets, lang)) ? localized(activeProject.bullets, lang) : []).map((bullet, i) => <li key={i}>{bullet}</li>)}</ul></div></div>}
  </>;
}
