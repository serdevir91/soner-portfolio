import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowUp, ArrowDown, Copy, Trash2, Plus, Download, Upload, RotateCcw, Rocket,
  Sun, Moon, Eye, PencilLine, FileText, KeyRound, LogOut, Check, AlertTriangle, Loader2, ExternalLink, Image as ImageIcon,
} from 'lucide-react';
import { L } from '../lib/i18n';
import { SECTIONS, sectionPath, getIn, setIn } from './schema';
import { publish, verifyToken, cleanToken, TOKEN_URL, OWNER, REPO } from './github';
import Site from '../site/Site';
import CvPage from '../cv/CvPage';
import CvMenu from '../components/CvMenu';
import './editor.css';

const DRAFT_KEY = 'portfolio_draft_v4';
const TOKEN_KEY = 'portfolio_gh_token';
const DEFAULT_ON = new Set(['showOnCv', 'includeProjects', 'includeReferences']);

const T = {
  en: {
    title: 'Content editor', back: 'Site', edit: 'Edit', site: 'Site preview', cv: 'CV preview',
    draftSaved: 'Draft saved in this browser', unpublished: 'Unpublished changes', upToDate: 'Same as the live site',
    exportJson: 'Export JSON', importJson: 'Import JSON', discard: 'Discard draft', publish: 'Publish',
    discardAsk: 'Discard all unpublished changes in this browser?', removeAsk: 'Delete this item?',
    add: 'Add', items: 'items', en: 'English', tr: 'Türkçe', invalidJson: 'This file is not valid portfolio JSON.',
    tokenTitle: 'Connect GitHub to publish',
    tokenHelp: `Create a fine-grained token for the ${OWNER}/${REPO} repository with “Contents: Read and write”. The token stays in this browser; it is sent only to api.github.com.`,
    tokenCreate: 'Create token on GitHub', tokenLabel: 'GitHub token', remember: 'Remember on this device',
    connect: 'Connect & publish', cancel: 'Cancel', disconnect: 'Forget token',
    publishing: 'Publishing…', published: 'Published. GitHub Pages and Vercel rebuild the site in about 1–2 minutes.',
    viewCommit: 'View commit',
    errors: {
      invalid_token: 'The token is invalid or expired.',
      missing_permission: 'The token cannot write to the repository. Give it “Contents: Read and write”.',
      not_found: 'Repository not found for this token. Select the soner-portfolio repository when creating it.',
      conflict: 'The file changed on GitHub at the same time. Try again.',
      default: 'Publishing failed. Check your connection and try again.',
    },
    photo: 'Choose photo', photoHint: 'JPG/PNG, resized to 900 px.', datePattern: 'Use YYYY or YYYY-MM',
    note: 'Every change updates both the site and the CV PDF.',
  },
  tr: {
    title: 'İçerik düzenleyici', back: 'Site', edit: 'Düzenle', site: 'Site önizleme', cv: 'CV önizleme',
    draftSaved: 'Taslak bu tarayıcıda kaydedildi', unpublished: 'Yayınlanmamış değişiklikler', upToDate: 'Canlı site ile aynı',
    exportJson: 'JSON dışa aktar', importJson: 'JSON içe aktar', discard: 'Taslağı sil', publish: 'Yayınla',
    discardAsk: 'Bu tarayıcıdaki yayınlanmamış tüm değişiklikler silinsin mi?', removeAsk: 'Bu öğe silinsin mi?',
    add: 'Ekle', items: 'öğe', en: 'English', tr: 'Türkçe', invalidJson: 'Bu dosya geçerli bir portfolyo JSON dosyası değil.',
    tokenTitle: 'Yayınlamak için GitHub bağla',
    tokenHelp: `${OWNER}/${REPO} deposu için “Contents: Read and write” izni olan fine-grained bir token oluştur. Token yalnızca bu tarayıcıda kalır ve sadece api.github.com adresine gönderilir.`,
    tokenCreate: 'GitHub’da token oluştur', tokenLabel: 'GitHub token', remember: 'Bu cihazda hatırla',
    connect: 'Bağla ve yayınla', cancel: 'Vazgeç', disconnect: 'Token’ı unut',
    publishing: 'Yayınlanıyor…', published: 'Yayınlandı. GitHub Pages ve Vercel siteyi yaklaşık 1–2 dakikada yeniden derler.',
    viewCommit: 'Commit’i gör',
    errors: {
      invalid_token: 'Token geçersiz veya süresi dolmuş.',
      missing_permission: 'Token depoya yazamıyor. “Contents: Read and write” izni ver.',
      not_found: 'Bu token ile depo bulunamadı. Token oluştururken soner-portfolio deposunu seç.',
      conflict: 'Dosya aynı anda GitHub’da değişti. Tekrar dene.',
      default: 'Yayınlama başarısız. Bağlantını kontrol edip tekrar dene.',
    },
    photo: 'Fotoğraf seç', photoHint: 'JPG/PNG, 900 px’e küçültülür.', datePattern: 'YYYY veya YYYY-AA kullan',
    note: 'Her değişiklik hem siteyi hem CV PDF’ini günceller.',
  },
};

