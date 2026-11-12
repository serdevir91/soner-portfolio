import { L, UI, upper, formatRange, displayUrl } from '../lib/i18n';

const visible = list => (Array.isArray(list) ? list.filter(item => item && item.showOnCv !== false) : []);
const bulletsOf = (item, lang) => {
  const list = item.bullets?.[lang] || item.bullets?.en || [];
  return list.map(b => b.trim()).filter(Boolean);
};

// Turns the portfolio data into a plain CV structure. The HTML preview and
// the PDF both render this, so they always show the same content.
export function buildCv(data, lang) {
  const tx = UI[lang] || UI.en;
  const p = data.profile || {};
  const cvSettings = data.cv || {};

  const contact = [
    { text: L(p.location, lang) },
    p.phone && { text: p.phone, href: `tel:${p.phone.replace(/\s+/g, '')}` },
    p.email && { text: p.email, href: `mailto:${p.email}` },
    p.linkedin && { text: displayUrl(p.linkedin), href: p.linkedin },
  ].filter(c => c && c.text);

  const sections = [];

  const summary = L(p.bio, lang);
  if (summary) sections.push({ key: 'summary', title: upper(tx.summary, lang), text: summary });

  const experience = visible(data.experience).map(e => ({
    heading: upper(L(e.role, lang), lang),
    date: formatRange(e, lang),
    sub: L(e.company, lang),
    subRight: L(e.location, lang),
    bullets: bulletsOf(e, lang),
  }));
  if (experience.length) sections.push({ key: 'experience', title: upper(tx.workExperience, lang), entries: experience });

  if (cvSettings.includeProjects !== false) {
    const projects = visible(data.projects).map(pr => ({
      heading: upper([L(pr.role, lang), L(pr.name, lang)].filter(Boolean).join(' – '), lang),
      date: formatRange(pr, lang),
      subtitle: L(pr.subtitle, lang),
      bullets: bulletsOf(pr, lang),
    }));
    if (projects.length) sections.push({ key: 'projects', title: upper(tx.projectsLeadership, lang), entries: projects });
  }

  const education = visible(data.education).map(ed => {
    const degree = L(ed.degree, lang);
    const note = L(ed.note, lang);
    return {
      heading: upper(L(ed.school, lang), lang),
      date: formatRange(ed, lang),
      sub: note ? `${degree} (${note})` : degree,
      subRight: L(ed.location, lang),
      bullets: [],
    };
  });
  if (education.length) sections.push({ key: 'education', title: upper(tx.education, lang), entries: education, compact: true });

  const lines = visible(data.skills).map(s => ({
    label: L(s.category, lang),
    text: (s.tags || []).map(t => L(t, lang)).filter(Boolean).join(', '),
  }));
  const languages = (data.languages || []).map(l => `${L(l.name, lang)} (${L(l.level, lang)})`).join(', ');
  if (languages) lines.push({ label: tx.foreignLanguages, text: languages });
  if (lines.length) sections.push({ key: 'skills', title: upper(tx.technicalSkills, lang), lines });

  if (cvSettings.includeReferences !== false) {
    const refs = visible(data.references).map(r => {
      const role = L(r.role, lang);
      const org = [L(r.organization, lang), L(r.department, lang)].filter(Boolean).join(', ');
      const contactParts = [
        r.phone && `${lang === 'tr' ? 'Tel' : 'Phone'}: ${r.phone}`,
        r.email && `${lang === 'tr' ? 'E-posta' : 'Email'}: ${r.email}`,
        r.profileUrl && `${lang === 'tr' ? 'Profil' : 'Profile'}: ${displayUrl(r.profileUrl)}`,
      ].filter(Boolean);
      return { name: r.name, role, org, contact: contactParts.join(' | ') };
    });
    if (refs.length) sections.push({ key: 'references', title: upper(tx.references, lang), refs });
  }

  return {
    name: upper(p.name || '', lang),
    title: L(p.title, lang),
    contact,
    sections,
  };
}

export function cvFileName(data, lang) {
  const base = (data.cv?.fileName || data.profile?.name || 'CV').replace(/[^\w.-]+/g, '_');
  return `${base}_${lang.toUpperCase()}.pdf`;
}
