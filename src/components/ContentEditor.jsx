import { useRef, useState } from 'react';
import { ArrowLeft, Download, LogOut, Plus, RotateCcw, Save, Trash2, Upload } from 'lucide-react';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialData';
import { safeEmail, safeExternalUrl } from '../utils/safeLinks';

const sections = ['profile', 'projects', 'experience', 'skills', 'education', 'references', 'apps'];
const titles = {
  tr: {
    profile: 'Profil',
    projects: 'Projeler',
    experience: 'Deneyim',
    skills: 'Yetenekler',
    education: 'Eğitim',
    references: 'Referanslar',
    apps: 'Uygulamalar',
  },
  en: {
    profile: 'Profile',
    projects: 'Projects',
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
    references: 'References',
    apps: 'Apps',
  },
};

const fields = {
  projects: [
    ['title', 'Başlık / Title'],
    ['role.en', 'Role (EN)'],
    ['role.tr', 'Rol (TR)'],
    ['company', 'Kurum / Company'],
    ['date', 'Tarih / Date'],
  ],
  experience: [
    ['role.en', 'Role (EN)'],
    ['role.tr', 'Rol (TR)'],
    ['company', 'Kurum / Company'],
    ['location', 'Konum / Location'],
    ['date', 'Tarih / Date'],
  ],
  skills: [
    ['category.en', 'Category (EN)'],
    ['category.tr', 'Kategori (TR)'],
    ['tags', 'Etiketler / Tags (satır başına bir tane)'],
  ],
  education: [
    ['degree.en', 'Degree (EN)'],
    ['degree.tr', 'Derece (TR)'],
    ['school', 'Okul / School'],
    ['date', 'Tarih / Date'],
    ['honors', 'Başarı / Honors'],
  ],
  references: [
    ['name', 'İsim / Name'],
    ['role.en', 'Rol (EN)'],
    ['role.tr', 'Rol (TR)'],
    ['title.en', 'Title / Dept (EN)'],
    ['title.tr', 'Unvan / Bölüm (TR)'],
    ['phone', 'Telefon / Phone'],
    ['email', 'E-posta / Email'],
    ['profileUrl', 'Profil URL'],
  ],
  apps: [
    ['name', 'Uygulama adı / App name'],
    ['tagline.en', 'Tagline (EN)'],
    ['tagline.tr', 'Açıklama (TR)'],
    ['icon', 'İkon yolu / Icon path'],
    ['webUrl', 'Web uygulaması / Web app URL'],
    ['playStoreUrl', 'Play Store URL'],
    ['githubUrl', 'GitHub URL'],
  ],
};

function getPath(object, path) {
  const parts = path.split('.');
  let current = object;
  for (const part of parts) {
    if (current === null || current === undefined) return '';
    current = current[part];
  }
  return current ?? '';
}

function setPath(object, path, value) {
  const [first, second] = path.split('.');
  if (!second) return { ...object, [first]: value };
  const targetChild = typeof object[first] === 'object' && object[first] !== null ? object[first] : {};
  return { ...object, [first]: { ...targetChild, [second]: value } };
}

function blankItem(section) {
  const id = `${section}_${crypto.randomUUID()}`;
  if (section === 'projects') return { id, title: '', role: { tr: '', en: '' }, company: '', date: '', bullets: { tr: [], en: [] } };
  if (section === 'experience') return { id, role: { tr: '', en: '' }, company: '', location: '', date: '', bullets: { tr: [], en: [] } };
  if (section === 'skills') return { id, category: { tr: '', en: '' }, tags: [] };
  if (section === 'education') return { id, degree: { tr: '', en: '' }, school: '', date: '', honors: '' };
  if (section === 'references') return { id, name: '', role: { tr: '', en: '' }, title: { tr: '', en: '' }, phone: '', email: '', profileUrl: '' };
  return { id, name: '', tagline: { tr: '', en: '' }, description: { tr: '', en: '' }, icon: '', category: { tr: '', en: '' }, platforms: [], webUrl: '', playStoreUrl: '', githubUrl: '', screenshots: [], features: { tr: [], en: [] } };
}

function validImport(value) {
  if (!value || typeof value !== 'object' || !value.profile || typeof value.profile.name !== 'string' || !safeEmail(value.profile.email)) return false;
  return sections.slice(1).every(section => Array.isArray(value[section]) && value[section].length <= 100);
}

