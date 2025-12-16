import React from 'react';
import { Mail, Linkedin, Phone, MapPin } from 'lucide-react';

const Hero = () => {
    return (
        <header style={{
            borderBottom: '2px solid var(--text-main)',
            paddingBottom: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
        }}>
            <div>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    lineHeight: '1',
                    marginBottom: '0.5rem',
                    letterSpacing: '-1px'
                }}>
                    Soner Erdevir
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                    Mechanical Engineering Student
                </p>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <div style={contactRow}>
                    <a href="mailto:sonererdevir@gmail.com">sonererdevir@gmail.com</a>
                    <Mail size={14} />
                </div>
                <div style={contactRow}>
                    <a href="tel:+905441230119">+90 544 123 01 19</a>
                    <Phone size={14} />
                </div>
                <div style={contactRow}>
                    <a href="https://www.linkedin.com/in/soner-erdevir" target="_blank" rel="noopener noreferrer">
                        linkedin.com/in/soner-erdevir
                    </a>
                    <Linkedin size={14} />
                </div>
                <div style={contactRow}>
                    <span>Antalya, Turkey</span>
                    <MapPin size={14} />
                </div>
            </div>
        </header>
    );
};

const contactRow = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    color: 'var(--text-main)'
};

export default Hero;
