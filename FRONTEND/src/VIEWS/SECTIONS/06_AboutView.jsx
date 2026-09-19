// ==========================================================
// VIEW: AboutView
// Responsibility: Corporate authority, MD statement, engineering team, and legal credentials
// ==========================================================

import React from 'react';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export const AboutView = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text-column">
            <div className="badge-pill">
              <ShieldCheck size={14} /> Established 2008
            </div>
            <h2 className="about-heading">
              A Premier "One-Stop Solution Provider" for Engineering & Protection
            </h2>
            <p className="about-lead">
              Founded in 2008 under the visionary leadership of <strong>Kh. Abul Kalam</strong> (Managing Director, 20+ Years Industry Experience), 
              <strong> Engineering Solutions</strong> has evolved into a nationwide benchmark for turnkey fire protection, 
              industrial mechanical systems, and LPG reticulation networks.
            </p>
            <p className="about-subtext">
              We bring an elite engineering cadre—graduates from top engineering institutions like <strong>KUET</strong>, B.Sc. Civil, Electrical, and CSE engineers—backed by a skilled technical force of over 100+ certified fitters, welders, and foremen.
            </p>

            <div className="stats-row">
              <div className="stat-card">
                <span className="stat-num">16+</span>
                <span className="stat-label">Years of Excellence</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">50+</span>
                <span className="stat-label">Mega Enterprise Projects</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">100+</span>
                <span className="stat-label">Skilled Technical Force</span>
              </div>
            </div>


          </div>

          <div className="about-feature-column">
            <div className="leadership-spotlight-card">
              <div className="md-badge">Managing Director's Statement</div>
              <div className="md-card-content">
                <div className="md-photo-wrapper">
                  <img 
                    src="/images/kalam_director.jpg" 
                    alt="Kh. Abul Kalam - Managing Director, Engineering Solutions" 
                    className="md-portrait-img"
                  />
                  <div className="md-exp-tag">20+ Yrs Exp</div>
                </div>
                <div className="md-text-area">
                  <blockquote className="md-quote">
                    "Our engineering team designs any facility to international and local standards, which will drive the best result to the utmost satisfaction of our client requirements. We never let our quality be questionable."
                  </blockquote>
                  <div className="md-meta">
                    <h4>Kh. Abul Kalam</h4>
                    <p>Founder & Managing Director</p>
                    <span className="md-affiliation">Engineering Solutions (Est. 2008)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="core-values-box">
              <h3>Core Pillars of Operations</h3>
              <div className="value-item">
                <CheckCircle2 size={20} color="#E61C24" />
                <div>
                  <strong>Human Life & Asset Preservation</strong>
                  <p>Zero tolerance for substandard fittings or unauthorized work on life safety systems.</p>
                </div>
              </div>
              <div className="value-item">
                <CheckCircle2 size={20} color="#E61C24" />
                <div>
                  <strong>International Code Compliance</strong>
                  <p>Strict adhesion to NFPA 13, 14, 20, 72 and BNBC standards in every millimeter of piping.</p>
                </div>
              </div>
              <div className="value-item">
                <CheckCircle2 size={20} color="#E61C24" />
                <div>
                  <strong>End-to-End In-House Equipment</strong>
                  <p>Dedicated TIG welding, pipe grooving, roller machines, and hydrostatic testing sets.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="certifications-section" style={{ marginTop: '4rem' }}>
          <div className="section-head" style={{ marginBottom: '2rem' }}>
            <div className="badge-pill">
              <Award size={14} /> Global Compliance
            </div>
            <h2 className="section-title">Certifications & Credentials</h2>
            <p className="section-subtitle">
              We operate under strict compliance with global and national regulatory bodies.
            </p>
          </div>
          <div className="cert-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <CertificationsLoader />
          </div>
        </div>

      </div>
    </section>
  );
};

const DEFAULT_CERTS = [
  { id: 1, title: "NFPA Certified Fire Protection Specialist", issuer: "NFPA International", year: "2022" },
  { id: 2, title: "ISO 9001:2015 Quality Management Standard", issuer: "ISO Certification", year: "2021" },
  { id: 3, title: "Department of Explosives Authorization", issuer: "Govt. of Bangladesh", year: "2023" }
];

const CertificationsLoader = () => {
  const [certs, setCerts] = React.useState(DEFAULT_CERTS);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return;
    }
    fetch('http://127.0.0.1:8000/api/certifications/')
      .then(res => {
        if (!res.ok) throw new Error('not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setCerts(data);
      })
      .catch(() => {
        // Keep DEFAULT_CERTS on offline/demo
      });
  }, []);

  const certList = Array.isArray(certs) ? certs : DEFAULT_CERTS;
  return certList.map(cert => (
    <div key={cert.id} className="cert-card" style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
      <Award size={48} color="var(--accent)" style={{ marginBottom: '1rem', opacity: 0.8 }} />
      <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{cert.title}</h4>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{cert.issuer} {cert.year && `(${cert.year})`}</p>
    </div>
  ));
};
