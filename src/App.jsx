import { lazy, Suspense, useEffect, useState } from 'react';
import { Sun, Moon, Menu, X, Pencil, ArrowUpRight } from 'lucide-react';
import published from './data/portfolio.json';
import { UI } from './lib/i18n';
import Site from './site/Site';
import CvPage from './cv/CvPage';

const Editor = lazy(() => import('./admin/Editor'));

const readHash = () => {
  const h = window.location.hash;
  if (h.startsWith('#/cv')) return 'cv';
  if (h.startsWith('#/admin') || h === '#admin') return 'admin';
  return 'site';
};

const stored = (key, fallback) => {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
};
const store = (key, value) => {
  try { localStorage.setItem(key, value); } catch { /* private mode */ }
};

function Nav({ lang, setLang, theme, setTheme, route, studio }) {
  const tx = UI[lang];
  const [open, setOpen] = useState(false);
  const links = [
    ['#about', tx.about], ['#experience', tx.experience], ['#projects', tx.projectsShort],
    ['#apps', tx.apps], ['#skills', tx.skills], ['#education', tx.education], ['#contact', tx.contact],
  ];
  const toSite = href => (route === 'site' ? href : `#${href.slice(1)}`);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">SE</span>
          <span className="brand-name">Soner Erdevir</span>
        </a>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([href, label]) => (
            <a key={href} href={toSite(href)} onClick={() => setOpen(false)}>{label}</a>
          ))}
          {studio?.url && (
            <a href={studio.url} target="_blank" rel="noopener" className="nav-labs" onClick={() => setOpen(false)}>
              {studio.name}<ArrowUpRight size={13} />
            </a>
          )}
          <a href="#/cv" className={`nav-cv ${route === 'cv' ? 'active' : ''}`} onClick={() => setOpen(false)}>CV</a>
        </div>
        <div className="nav-tools">
          <button className="icon-btn lang-btn" onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} aria-label={tx.language}>
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={tx.theme}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="icon-btn nav-burger" onClick={() => setOpen(o => !o)} aria-label={tx.menu} aria-expanded={open}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Footer({ lang, name, studio }) {
  const tx = UI[lang];
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {name}</p>
      <p className="muted">{tx.builtWith}</p>
      {studio?.url && <a href={studio.url} target="_blank" rel="noopener" className="footer-labs">{studio.name} <ArrowUpRight size={13} /></a>}
      <a href="#/admin" className="footer-edit"><Pencil size={13} /> {tx.edit}</a>
    </footer>
  );
}

export default function App() {
  const [route, setRoute] = useState(readHash);
  const [lang, setLang] = useState(() => stored('portfolio_lang', navigator.language?.toLowerCase().startsWith('tr') ? 'tr' : 'en'));
  const [theme, setTheme] = useState(() => stored('portfolio_theme', window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

  useEffect(() => {
    const onHash = () => {
      const next = readHash();
      setRoute(prev => {
        if (prev !== next) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    store('portfolio_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    store('portfolio_lang', lang);
  }, [lang]);

  // When coming back to the site with a section hash, scroll to that section.
  useEffect(() => {
    if (route !== 'site') return;
    const id = window.location.hash.slice(1);
    if (id && !id.startsWith('/')) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, [route]);

  if (route === 'admin') {
    return (
      <Suspense fallback={<div className="loading">…</div>}>
        <Editor published={published} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      </Suspense>
    );
  }

  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <Nav lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} route={route} studio={published.studio} />
      {route === 'cv' ? <CvPage data={published} lang={lang} /> : <Site data={published} lang={lang} />}
      <Footer lang={lang} name={published.profile?.name} studio={published.studio} />
    </>
  );
}