const readStore = (storage, key) => { try { return storage.getItem(key) || ''; } catch { return ''; } };
const writeStore = (storage, key, value) => { try { if (value) storage.setItem(key, value); else storage.removeItem(key); } catch { /* ignore */ } };

function loadDraft(published) {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw);
    if (!draft?.profile) return null;
    // The live build already contains this draft: no need to keep it.
    if (JSON.stringify(draft) === JSON.stringify(published)) {
      localStorage.removeItem(DRAFT_KEY);
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

/* ---------- field widgets ---------- */

const linesOf = arr => (Array.isArray(arr) ? arr.join('\n') : '');
const toLines = text => text.split('\n').map(s => s.trim()).filter(Boolean);

function LangPair({ children }) {
  return <div className="pair">{children}</div>;
}

function LocInput({ value, onChange, area, rows }) {
  const v = typeof value === 'string' ? { en: value, tr: value } : value || {};
  return (
    <LangPair>
      {['tr', 'en'].map(code => (
        <label key={code} className="lang-field">
          <span className="lang-tag">{code.toUpperCase()}</span>
          {area
            ? <textarea rows={rows || 4} value={v[code] || ''} onChange={e => onChange({ ...v, [code]: e.target.value })} />
            : <input value={v[code] || ''} onChange={e => onChange({ ...v, [code]: e.target.value })} />}
        </label>
      ))}
    </LangPair>
  );
}

// Keeps the raw text while typing so empty lines are not removed mid-edit.
function LinesArea({ value, onChange, rows = 5 }) {
  const [text, setText] = useState(() => linesOf(value));
  const last = useRef(value);
  useEffect(() => {
    if (value !== last.current) {
      last.current = value;
      setText(linesOf(value));
    }
  }, [value]);
  return (
    <textarea
      rows={rows}
      value={text}
      onChange={e => {
        setText(e.target.value);
        const next = toLines(e.target.value);
        last.current = next;
        onChange(next);
      }}
    />
  );
}

function LocList({ value, onChange }) {
  const v = value || { en: [], tr: [] };
  // Rough line count: each bullet wraps about every 60 characters.
  const lineCount = arr => (arr || []).reduce((n, b) => n + Math.max(1, Math.ceil(b.length / 60)), 0);
  const rows = Math.min(16, Math.max(4, lineCount(v.tr) + 1, lineCount(v.en) + 1));
  return (
    <LangPair>
      {['tr', 'en'].map(code => (
        <label key={code} className="lang-field">
          <span className="lang-tag">{code.toUpperCase()}</span>
          <LinesArea rows={rows} value={v[code] || []} onChange={next => onChange({ ...v, [code]: next })} />
        </label>
      ))}
    </LangPair>
  );
}

// Tags may be plain strings or { en, tr }. Edited as two parallel line lists.
function TagsInput({ value, onChange }) {
  const tags = Array.isArray(value) ? value : [];
  const split = code => tags.map(t => L(t, code));
  const merge = (code, next) => {
    const other = code === 'en' ? 'tr' : 'en';
    const otherList = split(other);
    const result = [];
    for (let i = 0; i < next.length; i += 1) {
      const mine = next[i];
      const theirs = otherList[i] ?? mine;
      const pair = code === 'en' ? { en: mine, tr: theirs } : { en: theirs, tr: mine };
      result.push(pair.en === pair.tr ? pair.en : pair);
    }
    onChange(result);
  };
  return (
    <LangPair>
      {['tr', 'en'].map(code => (
        <label key={code} className="lang-field">
          <span className="lang-tag">{code.toUpperCase()}</span>
          <LinesArea rows={Math.min(10, tags.length + 2)} value={split(code)} onChange={next => merge(code, next)} />
        </label>
      ))}
    </LangPair>
  );
}

function resizeImage(file, max = 900) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.86));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function ImageInput({ value, onChange, tx }) {
  const input = useRef(null);
  const src = value && !/^(data:|https?:)/.test(value) ? `${import.meta.env.BASE_URL}${value}` : value;
  return (
    <div className="image-field">
      {src ? <img src={src} alt="" /> : <div className="image-empty"><ImageIcon size={22} /></div>}
      <div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => input.current?.click()}><Upload size={15} /> {tx.photo}</button>
        <p className="hint">{tx.photoHint}</p>
      </div>
      <input ref={input} type="file" accept="image/*" hidden onChange={async e => {
        const file = e.target.files?.[0];
        if (file) onChange(await resizeImage(file));
        e.target.value = '';
      }} />
    </div>
  );
}

