import React from 'react';
import Section from './Section';

const Profile = () => {
    return (
        <Section id="profile" title="About Me">
            <div className="glass-card">
                <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
                    A highly motivated and results-oriented <span className="gradient-text" style={{ fontWeight: 'bold' }}>Mechanical Engineering student</span> with hands-on experience in vehicle design, analysis, and manufacturing.
                    Proven leadership as Mechanical Division Captain in national competitions such as the TÜBİTAK Efficiency Challenge.
                    Skilled in CAD modeling, mechanical testing, and cross-functional teamwork, with a passion for developing innovative and sustainable mobility systems.
                </p>
            </div>
        </Section>
    );
};

export default Profile;
