import { L } from '../lib/i18n';

// Field types:
// text, url, date (YYYY or YYYY-MM), bool, image,
// loc (one line per language), locArea (paragraph per language),
// locList (one line per item, per language), tags (one per line, per language),
// list (one per line, same in every language).

const cvFlag = { key: 'showOnCv', type: 'bool', label: { en: 'Show on CV', tr: 'CV’de göster' } };
const dates = [
  { key: 'start', type: 'date', label: { en: 'Start (YYYY-MM or YYYY)', tr: 'Başlangıç (YYYY-AA veya YYYY)' } },
  { key: 'end', type: 'date', label: { en: 'End (empty = present)', tr: 'Bitiş (boş = günümüz)' } },
];

export const SECTIONS = [
  {
    key: 'profile', kind: 'object', label: { en: 'Profile', tr: 'Profil' },
    fields: [
      { key: 'name', type: 'text', label: { en: 'Full name', tr: 'Ad soyad' } },
      { key: 'title', type: 'loc', label: { en: 'Title', tr: 'Unvan' } },
      { key: 'headline', type: 'locArea', label: { en: 'Hero sentence (site only)', tr: 'Giriş cümlesi (yalnız site)' } },
      { key: 'bio', type: 'locArea', label: { en: 'Summary (site + CV)', tr: 'Özet (site + CV)' }, rows: 7 },
      { key: 'location', type: 'loc', label: { en: 'Location', tr: 'Konum' } },
      { key: 'phone', type: 'text', label: { en: 'Phone', tr: 'Telefon' } },
      { key: 'email', type: 'text', label: { en: 'Email', tr: 'E-posta' } },
      { key: 'linkedin', type: 'url', label: { en: 'LinkedIn URL', tr: 'LinkedIn adresi' } },
      { key: 'github', type: 'url', label: { en: 'GitHub URL', tr: 'GitHub adresi' } },
      { key: 'avatar', type: 'image', label: { en: 'Profile photo', tr: 'Profil fotoğrafı' } },
    ],
  },
  {
    key: 'highlights', path: ['profile', 'highlights'], kind: 'list', label: { en: 'Highlights', tr: 'Öne çıkanlar' },
    title: (item, lang) => `${L(item.value, lang) || '—'} ${L(item.label, lang)}`,
    blank: () => ({ value: { en: '', tr: '' }, label: { en: '', tr: '' } }),
    fields: [
      { key: 'value', type: 'loc', label: { en: 'Value (e.g. 3rd, 6+)', tr: 'Değer (örn. 3., 6+)' } },
      { key: 'label', type: 'loc', label: { en: 'Label', tr: 'Etiket' } },
    ],
  },
  {
    key: 'experience', kind: 'list', label: { en: 'Experience', tr: 'Deneyim' },
    title: (item, lang) => `${L(item.role, lang) || '—'} · ${L(item.company, lang)}`,
    blank: () => ({ id: `exp_${Date.now()}`, role: { en: '', tr: '' }, company: { en: '', tr: '' }, location: { en: '', tr: '' }, start: '', end: '', bullets: { en: [], tr: [] }, showOnCv: true }),
    fields: [
      { key: 'role', type: 'loc', label: { en: 'Role', tr: 'Pozisyon' } },
      { key: 'company', type: 'loc', label: { en: 'Company', tr: 'Şirket' } },
      { key: 'location', type: 'loc', label: { en: 'Location', tr: 'Konum' } },
      ...dates,
      { key: 'bullets', type: 'locList', label: { en: 'Bullets (one per line)', tr: 'Maddeler (her satır bir madde)' } },
      cvFlag,
    ],
  },
  {
    key: 'projects', kind: 'list', label: { en: 'Projects & Leadership', tr: 'Projeler & Liderlik' },
    title: (item, lang) => `${L(item.role, lang) || '—'} · ${L(item.name, lang)}`,
    blank: () => ({ id: `proj_${Date.now()}`, role: { en: '', tr: '' }, name: { en: '', tr: '' }, subtitle: { en: '', tr: '' }, start: '', end: '', tags: [], bullets: { en: [], tr: [] }, showOnCv: true }),
    fields: [
      { key: 'role', type: 'loc', label: { en: 'Role', tr: 'Rol' } },
      { key: 'name', type: 'loc', label: { en: 'Team / project', tr: 'Takım / proje' } },
      { key: 'subtitle', type: 'loc', label: { en: 'Subtitle (optional)', tr: 'Alt başlık (isteğe bağlı)' } },
      ...dates,
      { key: 'bullets', type: 'locList', label: { en: 'Bullets (one per line)', tr: 'Maddeler (her satır bir madde)' } },
      { key: 'tags', type: 'tags', label: { en: 'Tags (site only, one per line)', tr: 'Etiketler (yalnız site, her satır bir)' } },
      cvFlag,
    ],
  },
  {
    key: 'education', kind: 'list', label: { en: 'Education', tr: 'Eğitim' },
    title: (item, lang) => L(item.school, lang) || '—',
    blank: () => ({ id: `edu_${Date.now()}`, school: { en: '', tr: '' }, degree: { en: '', tr: '' }, note: { en: '', tr: '' }, location: { en: '', tr: '' }, start: '', end: '', ongoing: false, showOnCv: true }),
    fields: [
      { key: 'school', type: 'loc', label: { en: 'School', tr: 'Okul' } },
      { key: 'degree', type: 'loc', label: { en: 'Degree / program', tr: 'Bölüm / program' } },
      { key: 'note', type: 'loc', label: { en: 'Note in brackets (optional)', tr: 'Parantez içi not (isteğe bağlı)' } },
      { key: 'location', type: 'loc', label: { en: 'Location', tr: 'Konum' } },
      { key: 'start', type: 'date', label: { en: 'Start (empty = show “Graduated: end”)', tr: 'Başlangıç (boş = “Mezuniyet: bitiş”)' } },
      { key: 'end', type: 'date', label: { en: 'End / graduation', tr: 'Bitiş / mezuniyet' } },
      { key: 'ongoing', type: 'bool', label: { en: 'Ongoing', tr: 'Devam ediyor' } },
      cvFlag,
    ],
  },
  {
    key: 'skills', kind: 'list', label: { en: 'Skills', tr: 'Yetkinlikler' },
    title: (item, lang) => L(item.category, lang) || '—',
    blank: () => ({ id: `skill_${Date.now()}`, category: { en: '', tr: '' }, tags: [], showOnCv: true }),
    fields: [
      { key: 'category', type: 'loc', label: { en: 'Category', tr: 'Kategori' } },
      { key: 'tags', type: 'tags', label: { en: 'Items (one per line)', tr: 'Öğeler (her satır bir)' } },
      cvFlag,
    ],
  },
  {
    key: 'languages', kind: 'list', label: { en: 'Languages', tr: 'Diller' },
    title: (item, lang) => `${L(item.name, lang) || '—'} · ${L(item.level, lang)}`,
    blank: () => ({ id: `lang_${Date.now()}`, name: { en: '', tr: '' }, level: { en: '', tr: '' } }),
    fields: [
      { key: 'name', type: 'loc', label: { en: 'Language', tr: 'Dil' } },
      { key: 'level', type: 'loc', label: { en: 'Level', tr: 'Seviye' } },
    ],
  },
  {
    key: 'references', kind: 'list', label: { en: 'References', tr: 'Referanslar' },
    title: item => item.name || '—',
    blank: () => ({ id: `ref_${Date.now()}`, name: '', role: { en: '', tr: '' }, organization: { en: '', tr: '' }, department: { en: '', tr: '' }, phone: '', email: '', profileUrl: '', showOnCv: true }),
    fields: [
      { key: 'name', type: 'text', label: { en: 'Name', tr: 'Ad' } },
      { key: 'role', type: 'loc', label: { en: 'Relation (optional)', tr: 'İlişki (isteğe bağlı)' } },
      { key: 'organization', type: 'loc', label: { en: 'Organization', tr: 'Kurum' } },
      { key: 'department', type: 'loc', label: { en: 'Department', tr: 'Bölüm' } },
      { key: 'phone', type: 'text', label: { en: 'Phone', tr: 'Telefon' } },
      { key: 'email', type: 'text', label: { en: 'Email', tr: 'E-posta' } },
      { key: 'profileUrl', type: 'url', label: { en: 'Profile URL', tr: 'Profil adresi' } },
      cvFlag,
    ],
  },
  {
    key: 'apps', kind: 'list', label: { en: 'Apps (site only)', tr: 'Uygulamalar (yalnız site)' },
    title: item => item.name || '—',
    blank: () => ({ id: `app_${Date.now()}`, name: '', category: { en: '', tr: '' }, tagline: { en: '', tr: '' }, description: { en: '', tr: '' }, icon: '', platforms: [], playStoreUrl: '', microsoftStoreUrl: '', webUrl: '', githubUrl: '', screenshots: [], features: { en: [], tr: [] }, version: '' }),
    fields: [
      { key: 'name', type: 'text', label: { en: 'Name', tr: 'Ad' } },
      { key: 'category', type: 'loc', label: { en: 'Category', tr: 'Kategori' } },
      { key: 'tagline', type: 'loc', label: { en: 'Tagline', tr: 'Kısa açıklama' } },
      { key: 'description', type: 'locArea', label: { en: 'Description', tr: 'Açıklama' } },
      { key: 'features', type: 'locList', label: { en: 'Features (one per line)', tr: 'Özellikler (her satır bir)' } },
      { key: 'platforms', type: 'list', label: { en: 'Platforms (one per line)', tr: 'Platformlar (her satır bir)' } },
      { key: 'icon', type: 'text', label: { en: 'Icon path (e.g. apps/x/icon.png) or URL', tr: 'İkon yolu (örn. apps/x/icon.png) veya URL' } },
      { key: 'screenshots', type: 'list', label: { en: 'Screenshot paths or URLs (one per line)', tr: 'Ekran görüntüsü yolları veya URL (her satır bir)' } },
      { key: 'playStoreUrl', type: 'url', label: { en: 'Google Play URL', tr: 'Google Play adresi' } },
      { key: 'microsoftStoreUrl', type: 'url', label: { en: 'Microsoft Store URL', tr: 'Microsoft Store adresi' } },
      { key: 'webUrl', type: 'url', label: { en: 'Website URL', tr: 'Web sitesi' } },
      { key: 'githubUrl', type: 'url', label: { en: 'GitHub URL', tr: 'GitHub adresi' } },
    ],
  },
  {
    key: 'cv', kind: 'object', label: { en: 'CV settings', tr: 'CV ayarları' },
    fields: [
      { key: 'fileName', type: 'text', label: { en: 'PDF file name (without _TR/_EN.pdf)', tr: 'PDF dosya adı (_TR/_EN.pdf olmadan)' } },
      { key: 'includeProjects', type: 'bool', label: { en: 'Include Projects & Leadership', tr: 'Projeler & Liderlik bölümünü ekle' } },
      { key: 'includeReferences', type: 'bool', label: { en: 'Include references', tr: 'Referansları ekle' } },
    ],
  },
];

export const sectionPath = section => section.path || [section.key];

export function getIn(obj, path) {
  return path.reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);
}

export function setIn(obj, path, value) {
  if (!path.length) return value;
  const [head, ...rest] = path;
  const base = Array.isArray(obj) ? [...obj] : { ...(obj || {}) };
  base[head] = setIn(base[head], rest, value);
  return base;
}
