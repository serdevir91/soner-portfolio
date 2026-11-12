import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { UI } from '../lib/i18n';
import CvSheet from './CvSheet';
import CvMenu from '../components/CvMenu';

// Page at #/cv: live preview of the CV and the PDF download.
export default function CvPage({ data, lang, embedded = false }) {
  const tx = UI[lang];
  const [cvLang, setCvLang] = useState(lang);
  return (
    <main className={`cv-page ${embedded ? 'embedded' : ''}`}>
      <div className="cv-toolbar">
        {!embedded && <a href="#top" className="btn btn-ghost btn-sm"><ArrowLeft size={16} /> {tx.back}</a>}
        <div className="seg" role="tablist" aria-label={tx.language}>
          {['tr', 'en'].map(code => (
            <button key={code} role="tab" aria-selected={cvLang === code} className={cvLang === code ? 'on' : ''} onClick={() => setCvLang(code)}>
              {code === 'tr' ? 'Türkçe' : 'English'}
            </button>
          ))}
        </div>
        <CvMenu data={data} lang={lang} align="right" showView={false} />
      </div>
      <div className="cv-stage">
        <CvSheet data={data} lang={cvLang} />
      </div>
    </main>
  );
}
