// ==========================================================
// VIEW: HeroView
// Responsibility: Hero presentation, high-impact headline, metrics and CTA triggers
// ==========================================================

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Award, CheckCircle, Calculator, Search, Send } from 'lucide-react';
import { Interactive3DFirePump } from '../COMPONENTS/Interactive3DFirePump';

export const HeroView = ({ onOpenQuote, onScrollToSection }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    if (query.includes('pump') || query.includes('boiler') || query.includes('valve') || query.includes('door') || query.includes('generator') || query.includes('equipment')) {
      onScrollToSection('equipment');
    } else if (query.includes('water') || query.includes('calc') || query.includes('gpm') || query.includes('reservoir') || query.includes('tank')) {
      onScrollToSection('estimator');
    } else {
      onScrollToSection('projects');
    }
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-glow-dot"></span>
              <ShieldCheck size={16} color="#E61C24" />
              <span>Premier B2B Engineering & Life Safety Enterprise</span>
            </div>

            <h1 className="hero-title">
              Engineering Safety & <br />
              <span className="text-highlight">Industrial Authority</span> <br />
              Across Bangladesh.
            </h1>

            <p className="hero-description">
              From Beximco Pharma and Radisson Blu to Rampal Power Station—we deliver NFPA-compliant 
              Fire Protection Networks, Industrial Steam Boilers, and Central LPG Reticulation 
              engineered with zero tolerance for failure.
            </p>

            <div className="hero-actions">
              <button className="btn-primary hero-btn-main" onClick={() => onOpenQuote()}>
                Request Official Proposal <ArrowRight size={18} />
              </button>
              <button 
                className="btn-secondary hero-btn-sub" 
                onClick={() => onScrollToSection('estimator')}
              >
                <Calculator size={18} /> Try Hydraulic Estimator
              </button>
            </div>

            {/* Microsoft-inspired Quick Discovery & Suggestion Bar */}
            <form className="hero-quick-search-box" onSubmit={handleSearchSubmit}>
              <Search size={18} color="var(--primary)" />
              <input 
                type="text" 
                className="hero-search-input"
                placeholder="Ask or search equipment, systems or mega projects (e.g. UL Fire Pump, Steam Boiler, Beximco)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="hero-search-btn" aria-label="Search">
                <Send size={15} />
              </button>
            </form>

            <div className="hero-quick-pills">
              <span className="pills-label">Quick Suggestions:</span>
              <button type="button" className="hero-pill-btn" onClick={() => onScrollToSection('estimator')}>
                📊 Calculate NFPA Water Tank
              </button>
              <button type="button" className="hero-pill-btn" onClick={() => onScrollToSection('equipment')}>
                🚒 UL/FM Fire Pumps & Boilers
              </button>
              <button type="button" className="hero-pill-btn" onClick={() => onScrollToSection('projects')}>
                🏢 Beximco & 50+ Client Sites
              </button>
              <button type="button" className="hero-pill-btn" onClick={() => onOpenQuote('Direct Executive Consultation')}>
                📞 Contact
              </button>
            </div>

            <div className="hero-metrics-bar">
              <div className="metric-item">
                <strong>50+</strong>
                <span>Mega Enterprise Sites</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <strong>2008</strong>
                <span>Pioneering Track Record</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <strong>100%</strong>
                <span>NFPA & BNBC Standard</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-card">
            <div className="visual-image-wrapper">
              <img src="/images/hero.jpg" alt="Engineering Solutions Mega Facility" />
              <div className="visual-floating-badge top">
                <Award size={20} color="#E61C24" />
                <div>
                  <h4>UL Listed & FM Approved</h4>
                  <p>Certified International Heavy Pumps</p>
                </div>
              </div>
              <div className="visual-floating-badge bottom">
                <CheckCircle size={20} color="#059669" />
                <div>
                  <h4>Turnkey EPC Delivery</h4>
                  <p>Design, Erection & Maintenance</p>
                </div>
              </div>
            </div>

            {/* Interactive 3D Fire Pump Equipment Model */}
            <Interactive3DFirePump />
          </div>
        </div>
      </div>
    </section>
  );
};
