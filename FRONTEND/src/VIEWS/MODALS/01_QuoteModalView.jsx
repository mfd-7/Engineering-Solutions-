// ==========================================================
// VIEW: QuoteModalView
// Controller: LeadController
// Responsibility: Captures lead data, executes validation via controller,
// and confirms automated dispatch to es_kalam@yahoo.com
// ==========================================================

import React, { useState } from 'react';
import { X, Send, ShieldCheck, Mail, Phone, Building, User, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { LeadController } from '../../CONTROLLERS/03_LeadController';

export const QuoteModalView = ({ isOpen, onClose, defaultSubject = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    serviceType: defaultSubject || 'Fire Safety & Hydrant System',
    message: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});

    const response = await LeadController.processQuoteSubmission(formData);
    setLoading(false);

    if (response.success) {
      setSubmitted(true);
      setReferenceId(response.data.referenceId);
    } else {
      setValidationErrors(response.errors);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      company: '',
      phone: '',
      email: '',
      serviceType: 'Fire Safety & Hydrant System',
      message: ''
    });
    setValidationErrors({});
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleResetAndClose}>
      <div className="quote-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleResetAndClose}>
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="quote-head">
              <div className="badge-pill">
                <ShieldCheck size={14} /> Official Quotation Request
              </div>
              <h2>Request Engineering Proposal & BOM</h2>
              <p>
                Inquiries are automatically routed directly to our project manager at{' '}
                <strong>muhtasimfuad3570@gmail.com</strong> for swift technical evaluation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="quote-form">
              <div className="form-grid">
                <div className="form-group">
                  <label><User size={14} /> Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Engr. Rafiqul Islam"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  {validationErrors.fullName && (
                    <span className="error-msg"><AlertCircle size={12} /> {validationErrors.fullName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label><Building size={14} /> Organization / Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Beximco / Factory / Individual"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                  {validationErrors.company && (
                    <span className="error-msg"><AlertCircle size={12} /> {validationErrors.company}</span>
                  )}
                </div>

                <div className="form-group">
                  <label><Phone size={14} /> Direct Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 17XX-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  {validationErrors.phone && (
                    <span className="error-msg"><AlertCircle size={12} /> {validationErrors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label><Mail size={14} /> Official Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {validationErrors.email && (
                    <span className="error-msg"><AlertCircle size={12} /> {validationErrors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label><FileText size={14} /> Primary Engineering Requirement *</label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                >
                  <option value="Fire Safety & Hydrant System">Fire Hydrant & Auto Sprinkler System (NFPA Standard)</option>
                  <option value="UL Listed Fire Pump Set">UL Listed / FM Approved Fire Pump Set (500 - 2000 GPM)</option>
                  <option value="Clean Agent Gas Suppression">FM-200 / Novec-1230 Gas Suppression (Server / Data Center)</option>
                  <option value="Industrial Steam Boiler & Piping">Industrial Boiler, Chiller & SS Piping</option>
                  <option value="Central LPG Reticulation System">Central LPG Reticulation System for High-Rise / Commercial</option>
                  <option value="UL Fire Rated Doors">UL Certified Fire Rated Doors & Panic Push Bars</option>
                  <option value="MEP Design & Consultancy">Complete MEP Design, Drawing & BNBC Consultancy</option>
                </select>
              </div>

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label>Facility Scope / Estimated Hydraulic Parameters</label>
                <label><FileText size={14} /> <span>Facility Scope / Estimated Hydraulic Parameters</span></label>
                <textarea
                  rows="3"
                  placeholder="Provide floor count, square footage, building category, or specific equipment requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <div className="quote-footer">
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Routing Inquiry...' : <><Send size={16} /> Submit Proposal Request</>}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="quote-success">
            <CheckCircle2 size={54} color="#059669" />
            <h3>Quotation Request Transmitted!</h3>
            <p>
              Thank you, <strong>{formData.fullName}</strong>. Your requirement for{' '}
              <strong>{formData.company || 'your project'}</strong> has been routed to our project manager at{' '}
              <strong>muhtasimfuad3570@gmail.com</strong>.
            </p>
            <div className="ref-badge">Tracking Ref: {referenceId}</div>
            <p className="success-sub">
              Our Senior Project Engineer will review your facility parameters and reach out at{' '}
              <strong>{formData.phone}</strong> within 4 business hours.
            </p>
            <button className="btn-primary" onClick={handleResetAndClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
