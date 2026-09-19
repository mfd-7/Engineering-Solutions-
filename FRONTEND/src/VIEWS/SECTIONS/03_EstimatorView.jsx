// ==========================================================
// VIEW: EstimatorView
// MVC Role: Presentation for Hydraulic GPM & Water Tank Estimator
// Controller: EstimatorController
// ==========================================================

import React, { useState } from 'react';
import { Calculator, Droplet, Gauge, Flame, Building2, ArrowRight, ShieldCheck } from 'lucide-react';
import { EstimatorController } from '../../CONTROLLERS/02_EstimatorController';

export const EstimatorView = ({ onOpenQuoteWithSpecs }) => {
  const [occupancyKey, setOccupancyKey] = useState('commercial');
  const [totalSqFt, setTotalSqFt] = useState(60000);
  const [floors, setFloors] = useState(12);

  const occupancyOptions = EstimatorController.getOccupancyOptions();
  const estimate = EstimatorController.calculate({ occupancyKey, totalSqFt, floors });

  const handleRequestQuote = () => {
    const specsSummary = `Facility: ${estimate.occupancyName} | Area: ${Number(totalSqFt).toLocaleString()} sq.ft | Floors: ${floors} | Est. Pump: ${estimate.pumpGpm} GPM | Reservoir: ${estimate.reservoirGallons} Gal`;
    if (onOpenQuoteWithSpecs) {
      onOpenQuoteWithSpecs(specsSummary);
    }
  };

  return (
    <section id="estimator" className="estimator-section">
      <div className="container">
        <div className="section-head">
          <div className="badge-pill">
            <Calculator size={14} /> Smart Engineering Tool
          </div>
          <h2 className="section-title">Interactive Fire Safety & Hydraulic Estimator</h2>
          <p className="section-subtitle">
            Instantly calculate your facility's recommended fire pump capacity, reservoir storage, 
            and sprinkler coverage strictly based on NFPA 13, 14, 20 and BNBC standards.
          </p>
        </div>

        <div className="estimator-card">
          <div className="estimator-inputs-col">
            <div className="input-group-heading">
              <Building2 size={18} color="#E61C24" />
              <h3>1. Facility Profile & Dimensions</h3>
            </div>

            <div className="est-input-group">
              <label>Building / Occupancy Classification</label>
              <select
                value={occupancyKey}
                onChange={(e) => setOccupancyKey(e.target.value)}
                className="est-select"
              >
                {occupancyOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.name} ({opt.hazard})
                  </option>
                ))}
              </select>
            </div>

            <div className="est-input-group">
              <div className="label-row">
                <label>Total Built-up Floor Area</label>
                <span className="slider-val">{Number(totalSqFt).toLocaleString()} sq. ft</span>
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={totalSqFt}
                onChange={(e) => setTotalSqFt(Number(e.target.value))}
                className="est-slider"
              />
              <div className="range-hints">
                <span>5k sq.ft</span>
                <span>250k sq.ft</span>
                <span>500k+ sq.ft</span>
              </div>
            </div>

            <div className="est-input-group">
              <div className="label-row">
                <label>Number of Stories / Floors</label>
                <span className="slider-val">{floors} Floors</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={floors}
                onChange={(e) => setFloors(Number(e.target.value))}
                className="est-slider"
              />
              <div className="range-hints">
                <span>1 Floor (Warehouse)</span>
                <span>20 Floors</span>
                <span>40 Floors (High-Rise)</span>
              </div>
            </div>

            <div className="estimator-compliance-note">
              <ShieldCheck size={18} color="#0B3B60" />
              <span>Calculated under NFPA 20 (Fire Pumps) & NFPA 13 (Sprinklers) standard densities.</span>
            </div>
          </div>

          {/* Output Results Panel */}
          <div className="estimator-results-col">
            <div className="results-header">
              <span className="results-tag">ESTIMATED HYDRAULIC SIZING</span>
              <h3>Engineering Deliverables</h3>
            </div>

            <div className="results-metric-grid">
              <div className="res-card highlight-card">
                <div className="res-icon-wrap">
                  <Gauge size={22} color="#E61C24" />
                </div>
                <div className="res-info">
                  <span className="res-num">{estimate.pumpGpm} US GPM</span>
                  <span className="res-lbl">Recommended UL Fire Pump Rating</span>
                </div>
              </div>

              <div className="res-card">
                <div className="res-icon-wrap">
                  <Droplet size={22} color="#0B3B60" />
                </div>
                <div className="res-info">
                  <span className="res-num">{estimate.reservoirGallons} Gal</span>
                  <span className="res-sub">({estimate.reservoirLiters} Liters dedicated storage)</span>
                  <span className="res-lbl">Min. Underground Fire Reservoir</span>
                </div>
              </div>

              <div className="res-card">
                <div className="res-icon-wrap">
                  <Flame size={22} color="#D97706" />
                </div>
                <div className="res-info">
                  <span className="res-num">{estimate.sprinklerHeads} Heads</span>
                  <span className="res-lbl">Automatic Wet Sprinklers Coverage</span>
                </div>
              </div>

              <div className="res-card">
                <div className="res-icon-wrap">
                  <Building2 size={22} color="#0B3B60" />
                </div>
                <div className="res-info">
                  <span className="res-num">{estimate.risers} Riser(s) / {estimate.fireDoors} Fire Doors</span>
                  <span className="res-lbl">Standpipes & 120-min UL Fire Rated Doors</span>
                </div>
              </div>
            </div>

            <div className="res-footer-action">
              <button className="btn-primary quote-est-btn" onClick={handleRequestQuote}>
                Request Official BOM Based On These Specs <ArrowRight size={18} />
              </button>
              <p className="res-disclaimer">
                * Note: Final capacity requires site survey and formal NFPA hydraulic calculation by our KUET / B.Sc Engineers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
