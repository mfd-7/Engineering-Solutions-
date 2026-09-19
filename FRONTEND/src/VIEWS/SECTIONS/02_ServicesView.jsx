// ==========================================================
// VIEW: ServicesView
// Responsibility: Turnkey engineering capabilities and discipline tabs
// ==========================================================

import React, { useState } from 'react';
import { 
  ShieldAlert, Flame, Wrench, Cog, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { filterObserver } from '../../CONTROLLERS/00_FilterObserver';

export const ServicesView = ({ onOpenQuoteWithService }) => {
  const [activeTab, setActiveTab] = useState('fire');

  const services = [
    {
      id: 'fire',
      title: 'Fire, Safety & Security Systems',
      icon: <ShieldAlert size={24} />,
      categoryKey: 'Fire Safety',
      desc: 'Complete turnkey solutions conforming strictly to NFPA, UL Listed, and FM Approved standards.',
      items: [
        {
          title: 'UL/FM Fire Pump Sets',
          detail: 'Horizontal Split-Case, End-Suction & Vertical Turbine pumps up to 2000 GPM.'
        },
        {
          title: 'Fire Sprinkler & Hydrant Networks',
          detail: 'Automatic wet pipe sprinklers, landing valves, hose reels, and pillar hydrants.'
        },
        {
          title: 'Clean Agent Gas Suppression',
          detail: 'FM-200, Novec-1230, CO2, and Inert Gas automatic flooding systems for server rooms.'
        },
        {
          title: 'Addressable Fire Alarm & PAVA',
          detail: 'Intelligent smoke/heat detection panels, manual pull stations, and voice alarm systems.'
        },
        {
          title: 'UL Certified Fire Rated Doors',
          detail: 'Single/double leaf panic exit fire doors with 120-180 min fire endurance rating.'
        },
        {
          title: 'CCTV & Biometric Access Control',
          detail: 'Enterprise IP camera surveillance networks and multi-door biometric security.'
        }
      ]
    },
    {
      id: 'mechanical',
      title: 'Industrial Mechanical Solutions',
      icon: <Wrench size={24} />,
      categoryKey: 'Mechanical',
      desc: 'Heavy mechanical fabrication, industrial thermal piping, steam generators, and environmental plants.',
      items: [
        {
          title: 'Industrial Steam & Thermal Boilers',
          detail: 'Installation, commissioning, and piping for heavy steam boilers and vapor chillers.'
        },
        {
          title: 'WTP & ETP Plants',
          detail: 'Water Treatment Plants & Effluent Treatment Plants tailored for pharmaceutical and textile standards.'
        },
        {
          title: 'Industrial Gas & Air Compressors',
          detail: 'Compressed air SS pipelines, pressure vessels, and air receiver tanks.'
        },
        {
          title: 'Heavy Ducting & Ventilation',
          detail: 'Staircase pressurization, basement exhaust ventilation, and HVAC ducting.'
        },
        {
          title: 'Structural Steel Erection',
          detail: 'MS chimneys, heavy platforms, pipe racks, storage silos, and factory roofing.'
        },
        {
          title: 'Industrial Chemical Tanks',
          detail: 'Large-scale liquid and chemical storage vessels up to 30,000+ liters capacity.'
        }
      ]
    },
    {
      id: 'lpg',
      title: 'Central LPG Reticulation Systems',
      icon: <Flame size={24} />,
      categoryKey: 'LPG Systems',
      desc: 'Safe, centralized gas pipeline networks replacing individual cylinders for high-rise living and hotels.',
      items: [
        {
          title: 'Central Manifold Stations',
          detail: 'Multi-cylinder manifold systems with auto-changeover regulators and safety release valves.'
        },
        {
          title: 'High-Rise Riser Pipelines',
          detail: 'Corrosion-resistant copper and seamless steel riser piping tested to withstand high pressure.'
        },
        {
          title: 'Smart Prepaid / Digital Gas Meters',
          detail: 'Individual sub-metering for apartments with precision telemetry.'
        },
        {
          title: 'Automatic Gas Leakage Detection',
          detail: 'Integrated gas sensors with automatic emergency solenoid shut-off valves.'
        }
      ]
    }
  ];

  const currentService = services.find((s) => s.id === activeTab);

  const handleInspectProjects = (catKey) => {
    filterObserver.notify(catKey);
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-head">
          <div className="badge-pill">
            <Cog size={14} /> Full Lifecycle Services
          </div>
          <h2 className="section-title">End-to-End Engineering Expertise</h2>
          <p className="section-subtitle">
            From preliminary design drawings and MEP consultancy to procurement, installation, and after-sales maintenance.
          </p>
        </div>

        <div className="service-tabs">
          {services.map((svc) => (
            <button
              key={svc.id}
              className={`service-tab-btn ${activeTab === svc.id ? 'active' : ''}`}
              onClick={() => setActiveTab(svc.id)}
            >
              <span className="tab-icon">{svc.icon}</span>
              <span className="tab-title">{svc.title}</span>
            </button>
          ))}
        </div>

        <div className="service-details-card">
          <div className="service-meta">
            <h3 className="service-heading">{currentService.title}</h3>
            <p className="service-summary">{currentService.desc}</p>
            <div className="service-cta-row">
              <button 
                className="btn-primary"
                onClick={() => onOpenQuoteWithService && onOpenQuoteWithService(currentService.title)}
              >
                Request Proposal for this Solution
              </button>
              <button 
                className="btn-secondary"
                onClick={() => handleInspectProjects(currentService.categoryKey)}
              >
                View Related Mega-Projects <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="service-grid">
            {currentService.items.map((item, idx) => (
              <div key={idx} className="service-item-card">
                <div className="item-header">
                  <CheckCircle2 size={18} className="item-check" />
                  <h4>{item.title}</h4>
                </div>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
