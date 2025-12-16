import React from 'react';

const projects = [
    {
        title: "YILKAT Electric Vehicle Team",
        role: "Mechanical Design Member",
        period: "2024 – Present",
        desc: "TÜBİTAK Efficiency Challenge",
        details: [
            "Led the design and manufacturing of mechanical systems (chassis, drivetrain, suspension) for a high-efficiency electric vehicle.",
            "Oversaw CAD modeling, FEA simulations, and physical assembly.",
            "Coordinated the mechanical team and ensured successful integration with electrical and control systems."
        ]
    },
    {
        title: "UMAY Electromobile Team",
        role: "Mechanical Design Member",
        period: "2023 – 2024",
        desc: "TÜBİTAK Efficiency Challenge",
        details: [
            "Contributed to the aerodynamic shell design and carbon fiber body fabrication of a concept EV prototype.",
            "Collaborated on lightweight structural components and chassis integration."
        ]
    },
    {
        title: "WAST Electromobile Team",
        role: "Chassis Designer",
        period: "2022 – 2023",
        desc: "TÜBİTAK Efficiency Challenge",
        details: [
            "Designed and modeled the tubular frame and mounting system.",
            "Focused on safety, weight optimization, and durability in the early design phase."
        ]
    }
];

const Projects = () => {
    return (
        <section className="section">
            <h2 className="section-title">PROJECTS & LEADERSHIP</h2>
            <div>
                {projects.map((project, index) => (
                    <div key={index} style={{ marginBottom: '1rem' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            marginBottom: '0.25rem'
                        }}>
                            <div>
                                <span style={{ fontWeight: '700', fontSize: '1.05rem' }}>{project.title}</span>
                                <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>|</span>
                                <span style={{ fontStyle: 'italic' }}>{project.role}</span>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                {project.period}
                            </div>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '0.25rem', fontWeight: '500' }}>
                            {project.desc}
                        </div>
                        <ul style={{
                            paddingLeft: '1.2rem',
                            fontSize: '0.95rem',
                            color: 'var(--text-main)',
                            lineHeight: '1.4'
                        }} className="compact-list">
                            {project.details.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
