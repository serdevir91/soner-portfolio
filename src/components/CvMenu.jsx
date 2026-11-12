import { useEffect, useRef, useState } from 'react';
import { Download, ChevronDown, Loader2, FileText } from 'lucide-react';
import { UI } from '../lib/i18n';
import { downloadCv } from '../cv/download';

// "Download CV" button with a TR / EN choice. The PDF is built from `data`.
export default function CvMenu({ data, lang, variant = 'primary', align = 'left', showView = true }) {
  const tx = UI[lang];
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = e => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc); };
  }, [open]);

  const run = async cvLang => {
    setBusy(cvLang);
    setError('');
    try {
      await downloadCv(data, cvLang);
      setOpen(false);
    } catch (err) {
      console.error(err);
      setError(lang === 'tr' ? 'PDF oluşturulamadı. Tekrar deneyin.' : 'Could not build the PDF. Try again.');
    } finally {
      setBusy('');
    }
  };

  const options = lang === 'tr' ? ['tr', 'en'] : ['en', 'tr'];

  return (
    <div className={`cv-menu align-${align}`} ref={ref}>
      <button type="button" className={`btn btn-${variant}`} onClick={() => setOpen(o => !o)} aria-expanded={open} aria-haspopup="menu">
        {busy ? <Loader2 size={17} className="spin" /> : <Download size={17} />}
        <span>{busy ? tx.preparing : tx.downloadCv}</span>
        <ChevronDown size={15} className={open ? 'rot' : ''} />
      </button>
      {open && (
        <div className="cv-menu-pop" role="menu">
          {options.map(code => (
            <button key={code} type="button" role="menuitem" disabled={Boolean(busy)} onClick={() => run(code)}>
              <span className="flag">{code.toUpperCase()}</span>
              <span>{code === 'tr' ? tx.cvTurkish : tx.cvEnglish}</span>
              {busy === code ? <Loader2 size={15} className="spin" /> : <Download size={15} />}
            </button>
          ))}
          {showView && (
            <a href="#/cv" role="menuitem" onClick={() => setOpen(false)}>
              <span className="flag"><FileText size={13} /></span>
              <span>{tx.viewCv}</span>
            </a>
          )}
          {error && <p className="cv-menu-error">{error}</p>}
        </div>
      )}
    </div>
  );
}
