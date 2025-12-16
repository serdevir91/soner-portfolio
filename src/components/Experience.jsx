import React from 'react';

const experiences = [
    {
        company: "Deico Engineering Inc.",
        role: "Engineering Intern",
        location: "Ankara, Turkey", // CORRECTED LOCATION
        period: "Summer 2025",
        details: [
            "Contributed to mechanical design and analysis tasks in engineering projects.",
            "Assisted in CAD modeling, structural evaluations, and prototype development.",
            "Gained hands-on experience with CNC machining processes and manufacturing workflows."
        ]
    },
    {
        company: "Kristal Industry Inc.",
        role: "Engineering Intern",
        location: "Antalya, Turkey",
        period: "Summer 2024",
        details: [
            "Participated in mechanical production and quality control processes in a real manufacturing environment.",
            "Worked with technical documentation, CNC machining, and industrial assembly.",
            "Gained insights into lean manufacturing, workplace safety, and interdisciplinary communication on the shop floor."
        ]
    }
];

const Experience = () => {
    return (
        <section className="section">
            <h2 className="section-title">PROFESSIONAL EXPERIENCE</h2>
            <div>
                {experiences.map((exp, index) => (
                    <div key={index} style={{ marginBottom: '1rem' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            marginBottom: '0.25rem'
                        }}>
                            <div>
                                <span style={{ fontWeight: '700', fontSize: '1.05rem' }}>{exp.company}</span>
                                <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>|</span>
                                <span style={{ fontStyle: 'italic' }}>{exp.role}</span>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                {exp.location} | {exp.period}
                            </div>
                        </div>
                        <ul style={{
                            paddingLeft: '1.2rem',
                            fontSize: '0.95rem',
                            color: 'var(--text-main)',
                            lineHeight: '1.4'
                        }} className="compact-list">
                            {exp.details.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
