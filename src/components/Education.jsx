import React from 'react';

const education = [
    {
        school: "Akdeniz University",
        degree: "B.Sc. in Mechanical Engineering",
        location: "Antalya, Turkey",
        period: "Expected: 2026"
    },
    {
        school: "Berlitz Language Academy",
        degree: "Intensive English Training",
        location: "Istanbul, Turkey",
        period: "May 2025 – Present"
    },
    {
        school: "Ceyhan Eczacı Bahattin Sevinç Erdinç Science High School",
        degree: "High School Diploma",
        location: "Adana, Turkey",
        period: "2021"
    }
];

const Education = () => {
    return (
        <section className="section">
            <h2 className="section-title">EDUCATION</h2>
            <div>
                {education.map((edu, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                        borderBottom: '1px dashed var(--border)',
                        paddingBottom: '0.25rem'
                    }}>
                        <div>
                            <div style={{ fontWeight: '700' }}>{edu.school}</div>
                            <div style={{ fontSize: '0.9rem' }}>{edu.degree}</div>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <div>{edu.location}</div>
                            <div>{edu.period}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
