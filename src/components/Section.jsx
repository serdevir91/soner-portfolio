import React from 'react';

const Section = ({ id, title, children, className = '' }) => {
    return (
        <section id={id} className={`section ${className}`}>
            <div className="container">
                {title && (
                    <h2 className="section-title" style={{
                        fontSize: '2.5rem',
                        marginBottom: '3rem',
                        textAlign: 'center'
                    }}>
                        <span className="gradient-text">{title}</span>
                    </h2>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
