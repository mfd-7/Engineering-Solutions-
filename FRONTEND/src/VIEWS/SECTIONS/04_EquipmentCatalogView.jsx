// ==========================================================
// VIEW: EquipmentCatalogView
// MVC Role: Physical Machinery & Tools Catalog presentation
// Model: EquipmentModel
// ==========================================================

import React, { useState } from 'react';
import { EquipmentModel } from '../../MODELS/02_EquipmentModel';
import { Layers, ShieldAlert, Cpu, ArrowUpRight, Check, Award } from 'lucide-react';

export const EquipmentCatalogView = ({ onOpenQuoteWithEquipment }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = EquipmentModel.getCategories();
  const items = EquipmentModel.filterEquipment(activeCategory);

  return (
    <section id="equipment" className="equipment-section">
      <div className="container">
        <div className="section-head">
          <div className="badge-pill">
            <Cpu size={14} /> Certified Machinery & Tools
          </div>
          <h2 className="section-title">Industrial Equipment & Life Safety Catalog</h2>
          <p className="section-subtitle">
            Direct import, fabrication, and authorized supply of UL Listed and FM Approved machinery 
            backed by factory warranty and certified testing.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="equipment-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`eq-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Equipment Cards Grid */}
        <div className="equipment-grid">
          {items.map((eq) => (
            <div key={eq.id} className="equipment-card">
              <div className="eq-image-wrap">
                <img src={eq.image} alt={eq.name} loading="lazy" />
                <div className="eq-badge">
                  <Award size={13} /> {eq.standard}
                </div>
              </div>
              <div className="eq-body">
                <div className="eq-meta-row">
                  <span className="eq-brand">{eq.brand}</span>
                  <span className="eq-category">{eq.category}</span>
                </div>
                <h3 className="eq-title">{eq.name}</h3>
                <p className="eq-desc">{eq.description}</p>

                <div className="eq-specs-list">
                  <div className="spec-row">
                    <span className="spec-label">Capacity / Sizing:</span>
                    <span className="spec-value">{eq.capacity}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Pressure / Rating:</span>
                    <span className="spec-value">{eq.pressure}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Configuration:</span>
                    <span className="spec-value">{eq.driver}</span>
                  </div>
                </div>

                <button
                  className="btn-secondary eq-inquire-btn"
                  onClick={() => onOpenQuoteWithEquipment && onOpenQuoteWithEquipment(eq.name)}
                >
                  Inquire Machinery Specs <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