export default function ContentEditor({ data, onSaveData, onResetData, onClose, onLogout, onPublish, lang }) {
  const [section, setSection] = useState('profile');
  const [draft, setDraft] = useState(() => structuredClone(data));
  const [selected, setSelected] = useState(0);
  const [notice, setNotice] = useState('');
  const [publishing, setPublishing] = useState(false);
  const fileInput = useRef(null);

  const list = Array.isArray(draft[section]) ? draft[section] : [];
  const item = list[selected];
  const dirty = JSON.stringify(draft) !== JSON.stringify(data);

  const updateProfile = (key, value) => setDraft(prev => ({ ...prev, profile: setPath(prev.profile, key, value) }));
  const updateItem = (key, value) => setDraft(prev => ({
    ...prev,
    [section]: prev[section].map((entry, index) => (index === selected ? setPath(entry, key, value) : entry)),
  }));

  const save = () => {
    if (!safeEmail(draft.profile.email)) {
      setNotice(lang === 'tr' ? 'Geçerli e-posta adresi girin.' : 'Enter a valid email address.');
      return;
    }
    onSaveData(draft);
    setNotice(lang === 'tr' ? 'Taslak bu tarayıcıya kaydedildi.' : 'Draft saved in this browser.');
  };

  const publish = async () => {
    if (!validImport(draft)) {
      setNotice(lang === 'tr' ? 'İçerik verileri geçersiz.' : 'Content data is invalid.');
      return;
    }
    setPublishing(true);
    setNotice(lang === 'tr' ? 'GitHub üzerinde yayımlanıyor…' : 'Publishing on GitHub…');
    try {
      await onPublish(draft);
      onSaveData(draft);
      setNotice(lang === 'tr' ? 'İçerik yayımlandı. Canlı sitede görünmesi birkaç dakika sürebilir.' : 'Content published. It may take a few minutes to appear on the live site.');
    } catch (error) {
      setNotice(
        error.message === 'live_publish_failed'
          ? (lang === 'tr' ? 'Kaynak güncellendi ancak canlı site güncellenemedi. Tekrar deneyin.' : 'Source updated but the live site was not. Try again.')
          : (lang === 'tr' ? 'Yayımlama başarısız oldu. Erişim anahtarının Contents yazma iznini kontrol edin.' : 'Publishing failed. Check the token’s Contents write permission.')
      );
    } finally {
      setPublishing(false);
    }
  };

  const add = () => {
    const newItem = blankItem(section);
    setDraft(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
    setSelected(list.length);
  };

  const remove = () => {
    if (!item || !window.confirm(lang === 'tr' ? 'Bu öğe silinsin mi?' : 'Delete this item?')) return;
    setDraft(prev => ({ ...prev, [section]: prev[section].filter((_, index) => index !== selected) }));
    setSelected(0);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-data.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const importJSON = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      setNotice('File exceeds 1 MB.');
      return;
    }
    try {
      const value = JSON.parse(await file.text());
      if (!validImport(value)) throw new Error('Invalid data');
      setDraft({ ...INITIAL_PORTFOLIO_DATA, ...value });
      setSection('profile');
      setSelected(0);
      setNotice(lang === 'tr' ? 'Yedek önizlemeye yüklendi. Kaydet ile onaylayın.' : 'Backup loaded for review. Select Save to confirm.');
    } catch {
      setNotice(lang === 'tr' ? 'Geçersiz yedek dosyası.' : 'Invalid backup file.');
    }
    event.target.value = '';
  };

  const renderField = (key, label, value, change, multiline = false) => (
    <label key={key} className="editor-field">
      {label}
      {multiline ? (
        <textarea rows="4" value={value ?? ''} onChange={e => change(key, e.target.value)} />
      ) : (
        <input value={value ?? ''} onChange={e => change(key, e.target.value)} />
      )}
    </label>
  );

  return (
    <div className="editor-layout">
      <div className="editor-top">
        <div>
          <span className="eyebrow">PRIVATE CONTENT STUDIO</span>
          <h1>{lang === 'tr' ? 'İçerik editörü' : 'Content editor'}<span className="title-dot">.</span></h1>
          <p>{lang === 'tr' ? 'Taslağı bu tarayıcıya kaydedebilir veya GitHub üzerinden canlı sitede anında yayımlayabilirsin.' : 'Save a local draft or publish directly to the live site through GitHub.'}</p>
        </div>
        <div className="editor-top-actions">
          <button className="action action-outline" onClick={onClose}>
            <ArrowLeft size={17} />{lang === 'tr' ? 'Siteye dön' : 'Back to site'}
          </button>
          <button className="admin-logout" onClick={onLogout}>
            <LogOut size={16} />{lang === 'tr' ? 'Çıkış yap' : 'Sign out'}
          </button>
        </div>
      </div>

      <div className="editor-toolbar">
        <span className={dirty ? 'editor-status dirty' : 'editor-status'}>
          {dirty ? (lang === 'tr' ? 'Kaydedilmemiş değişiklikler' : 'Unsaved changes') : (lang === 'tr' ? 'Taslak güncel' : 'Draft up to date')}
        </span>
        <div>
          <button onClick={exportJSON}><Download size={16} />JSON indir</button>
          <button onClick={() => fileInput.current?.click()}><Upload size={16} />JSON yükle</button>
          <input ref={fileInput} hidden type="file" accept="application/json,.json" onChange={importJSON} />
          <button className="save-btn" onClick={save}><Save size={16} />{lang === 'tr' ? 'Taslağı kaydet' : 'Save draft'}</button>
          <button className="publish-btn" onClick={publish} disabled={publishing}>
            <Upload size={16} />{publishing ? (lang === 'tr' ? 'Yayımlanıyor…' : 'Publishing…') : (lang === 'tr' ? 'Canlıda yayımla' : 'Publish live')}
          </button>
        </div>
      </div>

      {notice && <p className="editor-notice" role="status">{notice}</p>}

      <div className="editor-body">
        <aside className="editor-sidebar">
          <p>SECTIONS</p>
          {sections.map(name => (
            <button
              key={name}
              className={section === name ? 'selected' : ''}
              onClick={() => { setSection(name); setSelected(0); }}
            >
              {titles[lang][name]} <span>{name === 'profile' ? '01' : String(draft[name]?.length || 0).padStart(2, '0')}</span>
            </button>
          ))}
          <button
            className="reset-btn"
            onClick={() => {
              if (window.confirm(lang === 'tr' ? 'Yerel taslak sıfırlansın mı?' : 'Reset local draft?')) {
                onResetData();
                setDraft(structuredClone(INITIAL_PORTFOLIO_DATA));
                setNotice(lang === 'tr' ? 'Taslak sıfırlandı.' : 'Draft reset.');
              }
            }}
          >
            <RotateCcw size={15} />{lang === 'tr' ? 'Taslağı sıfırla' : 'Reset draft'}
          </button>
        </aside>

        <div className="editor-content">
          <div className="editor-section-heading">
            <div>
              <span className="eyebrow">EDIT / {section.toUpperCase()}</span>
              <h2>{titles[lang][section]}</h2>
            </div>
            {section !== 'profile' && (
              <button className="action action-primary" onClick={add}>
                <Plus size={16} />{lang === 'tr' ? 'Yeni ekle' : 'Add new'}
              </button>
            )}
          </div>

          {section === 'profile' ? (
            <div className="editor-fields">
              {[
                ['name', 'Ad / Name'],
                ['title.en', 'Unvan (EN)'],
                ['title.tr', 'Unvan (TR)'],
                ['location', 'Konum / Location'],
                ['email', 'E-posta / Email'],
                ['phone', 'Telefon / Phone'],
                ['linkedin', 'LinkedIn URL'],
                ['bio.tr', 'Biyografi (TR)'],
                ['bio.en', 'Biography (EN)'],
              ].map(([key, label]) => renderField(key, label, getPath(draft.profile, key), updateProfile, key.startsWith('bio.')))}
              {draft.profile.linkedin && !safeExternalUrl(draft.profile.linkedin) && (
                <p className="form-error">LinkedIn URL must start with https:// or http://</p>
              )}
            </div>
          ) : (
            <div className="editor-item-layout">
              <div className="editor-item-list">
                {list.map((entry, index) => (
                  <button
                    key={entry.id || index}
                    className={selected === index ? 'active' : ''}
                    onClick={() => setSelected(index)}
                  >
                    <strong>
                      {entry.name ||
                        entry.title ||
                        entry.company ||
                        (typeof entry.degree === 'object' ? entry.degree?.en : entry.degree) ||
                        getPath(entry, 'category.en') ||
                        `#${index + 1}`}
                    </strong>
                    <span>{entry.date || entry.school || (typeof entry.role === 'object' ? entry.role?.en : entry.role) || ''}</span>
                  </button>
                ))}
              </div>

              {item && (
                <div className="editor-item-fields">
                  <div className="editor-item-controls">
                    <span>ITEM {selected + 1} / {list.length}</span>
                    <button onClick={remove}><Trash2 size={15} />{lang === 'tr' ? 'Sil' : 'Delete'}</button>
                  </div>
                  {fields[section].map(([key, label]) =>
                    renderField(
                      key,
                      label,
                      Array.isArray(getPath(item, key)) ? getPath(item, key).join('\n') : getPath(item, key),
                      (path, value) =>
                        updateItem(
                          path,
                          path === 'tags' ? value.split('\n').map(v => v.trim()).filter(Boolean) : value
                        ),
                      key === 'tags'
                    )
                  )}
                  {['projects', 'experience'].includes(section) &&
                    ['en', 'tr'].map(locale =>
                      renderField(
                        `bullets.${locale}`,
                        `Details (${locale.toUpperCase()}, one per line)`,
                        (item.bullets?.[locale] || []).join('\n'),
                        (path, value) =>
                          updateItem(
                            path,
                            value.split('\n').map(v => v.trim()).filter(Boolean)
                          ),
                        true
                      )
                    )}
                  {section === 'apps' &&
                    ['en', 'tr'].map(locale =>
                      renderField(
                        `description.${locale}`,
                        `Description (${locale.toUpperCase()})`,
                        item.description?.[locale] || '',
                        updateItem,
                        true
                      )
                    )}
                  {section === 'apps' &&
                    ['playStoreUrl', 'githubUrl'].some(key => item[key] && !safeExternalUrl(item[key])) && (
                      <p className="form-error">Use a valid http:// or https:// URL.</p>
                    )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
