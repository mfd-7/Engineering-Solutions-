// ==========================================================
// VIEW: CertificationsMarqueeView
// Responsibility: Marquee of international safety certifications & global brands
// ==========================================================

import React, { useState, useEffect } from 'react';
import { Award, CheckCheck, Shield } from 'lucide-react';

export const CertificationsMarqueeView = () => {
  const certifications = [
    { name: 'NFPA', label: 'National Fire Protection Assoc.', color: '#E61C24' },
    { name: 'UL LISTED', label: 'Underwriters Laboratories', color: '#0B3B60' },
    { name: 'FM APPROVED', label: 'Factory Mutual Global', color: '#0B3B60' },
    { name: 'ULC', label: 'Underwriters Lab Canada', color: '#0B3B60' },
    { name: 'CE MARK', label: 'Conformité Européene', color: '#0B3B60' },
    { name: 'LPCB', label: 'Loss Prevention Cert. Board', color: '#E61C24' },
    { name: 'VdS', label: 'VdS Schadenverhütung', color: '#0B3B60' },
    { name: 'ISO 9001', label: 'Quality Management System', color: '#0B3B60' },
  ];

  const defaultClientLogos = [
    "Beximco Pharma", "Hotel Sheraton", "Radisson Blu", "Akij Group", 
    "Renata Ltd", "ACME Laboratories", "Meghna Group", "Bashundhara", 
    "Dhaka Bank", "Asian Paints", "Seven Rings Cement", "PHP Group", 
    "Anwar Landmark", "TK Group", "Infinia Group", "Borak Real Estate"
  ];

  const brandPartners = [
    "NAFFCO", "Honeywell", "Patterson Pumps", "Grundfos", "Bristol", 
    "Simplex", "Clarke Engines", "Sempa", "SFFECO", "Shield", "SRI"
  ];

  const [clientLogos, setClientLogos] = useState(defaultClientLogos);

  useEffect(() => {
    try {
      const leads = JSON.parse(localStorage.getItem('es_leads') || '[]');
      const acceptedCompanies = leads
        .filter(lead => lead.status === 'accepted' && lead.company)
        .map(lead => lead.company);
      
      if (acceptedCompanies.length > 0) {
        setClientLogos(prev => [...new Set([...acceptedCompanies, ...prev])]);
      }
    } catch (e) {
      console.error('Failed to load accepted leads for marquee');
    }
  }, []);

  return (
    <section className="credibility-section">
      <div className="certs-bar">
        <div className="container">
          <div className="certs-header">
            <Shield size={16} color="#E61C24" />
            <span>INTERNATIONAL SAFETY & QUALITY COMPLIANCE STANDARDS</span>
          </div>
          <div className="certs-grid">
            {certifications.map((cert, idx) => (
              <div key={idx} className="cert-badge-item">
                <span className="cert-symbol" style={{ borderColor: cert.color, color: cert.color }}>
                  {cert.name}
                </span>
                <span className="cert-desc">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="brands-marquee-wrap">
        <div className="container">
          <div className="marquee-caption">
            <Award size={16} color="#0B3B60" /> AUTHORIZED GLOBAL BRANDS
          </div>
        </div>
        <div className="marquee-track">
          <div className="marquee-content">
            {brandPartners.concat(brandPartners).map((brand, i) => (
              <div key={i} className="brand-pill">
                <span className="brand-dot"></span>
                <span className="brand-name">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="clients-marquee-wrap">
        <div className="container">
          <div className="marquee-caption">
            <CheckCheck size={16} color="#059669" /> TRUSTED BY INDUSTRY LEADERS & CONGLOMERATES
          </div>
        </div>
        <div className="marquee-track reverse">
          <div className="marquee-content">
            {clientLogos.concat(clientLogos).map((client, i) => (
              <div key={i} className="client-pill">
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
