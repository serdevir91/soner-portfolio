import { buildCv } from './model';
import './cv.css';

// HTML twin of CvPdf. Same structure, same content, A4 look.
export default function CvSheet({ data, lang }) {
  const cv = buildCv(data, lang);
  return (
    <article className="cv-sheet" lang={lang}>
      <header className="cv-head">
        <h1>{cv.name}</h1>
        {cv.title && <p className="cv-title">{cv.title}</p>}
        <p className="cv-contact">
          {cv.contact.map((c, i) => (
            <span key={i}>
              {i > 0 && <span className="cv-sep">|</span>}
              {c.href ? <a href={c.href}>{c.text}</a> : c.text}
            </span>
          ))}
        </p>
      </header>
      {cv.sections.map(section => (
        <section key={section.key} className={`cv-section cv-${section.key}`}>
          <h2>{section.title}</h2>
          {section.text && <p className="cv-text">{section.text}</p>}
          {section.entries?.map((e, i) => (
            <div key={i} className="cv-entry">
              <div className="cv-row">
                <span>{e.heading}</span>
                <span>{e.date}</span>
              </div>
              {(e.sub || e.subRight) && (
                <div className="cv-row cv-sub">
                  <span>{e.sub}</span>
                  <span>{e.subRight}</span>
                </div>
              )}
              {e.subtitle && <div className="cv-subtitle">{e.subtitle}</div>}
              {e.bullets.length > 0 && (
                <ul>
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
          {section.lines?.map((l, i) => (
            <p key={i} className="cv-line"><b>{l.label}:</b> {l.text}</p>
          ))}
          {section.refs?.map((r, i) => (
            <div key={i} className="cv-ref">
              <div><b>{r.name}</b>{r.role ? ` (${r.role})` : ''}</div>
              {r.org && <div>{r.org}</div>}
              {r.contact && <div>{r.contact}</div>}
            </div>
          ))}
        </section>
      ))}
    </article>
  );
}
