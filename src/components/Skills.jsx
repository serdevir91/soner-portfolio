import React from 'react';

const skillsData = {
    "CAD & Design": ["SolidWorks", "AutoCAD", "Fusion 360", "Mechanical Design"],
    "Simulation": ["ANSYS", "Solidworks Simulation", "FEA Analysis"],
    "Programming": ["MATLAB", "Python", "MS Office"],
    "Manufacturing": ["CNC Machining", "3D Printing", "Workshop Safety"],
    "Languages": ["Turkish (Native)", "English (B2 - Intensive Training)"]
};

const Skills = () => {
    return (
        <section className="section">
            <h2 className="section-title">SKILLS</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)', /* 3 Columns for density */
                gap: '1rem',
                fontSize: '0.9rem'
            }}>
                {Object.entries(skillsData).map(([category, items]) => (
                    <div key={category}>
                        <h3 style={{
                            fontSize: '0.95rem',
                            fontWeight: '700',
                            marginBottom: '0.25rem',
                            color: 'var(--primary)'
                        }}>
                            {category}
                        </h3>
                        <ul className="compact-list" style={{ listStyle: 'none' }}>
                            {items.map((skill, i) => (
                                <li key={i} style={{ color: 'var(--text-muted)' }}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