function Field({ field, value, onChange, lang, tx }) {
  const label = L(field.label, lang);
  let control;
  switch (field.type) {
    case 'loc': control = <LocInput value={value} onChange={onChange} />; break;
    case 'locArea': control = <LocInput value={value} onChange={onChange} area rows={field.rows} />; break;
    case 'locList': control = <LocList value={value} onChange={onChange} />; break;
    case 'tags': control = <TagsInput value={value} onChange={onChange} />; break;
    case 'list': control = <LinesArea rows={4} value={value || []} onChange={onChange} />; break;
    case 'image': control = <ImageInput value={value} onChange={onChange} tx={tx} />; break;
    case 'bool': {
      const checked = DEFAULT_ON.has(field.key) ? value !== false : value === true;
      return (
        <label className="check">
          <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
          <span>{label}</span>
        </label>
      );
    }
    case 'date': {
      const bad = value && !/^\d{4}(-(0[1-9]|1[0-2]))?$/.test(value);
      control = (
        <>
          <input value={value || ''} placeholder={field.key === 'end' ? (lang === 'tr' ? 'boş = Günümüz' : 'empty = Present') : '2026-03'} inputMode="numeric" className={bad ? 'bad' : ''} onChange={e => onChange(e.target.value.trim())} />
          {bad && <span className="hint warn">{tx.datePattern}</span>}
        </>
      );
      break;
    }
    default:
      control = <input type={field.type === 'url' ? 'url' : 'text'} value={value || ''} onChange={e => onChange(e.target.value)} />;
  }
  const wide = ['loc', 'locArea', 'locList', 'tags', 'image'].includes(field.type);
  return (
    <div className={`field ${wide ? 'wide' : ''}`}>
      <span className="field-label">{label}</span>
      {control}
    </div>
  );
}

/* ---------- section editors ---------- */

function ObjectEditor({ section, value, onChange, lang, tx }) {
  return (
    <div className="form-grid">
      {section.fields.map(f => (
        <Field key={f.key} field={f} lang={lang} tx={tx} value={value?.[f.key]} onChange={v => onChange({ ...(value || {}), [f.key]: v })} />
      ))}
    </div>
  );
}

