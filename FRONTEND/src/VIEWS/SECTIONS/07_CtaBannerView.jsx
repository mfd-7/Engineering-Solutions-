// ==========================================================
// VIEW: CtaBannerView
// Responsibility: Bottom call to action banner
// ==========================================================

import React from 'react';
import { PhoneCall } from 'lucide-react';

export const CtaBannerView = ({ onOpenQuote }) => {
  return (
    <section className="cta-banner-section">
      <div className="container">
        <div className="cta-banner-card">
          <div className="cta-banner-content">
            <h2>Need Turnkey Engineering or Fire Protection for Your Facility?</h2>
            <p>
              Our senior engineering team (KUET, Civil, Electrical & Mechanical) conducts site inspections 
              and prepares code-compliant design drawings and bills of quantities.
            </p>
          </div>
          <div className="cta-banner-actions">
            <button className="btn-primary cta-btn-main" onClick={() => onOpenQuote()}>
              <PhoneCall size={18} /> Consult Our Managing Director
            </button>
            <a href="tel:+8801757809535" className="btn-outline-white">
              Direct: +880 1757-809535
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
