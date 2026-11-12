import { Document, Page, Text, View, Link, StyleSheet, Font } from '@react-pdf/renderer';

const fontBase = `${import.meta.env.BASE_URL}fonts/`;
Font.register({
  family: 'Roboto',
  fonts: [
    { src: `${fontBase}Roboto-Regular.ttf` },
    { src: `${fontBase}Roboto-Italic.ttf`, fontStyle: 'italic' },
    { src: `${fontBase}Roboto-Medium.ttf`, fontWeight: 500 },
    { src: `${fontBase}Roboto-Bold.ttf`, fontWeight: 700 },
  ],
});
// Keep words whole; the default hyphenation splits Turkish words badly.
Font.registerHyphenationCallback(word => [word]);

const ink = '#111111';
const s = StyleSheet.create({
  page: { fontFamily: 'Roboto', fontSize: 9.3, color: ink, paddingTop: 32, paddingBottom: 30, paddingHorizontal: 42, lineHeight: 1.3 },
  name: { fontSize: 21, lineHeight: 1.15, textAlign: 'center', letterSpacing: 0.6 },
  title: { fontSize: 11, lineHeight: 1.3, fontWeight: 500, textAlign: 'center', marginTop: 2 },
  contactRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop: 4, fontSize: 8.6, lineHeight: 1.3 },
  contactSep: { paddingHorizontal: 6 },
  link: { color: ink, textDecoration: 'none' },
  headRule: { borderBottomWidth: 1.6, borderBottomColor: ink, marginTop: 7 },
  section: { marginTop: 9 },
  sectionTitle: { fontSize: 10.4, lineHeight: 1.3, fontWeight: 500, paddingBottom: 1.5, borderBottomWidth: 1, borderBottomColor: ink, marginBottom: 4 },
  text: { textAlign: 'justify' },
  entry: { marginBottom: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  heading: { fontSize: 9.8, flex: 1, paddingRight: 10 },
  date: { fontSize: 9.8 },
  sub: { fontStyle: 'italic', flex: 1, paddingRight: 10 },
  subRight: { fontStyle: 'italic' },
  subtitle: { fontWeight: 500 },
  bullet: { flexDirection: 'row', marginTop: 0.8, paddingLeft: 6 },
  dot: { width: 10 },
  bulletText: { flex: 1 },
  skillLine: { marginBottom: 1.5 },
  bold: { fontWeight: 500 },
  ref: { marginBottom: 5, fontSize: 8.6 },
  refName: { fontSize: 9.3 },
});

function Bullet({ text }) {
  return (
    <View style={s.bullet} wrap={false}>
      <Text style={s.dot}>•</Text>
      <Text style={s.bulletText}>{text}</Text>
    </View>
  );
}

// The heading block and the first bullet stay on the same page.
function Entry({ entry }) {
  const [first, ...rest] = entry.bullets;
  return (
    <View style={s.entry}>
      <View wrap={false}>
        <View style={s.row}>
          <Text style={s.heading}>{entry.heading}</Text>
          {entry.date ? <Text style={s.date}>{entry.date}</Text> : null}
        </View>
        {entry.sub || entry.subRight ? (
          <View style={s.row}>
            <Text style={s.sub}>{entry.sub}</Text>
            {entry.subRight ? <Text style={s.subRight}>{entry.subRight}</Text> : null}
          </View>
        ) : null}
        {entry.subtitle ? <Text style={s.subtitle}>{entry.subtitle}</Text> : null}
        {first ? <Bullet text={first} /> : null}
      </View>
      {rest.map((b, i) => <Bullet key={i} text={b} />)}
    </View>
  );
}

function Section({ section }) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle} minPresenceAhead={40}>{section.title}</Text>
      {section.text ? <Text style={s.text}>{section.text}</Text> : null}
      {section.entries?.map((e, i) => <Entry key={i} entry={e} />)}
      {section.lines?.map((l, i) => (
        <Text key={i} style={s.skillLine}>
          <Text style={s.bold}>{l.label}: </Text>
          {l.text}
        </Text>
      ))}
      {section.refs?.map((r, i) => (
        <View key={i} style={s.ref} wrap={false}>
          <Text style={s.refName}>
            <Text style={s.bold}>{r.name}</Text>
            {r.role ? ` (${r.role})` : ''}
          </Text>
          {r.org ? <Text>{r.org}</Text> : null}
          {r.contact ? <Text>{r.contact}</Text> : null}
        </View>
      ))}
    </View>
  );
}

export default function CvPdf({ cv, author }) {
  return (
    <Document title={`${author} – CV`} author={author} creator={author} producer={author}>
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{cv.name}</Text>
        {cv.title ? <Text style={s.title}>{cv.title}</Text> : null}
        <View style={s.contactRow}>
          {cv.contact.map((c, i) => (
            <View key={i} style={{ flexDirection: 'row' }}>
              {i > 0 ? <Text style={s.contactSep}>|</Text> : null}
              {c.href ? <Link src={c.href} style={s.link}><Text>{c.text}</Text></Link> : <Text>{c.text}</Text>}
            </View>
          ))}
        </View>
        <View style={s.headRule} />
        {cv.sections.map(section => <Section key={section.key} section={section} />)}
      </Page>
    </Document>
  );
}
