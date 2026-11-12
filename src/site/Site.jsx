import { useEffect, useState } from 'react';
import {
  Mail, Phone, MapPin, Linkedin, Github, ArrowUpRight, X, Globe, Store, Play,
  Briefcase, Code2, GraduationCap, Users, Wrench, Sparkles, ChevronDown, FlaskConical,
} from 'lucide-react';
import { L, UI, formatRange, isCurrent, assetUrl, displayUrl } from '../lib/i18n';
import CvMenu from '../components/CvMenu';
import './site.css';

const list = value => (Array.isArray(value) ? value : []);

function useReveal(deps) {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('in'));
      return undefined;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, deps);
}

function SectionHead({ index, label, title, lead }) {
  return (
    <header className="sec-head reveal">
      <p className="eyebrow"><span>{String(index).padStart(2, '0')}</span>{label}</p>
      <h2>{title}</h2>
      {lead && <p className="sec-lead">{lead}</p>}
    </header>
  );
}

function Hero({ data, lang, tx }) {
  const p = data.profile || {};
  const current = list(data.experience).find(isCurrent);
  const [first, ...rest] = (p.name || '').split(' ');
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          {current && (
            <p className="status-pill reveal">
              <span className="pulse" />
              <span>
                {lang === 'tr'
                  ? <>{tx.currently}: {L(current.role, lang)} · <b>{L(current.company, lang)}</b></>
                  : <>{tx.currently} {L(current.role, lang)} {tx.at} <b>{L(current.company, lang)}</b></>}
              </span>
            </p>
          )}
          <h1 className="hero-name reveal">
            {first} <span>{rest.join(' ')}</span>
          </h1>
          <p className="hero-title reveal">{L(p.title, lang)}</p>
          <p className="hero-headline reveal">{L(p.headline, lang) || L(p.bio, lang)}</p>
          <div className="hero-actions reveal">
            <CvMenu data={data} lang={lang} />
            <a className="btn btn-ghost" href="#contact"><Mail size={17} /> {tx.contact}</a>
          </div>
          <div className="hero-meta reveal">
            {L(p.location, lang) && <span><MapPin size={15} /> {L(p.location, lang)}</span>}
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={15} /> LinkedIn</a>}
            {p.github && <a href={p.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={15} /> GitHub</a>}
          </div>
        </div>
        <div className="hero-visual reveal">
          <div className="photo-frame">
            <span className="tick tl" /><span className="tick tr" /><span className="tick bl" /><span className="tick br" />
            {p.avatar ? <img src={assetUrl(p.avatar)} alt={p.name} /> : <div className="photo-fallback">{(p.name || '?')[0]}</div>}
            <span className="dim dim-x"><i />{lang === 'tr' ? 'TASARIM' : 'DESIGN'} · FEA · CNC<i /></span>
          </div>
        </div>
      </div>
      {list(p.highlights).length > 0 && (
        <dl className="stats reveal">
          {p.highlights.map((h, i) => (
            <div key={i}>
              <dt>{L(h.value, lang)}</dt>
              <dd>{L(h.label, lang)}</dd>
            </div>
          ))}
        </dl>
      )}
      <a href="#about" className="scroll-cue" aria-label={tx.about}><ChevronDown size={18} /></a>
    </section>
  );
}

function About({ data, lang, tx, index }) {
  const p = data.profile || {};
  return (
    <section className="section" id="about">
      <SectionHead index={index} label={tx.about} title={L(p.title, lang)} />
      <div className="about reveal">
        <p>{L(p.bio, lang)}</p>
      </div>
    </section>
  );
}

function Bullets({ items }) {
  if (!items?.length) return null;
  return <ul className="bullets">{items.map((b, i) => <li key={i}>{b}</li>)}</ul>;
}

