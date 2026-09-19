// ==========================================================
// VIEW: FooterView
// Responsibility: Enterprise footer, official address, sister concerns, legal IDs
// ==========================================================

import React from 'react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const FooterView = ({ onOpenQuote }) => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <div className="logo-badge">ES</div>
              <div>
                <h3>ENGINEERING SOLUTIONS</h3>
                <span>ONE STOP SOLUTION PROVIDER</span>
              </div>
            </div>
            <p className="footer-desc">
              Pioneering Bangladesh's fire fighting, industrial mechanical, and LPG infrastructure with
              uncompromising safety, world-class tools, and global standard compliance since 2008.
            </p>
            <div className="footer-sister-concerns">
              <h4>Our Sister Concerns:</h4>
              <div className="sister-tags">
                <span>Apogee Consultancy Ltd</span>
                <span>Star Tech Engineering</span>
                <span>MUS Tech</span>
                <span>PABXBD</span>
                <span>RF Branding Ltd</span>
              </div>
            </div>

          </div>

          <div className="footer-nav-col">
            <h4>Engineering Sectors</h4>
            <ul>
              <li><a href="#services">UL/FM Fire Pumps</a></li>
              <li><a href="#services">Sprinkler & Hydrant Networks</a></li>
              <li><a href="#services">Clean Agent Gas Suppression</a></li>
              <li><a href="#services">Industrial Boilers & Piping</a></li>
              <li><a href="#services">Central LPG Reticulation</a></li>
              <li><a href="#estimator">Hydraulic Estimator</a></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4>Notable Megaprojects</h4>
            <ul>
              <li><a href="#projects">Beximco Pharmaceuticals</a></li>
              <li><a href="#projects">Radisson Blu & Sheraton Dhaka</a></li>
              <li><a href="#projects">Akij Food & Beverage</a></li>
              <li><a href="#projects">Renata Pharmaceuticals</a></li>
              <li><a href="#projects">Rampal Power Station</a></li>
              <li><a href="#projects">PHP Float Glass</a></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4>Headquarters & Contact</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>379, (3rd Floor) East Rampura, TV Center Road, Dhaka-1000, Bangladesh</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <div>
                  <a href="tel:+8801757809535">+880 1757-809535</a><br/>
                  <a href="tel:+8801745588794">+880 1745-588794</a>
                </div>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <a href="mailto:es_kalam@yahoo.com">es_kalam@yahoo.com</a>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <a href="mailto:muhtasimfuad3570@gmail.com">muhtasimfuad3570@gmail.com</a>
              </li>
            </ul>

            <button className="btn-primary quote-btn-full" onClick={() => onOpenQuote && onOpenQuote()}>
              Request Official Proposal <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Engineering Solutions. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Govt. Reg: TRAD/DNCC/038564/2022</span>
            <span>•</span>
            <span>TIN: 224377374870</span>
            <span>•</span>
            <span>BIN: 003667194-0101</span>
          </div>
        </div>

        {/* Developer Credit Centered at Bottom */}
        <div className="developer-credit-bar">
          <span className="dev-credit-text">
            <span>Designed &amp; Developed by</span>
            <a 
              href="https://www.linkedin.com/in/real-muhtasim-fuad/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="dev-credit-link"
            >
              MD. MUHTASIM FUAD
            </a>
            <span className="dev-credit-dot">•</span>
            <span className="dev-credit-uni">Computer Science Student at BRAC UNIVERSITY</span>
          </span>
        </div>
      </div>
    </footer>

  );
};
