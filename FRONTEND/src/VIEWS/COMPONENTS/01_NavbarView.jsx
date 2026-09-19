// ==========================================================
// VIEW: NavbarView
// Responsibility: Top utility bar, clean brand navigation, CTA trigger
// ==========================================================

import React, { useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';

export const NavbarView = ({ onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      {/* Top emergency / quick contact bar */}
      <div className="top-utility-bar">
        <div className="container">
          <div className="top-bar-inner">
            <div className="utility-left">
              <span className="bullet-dot"></span>
              <span>16+ Years of Proven Engineering & Fire Fighting Excellence</span>
            </div>
            <div className="utility-right">
              <span>Direct Hotline: <a href="tel:+8801757809535">+880 1757-809535</a></span>
              <span className="divider">|</span>
              <span>Official Email: <a href="mailto:es_kalam@yahoo.com">es_kalam@yahoo.com</a></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="main-navbar">
        <div className="container">
          <div className="navbar-content">
            <a href="#" className="brand-logo">
              <div className="logo-emblem">
                <span className="logo-initials">ES</span>
              </div>
              <div className="brand-titles">
                <span className="company-name">ENGINEERING SOLUTIONS</span>
                <span className="company-tagline">FIRE SAFETY & MECHANICAL ENTERPRISE</span>
              </div>
            </a>

            {/* Clean, Non-cluttered Classic Navigation Links */}
            <div className="nav-menu-desktop">
              <a href="#" className="nav-link">Home</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#equipment" className="nav-link">Equipment</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#estimator" className="nav-link">Estimator</a>
              <a href="#about" className="nav-link">About Us</a>
            </div>

            {/* Single Clear Action Button */}
            <div className="nav-actions-desktop">
              <button className="btn-primary quote-header-btn" onClick={onOpenQuote}>
                <PhoneCall size={16} /> Get a Quote
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="mobile-actions-group">
              <button
                className="mobile-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-dropdown animate-fade-in">
            <a href="#" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#equipment" onClick={() => setMobileMenuOpen(false)}>Equipment</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#estimator" onClick={() => setMobileMenuOpen(false)}>Estimator</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About Us</a>
            <button className="btn-primary" onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}>
              <PhoneCall size={16} /> Get a Quote
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