function ListEditor({ section, value, onChange, lang, tx }) {
  const items = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState(0);
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpen(j);
  };
  const update = (i, item) => onChange(items.map((x, k) => (k === i ? item : x)));
  return (
    <div className="list-editor">
      {items.map((item, i) => (
        <div key={item.id || i} className={`item ${open === i ? 'open' : ''}`}>
          <div className="item-head">
            <button type="button" className="item-title" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="item-index">{String(i + 1).padStart(2, '0')}</span>
              <span>{section.title(item, lang)}</span>
              {item.showOnCv === false && <span className="pill">CV ✕</span>}
            </button>
            <div className="item-tools">
              <button type="button" className="icon-btn sm" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Up"><ArrowUp size={15} /></button>
              <button type="button" className="icon-btn sm" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Down"><ArrowDown size={15} /></button>
              <button type="button" className="icon-btn sm" aria-label="Duplicate" onClick={() => {
                const copy = { ...structuredClone(item), ...(item.id ? { id: `${item.id}_copy${Date.now() % 1000}` } : {}) };
                const next = [...items];
                next.splice(i + 1, 0, copy);
                onChange(next);
                setOpen(i + 1);
              }}><Copy size={15} /></button>
              <button type="button" className="icon-btn sm danger" aria-label="Delete" onClick={() => {
                if (window.confirm(tx.removeAsk)) onChange(items.filter((_, k) => k !== i));
              }}><Trash2 size={15} /></button>
            </div>
          </div>
          {open === i && (
            <div className="form-grid">
              {section.fields.map(f => (
                <Field key={f.key} field={f} lang={lang} tx={tx} value={item[f.key]} onChange={v => update(i, { ...item, [f.key]: v })} />
              ))}
            </div>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-ghost add-btn" onClick={() => { onChange([section.blank(), ...items]); setOpen(0); }}>
        <Plus size={16} /> {tx.add}
      </button>
    </div>
  );
}

/* ---------- publish dialog ---------- */

function TokenDialog({ tx, onSubmit, onClose, busy, error }) {
  const [token, setToken] = useState('');
  const [remember, setRemember] = useState(false);
  return (
    <div className="modal-back" onClick={onClose}>
      <form className="modal token-modal" onClick={e => e.stopPropagation()} onSubmit={e => { e.preventDefault(); onSubmit(token, remember); }}>
        <h3><KeyRound size={20} /> {tx.tokenTitle}</h3>
        <p className="muted">{tx.tokenHelp}</p>
        <a className="link" href={TOKEN_URL} target="_blank" rel="noreferrer">{tx.tokenCreate} <ExternalLink size={14} /></a>
        <label className="field">
          <span className="field-label">{tx.tokenLabel}</span>
          <input type="password" autoComplete="off" value={token} onChange={e => setToken(e.target.value)} placeholder="github_pat_…" autoFocus />
        </label>
        <label className="check"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> <span>{tx.remember}</span></label>
        {error && <p className="alert"><AlertTriangle size={16} /> {error}</p>}
        <div className="row-end">
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>{tx.cancel}</button>
          <button type="submit" className="btn btn-primary btn-sm" disabled={busy || !cleanToken(token)}>
            {busy ? <Loader2 size={15} className="spin" /> : <Rocket size={15} />} {tx.connect}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- editor shell ---------- */

export default function Editor({ published, lang, setLang, theme, setTheme }) {
  const tx = T[lang];
  const [data, setData] = useState(() => loadDraft(published) || structuredClone(published));
  const [active, setActive] = useState('profile');
  const [mode, setMode] = useState('edit');
  const [token, setToken] = useState(() => readStore(sessionStorage, TOKEN_KEY) || readStore(localStorage, TOKEN_KEY));
  const [dialog, setDialog] = useState(false);
  const [status, setStatus] = useState({ busy: false, error: '', done: '', commitUrl: '' });
  const fileInput = useRef(null);

  const dirty = useMemo(() => JSON.stringify(data) !== JSON.stringify(published), [data, published]);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        if (dirty) localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
        else localStorage.removeItem(DRAFT_KEY);
      } catch { /* storage full or blocked */ }
    }, 300);
    return () => clearTimeout(id);
  }, [data, dirty]);

  useEffect(() => { document.title = `${tx.title} · ${published.profile?.name || ''}`; }, [tx.title, published]);

  const section = SECTIONS.find(s => s.key === active);
  const path = sectionPath(section);
  const value = getIn(data, path);
  const setValue = v => setData(prev => setIn(prev, path, v));

  const doPublish = async (tok, remember) => {
    setStatus({ busy: true, error: '', done: '', commitUrl: '' });
    try {
      await verifyToken(tok);
      const result = await publish(tok, data);
      const clean = cleanToken(tok);
      setToken(clean);
      writeStore(sessionStorage, TOKEN_KEY, clean);
      if (remember) writeStore(localStorage, TOKEN_KEY, clean);
      setData(result.data);
      setDialog(false);
      setStatus({ busy: false, error: '', done: tx.published, commitUrl: result.commitUrl || '' });
    } catch (err) {
      const message = tx.errors[err.message] || tx.errors.default;
      if (err.message === 'invalid_token') {
        setToken('');
        writeStore(sessionStorage, TOKEN_KEY, '');
        writeStore(localStorage, TOKEN_KEY, '');
      }
      setStatus({ busy: false, error: message, done: '', commitUrl: '' });
      setDialog(true);
    }
  };

  const onPublish = () => (token ? doPublish(token, Boolean(readStore(localStorage, TOKEN_KEY))) : setDialog(true));

  const exportJson = () => {
    const blob = new Blob([`${JSON.stringify(data, null, 2)}\n`], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'portfolio.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  };

  const importJson = async file => {
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed?.profile || !Array.isArray(parsed.experience)) throw new Error('bad');
      setData(parsed);
    } catch {
      window.alert(tx.invalidJson);
    }
  };

  return (
    <div className="editor">
      <header className="ed-top">
        <a href="#top" className="btn btn-ghost btn-sm"><ArrowLeft size={15} /> {tx.back}</a>
        <h1>{tx.title}</h1>
        <span className={`state ${dirty ? 'dirty' : ''}`}>
          {dirty ? <><span className="dot" /> {tx.unpublished}</> : <><Check size={14} /> {tx.upToDate}</>}
        </span>
        <div className="ed-actions">
          <div className="seg">
            <button className={mode === 'edit' ? 'on' : ''} onClick={() => setMode('edit')}><PencilLine size={14} /> {tx.edit}</button>
            <button className={mode === 'site' ? 'on' : ''} onClick={() => setMode('site')}><Eye size={14} /> {tx.site}</button>
            <button className={mode === 'cv' ? 'on' : ''} onClick={() => setMode('cv')}><FileText size={14} /> {tx.cv}</button>
          </div>
          <button className="icon-btn lang-btn" onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}>{lang === 'tr' ? 'EN' : 'TR'}</button>
          <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Theme">{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button>
          <button className="btn btn-primary btn-sm" onClick={onPublish} disabled={status.busy || !dirty}>
            {status.busy ? <Loader2 size={15} className="spin" /> : <Rocket size={15} />} {status.busy ? tx.publishing : tx.publish}
          </button>
        </div>
      </header>

      {(status.done || (status.error && !dialog)) && (
        <div className={`banner ${status.error ? 'err' : 'ok'}`}>
          {status.error ? <AlertTriangle size={16} /> : <Check size={16} />}
          <span>{status.error || status.done}</span>
          {status.commitUrl && <a href={status.commitUrl} target="_blank" rel="noreferrer">{tx.viewCommit} <ExternalLink size={13} /></a>}
        </div>
      )}

      {mode === 'edit' && (
        <div className="ed-body">
          <aside className="ed-side">
            <nav>
              {SECTIONS.map(s => {
                const v = getIn(data, sectionPath(s));
                return (
                  <button key={s.key} className={active === s.key ? 'on' : ''} onClick={() => setActive(s.key)}>
                    <span>{L(s.label, lang)}</span>
                    {Array.isArray(v) && <em>{v.length}</em>}
                  </button>
                );
              })}
            </nav>
            <div className="side-tools">
              <CvMenu data={data} lang={lang} variant="ghost" showView={false} />
              <button className="btn btn-ghost btn-sm" onClick={exportJson}><Download size={15} /> {tx.exportJson}</button>
              <button className="btn btn-ghost btn-sm" onClick={() => fileInput.current?.click()}><Upload size={15} /> {tx.importJson}</button>
              <input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={e => { const f = e.target.files?.[0]; if (f) importJson(f); e.target.value = ''; }} />
              {dirty && (
                <button className="btn btn-ghost btn-sm" onClick={() => { if (window.confirm(tx.discardAsk)) setData(structuredClone(published)); }}>
                  <RotateCcw size={15} /> {tx.discard}
                </button>
              )}
              {token && (
                <button className="btn btn-ghost btn-sm" onClick={() => { setToken(''); writeStore(sessionStorage, TOKEN_KEY, ''); writeStore(localStorage, TOKEN_KEY, ''); }}>
                  <LogOut size={15} /> {tx.disconnect}
                </button>
              )}
              <p className="hint">{tx.note}</p>
            </div>
          </aside>
          <section className="ed-main">
            <h2>{L(section.label, lang)}</h2>
            {section.kind === 'object'
              ? <ObjectEditor section={section} value={value} onChange={setValue} lang={lang} tx={tx} />
              : <ListEditor key={section.key} section={section} value={value} onChange={setValue} lang={lang} tx={tx} />}
          </section>
        </div>
      )}
      {mode === 'site' && <div className="ed-preview"><Site data={data} lang={lang} preview /></div>}
      {mode === 'cv' && <div className="ed-preview cv-preview"><CvPage data={data} lang={lang} embedded /></div>}

      {dialog && (
        <TokenDialog
          tx={tx}
          busy={status.busy}
          error={status.error}
          onClose={() => { setDialog(false); setStatus(s => ({ ...s, error: '' })); }}
          onSubmit={doPublish}
        />
      )}
    </div>
  );
}
