// ==========================================================
// VIEW: HomeView (Composite Master View)
// MVC Role: Assembles all sub-views and routes user interaction events
// ==========================================================

import React, { useState } from 'react';
import { HeroView } from './SECTIONS/01_HeroView';
import { CertificationsMarqueeView } from './COMPONENTS/02_CertificationsMarqueeView';
import { ServicesView } from './SECTIONS/02_ServicesView';
import { EstimatorView } from './SECTIONS/03_EstimatorView';
import { EquipmentCatalogView } from './SECTIONS/04_EquipmentCatalogView';
import { ProjectGalleryView } from './SECTIONS/05_ProjectGalleryView';
import { AboutView } from './SECTIONS/06_AboutView';
import { CtaBannerView } from './SECTIONS/07_CtaBannerView';
import { FloatingContactWidgetView } from './COMPONENTS/03_FloatingContactWidgetView';
import { QuoteModalView } from './MODALS/01_QuoteModalView';

export const HomeView = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteSubject, setQuoteSubject] = useState('');

  const handleOpenQuote = (subject = '') => {
    setQuoteSubject(subject);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
    setQuoteSubject('');
  };

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-view-container">
      {/* 1. Hero Section */}
      <HeroView 
        onOpenQuote={() => handleOpenQuote('Turnkey Project Consultation')} 
        onScrollToSection={handleScrollToSection}
      />

      {/* 2. Certifications & Brands Marquee */}
      <CertificationsMarqueeView />

      {/* 3. Turnkey Services */}
      <ServicesView 
        onOpenQuoteWithService={(svcName) => handleOpenQuote(svcName)} 
      />

      {/* 4. Smart Interactive Hydraulic & Fire Reservoir Estimator */}
      <EstimatorView 
        onOpenQuoteWithSpecs={(specs) => handleOpenQuote(specs)} 
      />

      {/* 5. Physical Equipment & Machinery Catalog */}
      <EquipmentCatalogView 
        onOpenQuoteWithEquipment={(eqName) => handleOpenQuote(eqName)} 
      />

      {/* 6. Dynamic 50+ Mega Projects Showcase (Factory & Observer Pattern) */}
      <ProjectGalleryView 
        onOpenQuoteWithProject={(projectName) => handleOpenQuote(`Inquiry regarding project: ${projectName}`)} 
      />

      {/* 7. Leadership, Team & Official Credentials */}
      <AboutView />

      {/* 8. Call to Action Banner */}
      <CtaBannerView 
        onOpenQuote={() => handleOpenQuote('Facility Site Inspection & Audit')} 
      />

      {/* 9. Floating Quick Contact & WhatsApp Widget */}
      <FloatingContactWidgetView 
        onOpenQuote={() => handleOpenQuote('Emergency Quote Request')} 
      />

      {/* 10. Automated Lead Quotation Modal */}
      <QuoteModalView 
        isOpen={isQuoteOpen} 
        onClose={handleCloseQuote} 
        defaultSubject={quoteSubject} 
      />
    </div>
  );
};

export default HomeView;
