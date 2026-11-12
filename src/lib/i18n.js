// Text helpers shared by the site, the CV page, the PDF and the editor.
// Any text field may be a plain string or an object such as { en, tr }.

export const LANGS = ['en', 'tr'];

export function L(value, lang) {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  return value[lang] || value.en || value.tr || '';
}

export function upper(text, lang) {
  return (text || '').toLocaleUpperCase(lang === 'tr' ? 'tr-TR' : 'en-US');
}

const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
};

const SHORT = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  tr: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
};

// "2025-07" -> "July 2025", "2025" -> "2025"
export function formatMonth(value, lang, short = false) {
  if (!value) return '';
  const [year, month] = String(value).split('-');
  const index = Number(month) - 1;
  if (!month || Number.isNaN(index) || index < 0 || index > 11) return year;
  return `${(short ? SHORT : MONTHS)[lang === 'tr' ? 'tr' : 'en'][index]} ${year}`;
}

// Builds the date label of an entry from start / end / ongoing.
// No start and an end: "Graduated: 2026". No end: "2026 – Present".
export function formatRange(item, lang, short = false) {
  const tx = UI[lang] || UI.en;
  const start = formatMonth(item.start, lang, short);
  const end = formatMonth(item.end, lang, short);
  if (!start && end) return `${tx.graduated}: ${end}`;
  if (start && !end) return `${start} – ${tx.present}`;
  if (!start && !end) return '';
  const range = start === end ? start : `${start} – ${end}`;
  return item.ongoing ? `${range} (${tx.ongoing})` : range;
}

export function isCurrent(item) {
  return Boolean(item.start) && !item.end;
}

export const UI = {
  en: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects & Leadership',
    projectsShort: 'Projects',
    apps: 'Software',
    skills: 'Skills',
    education: 'Education',
    references: 'References',
    contact: 'Contact',
    present: 'Present',
    ongoing: 'Ongoing',
    graduated: 'Graduated',
    now: 'Now',
    currently: 'Currently',
    at: 'at',
    downloadCv: 'Download CV',
    viewCv: 'View CV',
    cvTurkish: 'Turkish CV (PDF)',
    cvEnglish: 'English CV (PDF)',
    preparing: 'Preparing PDF…',
    getInTouch: 'Get in touch',
    contactLead: 'Open to R&D, mechanical design and simulation roles, and to building tools that make engineering work faster.',
    sendEmail: 'Send an email',
    call: 'Call',
    summary: 'Professional Summary',
    workExperience: 'Work Experience',
    projectsLeadership: 'Projects & Leadership',
    technicalSkills: 'Technical Skills & Languages',
    languages: 'Languages',
    foreignLanguages: 'Languages',
    showMore: 'Show details',
    showLess: 'Hide details',
    appsLead: 'Besides engineering, I build and publish apps and tools — from stores to self-hosted software.',
    source: 'Source',
    website: 'Website',
    features: 'Features',
    close: 'Close',
    back: 'Back to site',
    edit: 'Edit content',
    theme: 'Theme',
    language: 'Language',
    builtWith: 'Content and CV come from one data file.',
    phone: 'Phone',
    email: 'Email',
    profile: 'Profile',
    menu: 'Menu',
  },
  tr: {
    about: 'Hakkımda',
    experience: 'Deneyim',
    projects: 'Projeler & Liderlik',
    projectsShort: 'Projeler',
    apps: 'Yazılım',
    skills: 'Yetkinlikler',
    education: 'Eğitim',
    references: 'Referanslar',
    contact: 'İletişim',
    present: 'Günümüz',
    ongoing: 'Devam Ediyor',
    graduated: 'Mezuniyet',
    now: 'Şu an',
    currently: 'Şu anda',
    at: '',
    downloadCv: 'CV İndir',
    viewCv: 'CV Görüntüle',
    cvTurkish: 'Türkçe CV (PDF)',
    cvEnglish: 'İngilizce CV (PDF)',
    preparing: 'PDF hazırlanıyor…',
    getInTouch: 'İletişime geçin',
    contactLead: 'Ar-Ge, mekanik tasarım ve simülasyon rollerine; mühendislik işini hızlandıran araçlar geliştirmeye açığım.',
    sendEmail: 'E-posta gönder',
    call: 'Ara',
    summary: 'Profesyonel Özet',
    workExperience: 'İş Deneyimi',
    projectsLeadership: 'Projeler ve Liderlik',
    technicalSkills: 'Teknik Yetkinlikler ve Diller',
    languages: 'Diller',
    foreignLanguages: 'Yabancı Diller',
    showMore: 'Detayları göster',
    showLess: 'Detayları gizle',
    appsLead: 'Mühendisliğin yanında uygulama ve araçlar geliştirip yayınlıyorum; mağaza uygulamalarından kendi sunucunuzda çalışan yazılımlara kadar.',
    source: 'Kaynak kod',
    website: 'Web sitesi',
    features: 'Özellikler',
    close: 'Kapat',
    back: 'Siteye dön',
    edit: 'İçeriği düzenle',
    theme: 'Tema',
    language: 'Dil',
    builtWith: 'Site ve CV tek bir veri dosyasından üretilir.',
    phone: 'Telefon',
    email: 'E-posta',
    profile: 'Profil',
    menu: 'Menü',
  },
};

export function displayUrl(url) {
  return (url || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function assetUrl(path) {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\.?\//, '')}`;
}