function Experience({ data, lang, tx, index }) {
  const items = list(data.experience);
  if (!items.length) return null;
  return (
    <section className="section" id="experience">
      <SectionHead index={index} label={tx.experience} title={tx.workExperience} />
      <ol className="timeline">
        {items.map(e => {
          const now = isCurrent(e);
          return (
            <li key={e.id} className={`tl-item reveal ${now ? 'is-now' : ''}`}>
              <div className="tl-date">
                <span>{formatRange(e, lang, true)}</span>
                {now && <em>{tx.now}</em>}
              </div>
              <div className="tl-dot" aria-hidden="true" />
              <article className="card tl-card">
                <header>
                  <h3>{L(e.role, lang)}</h3>
                  <p className="org"><Briefcase size={14} /> {L(e.company, lang)} <span>·</span> {L(e.location, lang)}</p>
                </header>
                <Bullets items={e.bullets?.[lang] || e.bullets?.en} />
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Projects({ data, lang, tx, index }) {
  const items = list(data.projects);
  if (!items.length) return null;
  return (
    <section className="section" id="projects">
      <SectionHead index={index} label={tx.projectsShort} title={tx.projects} />
      <div className="proj-grid">
        {items.map((pr, i) => (
          <article key={pr.id} className={`card proj reveal ${i === 0 ? 'proj-wide' : ''}`}>
            <div className="proj-top">
              <span className="badge">{L(pr.role, lang)}</span>
              <span className="mono">{formatRange(pr, lang, true)}</span>
            </div>
            <h3>{L(pr.name, lang)}</h3>
            {L(pr.subtitle, lang) && <p className="proj-sub">{L(pr.subtitle, lang)}</p>}
            <Bullets items={pr.bullets?.[lang] || pr.bullets?.en} />
            {list(pr.tags).length > 0 && (
              <div className="chips">{pr.tags.map(t => <span key={L(t, lang)} className="chip">{L(t, lang)}</span>)}</div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function AppIcon({ app, size = 56 }) {
  if (app.icon) return <img className="app-icon" src={assetUrl(app.icon)} alt="" width={size} height={size} loading="lazy" />;
  return <div className="app-icon app-icon-fallback" style={{ width: size, height: size }}>{(app.name || '?').slice(0, 1)}</div>;
}

function AppLinks({ app, tx }) {
  const links = [
    app.playStoreUrl && { href: app.playStoreUrl, label: 'Google Play', icon: Play },
    app.microsoftStoreUrl && { href: app.microsoftStoreUrl, label: 'Microsoft Store', icon: Store },
    app.testFlightUrl && { href: app.testFlightUrl, label: tx.testFlight, icon: FlaskConical },
    app.webUrl && { href: app.webUrl, label: tx.website, icon: Globe },
    app.githubUrl && { href: app.githubUrl, label: tx.source, icon: Github },
  ].filter(Boolean);
  return (
    <div className="app-links">
      {links.map(({ href, label, icon: Icon }) => (
        <a key={href} href={href} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
          <Icon size={14} /> {label}
        </a>
      ))}
    </div>
  );
}

function AppModal({ app, lang, tx, onClose }) {
  useEffect(() => {
    const esc = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', esc);
    document.body.classList.add('no-scroll');
    return () => { document.removeEventListener('keydown', esc); document.body.classList.remove('no-scroll'); };
  }, [onClose]);
  const features = app.features?.[lang] || app.features?.en || [];
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={app.name} onClick={e => e.stopPropagation()}>
        <button className="icon-btn modal-close" onClick={onClose} aria-label={tx.close}><X size={18} /></button>
        <div className="modal-head">
          <AppIcon app={app} size={72} />
          <div>
            <h3>{app.name}</h3>
            <p className="muted">{L(app.category, lang)}</p>
            <div className="chips">{list(app.platforms).map(pl => <span key={pl} className="chip">{pl}</span>)}</div>
          </div>
        </div>
        <p>{L(app.description, lang) || L(app.tagline, lang)}</p>
        {features.length > 0 && (
          <>
            <h4>{tx.features}</h4>
            <ul className="bullets cols">{features.map(f => <li key={f}>{f}</li>)}</ul>
          </>
        )}
        {list(app.screenshots).length > 0 && (
          <div className="shots">
            {app.screenshots.map(src => <img key={src} src={assetUrl(src)} alt="" loading="lazy" />)}
          </div>
        )}
        <AppLinks app={app} tx={tx} />
      </div>
    </div>
  );
}

const APPS_FIRST = 9;

function Apps({ data, lang, tx, index, preview }) {
  const apps = list(data.apps);
  const studio = data.studio;
  const [active, setActive] = useState(null);
  const [showAll, setShowAll] = useState(false);
  if (!apps.length) return null;
  const shown = showAll || preview ? apps : apps.slice(0, APPS_FIRST);
  return (
    <section className="section" id="apps">
      <SectionHead index={index} label={tx.apps} title={lang === 'tr' ? 'Uygulamalar & Araçlar' : 'Apps & Tools'} lead={tx.appsLead} />
      {studio?.url && (
        <a className="card studio reveal" href={studio.url} target="_blank" rel="noopener">
          <span className="studio-mark">EL</span>
          <span className="studio-body">
            <b>{studio.name}</b>
            <span className="muted small">{tx.studioApps(apps.length)}</span>
            {L(studio.description, lang) && <span className="studio-desc">{L(studio.description, lang)}</span>}
          </span>
          <span className="btn btn-ghost studio-cta">{tx.visitStudio} <ArrowUpRight size={16} /></span>
        </a>
      )}
      <div className="app-grid">
        {shown.map(app => (
          <article
            key={app.id}
            className="card app-card reveal"
            tabIndex={0}
            role="button"
            onClick={() => setActive(app)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(app); } }}
          >
            <div className="app-top">
              <AppIcon app={app} />
              <ArrowUpRight size={18} className="app-arrow" />
            </div>
            <h3>{app.name}</h3>
            <p className="muted small">{L(app.category, lang)}</p>
            <p className="app-tag">{L(app.tagline, lang)}</p>
            <div className="chips">{list(app.platforms).map(pl => <span key={pl} className="chip">{pl}</span>)}</div>
            {app.testFlightUrl && (
              <a className="app-beta" href={app.testFlightUrl} target="_blank" rel="noopener" onClick={e => e.stopPropagation()}>
                <FlaskConical size={14} /> {tx.joinBeta}
              </a>
            )}
          </article>
        ))}
      </div>
      {apps.length > APPS_FIRST && !preview && (
        <div className="apps-more">
          <button className="btn btn-ghost" onClick={() => setShowAll(v => !v)}>
            {showAll ? tx.showFewer : tx.showAllApps(apps.length)}
            <ChevronDown size={16} style={{ transform: showAll ? 'rotate(180deg)' : 'none' }} />
          </button>
        </div>
      )}
      {active && <AppModal app={active} lang={lang} tx={tx} onClose={() => setActive(null)} />}
    </section>
  );
}

const skillIcons = [Wrench, Sparkles, Code2, Briefcase, Code2, Users];

function Skills({ data, lang, tx, index }) {
  const groups = list(data.skills);
  if (!groups.length) return null;
  return (
    <section className="section" id="skills">
      <SectionHead index={index} label={tx.skills} title={tx.technicalSkills} />
      <div className="skill-grid">
        {groups.map((g, i) => {
          const Icon = skillIcons[i % skillIcons.length];
          return (
            <article key={g.id} className="card skill reveal">
              <h3><Icon size={17} /> {L(g.category, lang)}</h3>
              <div className="chips">{list(g.tags).map(t => <span key={L(t, lang)} className="chip">{L(t, lang)}</span>)}</div>
            </article>
          );
        })}
        {list(data.languages).length > 0 && (
          <article className="card skill reveal">
            <h3><Globe size={17} /> {tx.languages}</h3>
            <ul className="lang-list">
              {data.languages.map(l => (
                <li key={l.id}><b>{L(l.name, lang)}</b><span>{L(l.level, lang)}</span></li>
              ))}
            </ul>
          </article>
        )}
      </div>
    </section>
  );
}

function Education({ data, lang, tx, index }) {
  const items = list(data.education);
  if (!items.length) return null;
  return (
    <section className="section" id="education">
      <SectionHead index={index} label={tx.education} title={tx.education} />
      <div className="edu-grid">
        {items.map(ed => (
          <article key={ed.id} className="card edu reveal">
            <GraduationCap size={20} className="edu-icon" />
            <p className="mono">{formatRange(ed, lang, true)}</p>
            <h3>{L(ed.school, lang)}</h3>
            <p>{L(ed.degree, lang)}</p>
            {L(ed.note, lang) && <p className="edu-note">{L(ed.note, lang)}</p>}
            <p className="muted small"><MapPin size={13} /> {L(ed.location, lang)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function References({ data, lang, tx, index }) {
  const refs = list(data.references);
  if (!refs.length) return null;
  return (
    <section className="section" id="references">
      <SectionHead index={index} label={tx.references} title={tx.references} />
      <div className="ref-grid">
        {refs.map(r => (
          <article key={r.id} className="card ref reveal">
            <h3>{r.name}</h3>
            {L(r.role, lang) && <span className="badge">{L(r.role, lang)}</span>}
            <p className="muted small">{[L(r.organization, lang), L(r.department, lang)].filter(Boolean).join(' · ')}</p>
            <div className="ref-links">
              {r.email && <a href={`mailto:${r.email}`}><Mail size={14} /> {r.email}</a>}
              {r.phone && <a href={`tel:${r.phone.replace(/\s+/g, '')}`}><Phone size={14} /> {r.phone}</a>}
              {r.profileUrl && <a href={r.profileUrl} target="_blank" rel="noreferrer"><ArrowUpRight size={14} /> {displayUrl(r.profileUrl)}</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact({ data, lang, tx, index }) {
  const p = data.profile || {};
  return (
    <section className="section" id="contact">
      <div className="contact card reveal">
        <p className="eyebrow"><span>{String(index).padStart(2, '0')}</span>{tx.contact}</p>
        <h2>{tx.getInTouch}</h2>
        <p className="sec-lead">{tx.contactLead}</p>
        <div className="contact-actions">
          {p.email && <a className="btn btn-primary" href={`mailto:${p.email}`}><Mail size={17} /> {p.email}</a>}
          {p.phone && <a className="btn btn-ghost" href={`tel:${p.phone.replace(/\s+/g, '')}`}><Phone size={17} /> {p.phone}</a>}
          {p.linkedin && <a className="btn btn-ghost" href={p.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>}
        </div>
        <div className="contact-cv">
          <CvMenu data={data} lang={lang} variant="ghost" />
        </div>
      </div>
    </section>
  );
}

export default function Site({ data, lang, preview = false }) {
  const tx = UI[lang];
  useReveal([lang, data]);
  let n = 0;
  const next = () => (n += 1);
  return (
    <main className={`site ${preview ? 'is-preview' : ''}`}>
      <Hero data={data} lang={lang} tx={tx} />
      <About data={data} lang={lang} tx={tx} index={next()} />
      <Experience data={data} lang={lang} tx={tx} index={next()} />
      <Projects data={data} lang={lang} tx={tx} index={next()} />
      <Apps data={data} lang={lang} tx={tx} index={next()} preview={preview} />
      <Skills data={data} lang={lang} tx={tx} index={next()} />
      <Education data={data} lang={lang} tx={tx} index={next()} />
      <References data={data} lang={lang} tx={tx} index={next()} />
      <Contact data={data} lang={lang} tx={tx} index={next()} />
    </main>
  );
}
