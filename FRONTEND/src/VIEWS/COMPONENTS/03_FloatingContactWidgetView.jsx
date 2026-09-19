// ==========================================================
// VIEW: FloatingContactWidgetView
// Responsibility: Floating quick actions for phone, WhatsApp & instant quotation
// ==========================================================

import React, { useState, useEffect, useRef } from 'react';
import { PhoneCall, MessageCircle, FileSpreadsheet, X } from 'lucide-react';

export const FloatingContactWidgetView = ({ onOpenQuote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(30);
  const widgetRef = useRef(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll to avoid footer overlap
  useEffect(() => {
    const handleScroll = () => {
      // The user wants the widget to stop exactly in the gap above the "Request Official Proposal" button.
      const quoteBtn = document.querySelector('.quote-btn-full');
      if (quoteBtn) {
        const rect = quoteBtn.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight) {
          const visibleHeight = windowHeight - rect.top;
          // Set it to float 85px above the quote button's top when scrolled all the way down
          // to perfectly fit into the empty space beside the email list
          setBottomOffset(85 + visibleHeight);
        } else {
          // Normal bottom offset for mobile/desktop when not at the very bottom
          setBottomOffset(window.innerWidth <= 768 ? 20 : 30);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="floating-contact-container" 
      ref={widgetRef}
      style={{ bottom: `${bottomOffset}px`, transition: 'bottom 0.1s ease-out' }}
    >
      <div className={`floating-actions-menu ${isExpanded ? 'expanded' : ''}`}>
        <a
          href="tel:+8801757809535"
          className="floating-action-item call-action"
          title="Direct Phone Call"
        >
          <PhoneCall size={18} />
          <span>Call +880 1757-809535</span>
        </a>

        <a
          href="https://wa.me/8801757809535"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-action-item whatsapp-action"
          title="WhatsApp Chat"
        >
          <MessageCircle size={18} />
          <span>WhatsApp Immediate</span>
        </a>

        <button
          className="floating-action-item quote-action"
          onClick={() => {
            setIsExpanded(false);
            onOpenQuote();
          }}
        >
          <FileSpreadsheet size={18} />
          <span>Get Official Quote</span>
        </button>
      </div>

      <button
        className={`floating-main-trigger ${isExpanded ? 'active' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Contact Quick Menu"
      >
        {isExpanded ? <X size={24} /> : <PhoneCall size={22} />}
        {!isExpanded && <span className="pulse-beacon"></span>}
      </button>
    </div>
  );
};
