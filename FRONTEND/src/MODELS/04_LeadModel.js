import { API_BASE_URL } from '../apiConfig';

const MANAGER_EMAIL = 'muhtasimfuad3570@gmail.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${MANAGER_EMAIL}`;

export class LeadModel {
  static validateLead(data) {
    const errors = {};
    if (!data.fullName || data.fullName.trim().length < 2) {
      errors.fullName = 'Please provide a valid contact name.';
    }
    const company = (data.company && data.company.trim().length >= 2)
      ? data.company.trim()
      : (data.company && data.company.trim() ? data.company.trim() : 'Individual / Private Client');

    if (!data.phone || data.phone.trim().length < 6) {
      errors.phone = 'Please provide a valid phone number.';
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please provide a valid corporate email address.';
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      sanitizedCompany: company
    };
  }

  static async getLeadsFromStorage() {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/`);
      if (res.ok) {
        const raw = await res.json();
        const data = Array.isArray(raw) ? raw : (raw.results || []);
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map(item => ({
            id: item.id,
            referenceId: `ES-${item.id}`,
            fullName: item.full_name,
            company: item.company,
            phone: item.phone,
            email: item.email,
            serviceType: item.project_type,
            message: item.message,
            status: item.status?.toLowerCase() || 'pending',
            submittedAt: new Date(item.created_at).toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' })
          }));
          return formatted;
        }
      }
    } catch (err) {
    }

    try {
      return JSON.parse(localStorage.getItem('es_leads') || '[]');
    } catch {
      return [];
    }
  }

  static async updateLeadStatus(id, status) {
    try {
      await fetch(`${API_BASE_URL}/leads/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: status === 'accepted' ? 'Accepted' : (status === 'rejected' ? 'Closed' : 'New') })
      });
    } catch (err) {
    }

    const leads = JSON.parse(localStorage.getItem('es_leads') || '[]');
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    localStorage.setItem('es_leads', JSON.stringify(updated));
    return updated;
  }

  static async deleteLead(id) {
    try {
      await fetch(`${API_BASE_URL}/leads/${id}/`, { method: 'DELETE' });
    } catch (err) {
    }

    const leads = JSON.parse(localStorage.getItem('es_leads') || '[]');
    const updated = leads.filter(l => l.id !== id);
    localStorage.setItem('es_leads', JSON.stringify(updated));
    return updated;
  }

  static async submitLeadToManagingDirector(leadData) {
    const refId = 'ES-' + Date.now().toString(36).toUpperCase();
    const effectiveCompany = (leadData.company && leadData.company.trim()) 
      ? leadData.company.trim() 
      : 'Individual / Private Client';

    try {
      const existingLeads = JSON.parse(localStorage.getItem('es_leads') || '[]');
      existingLeads.unshift({
        id: refId,
        referenceId: refId,
        fullName: leadData.fullName,
        company: effectiveCompany,
        phone: leadData.phone,
        email: leadData.email,
        serviceType: leadData.serviceType || 'General Inquiry',
        message: leadData.message || '',
        status: 'pending',
        submittedAt: new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' })
      });
      localStorage.setItem('es_leads', JSON.stringify(existingLeads));
    } catch (storageErr) {
      console.error('LocalStorage save error:', storageErr);
    }

    fetch(`${API_BASE_URL}/leads/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: leadData.fullName,
        company: effectiveCompany,
        phone: leadData.phone,
        email: leadData.email,
        project_type: leadData.serviceType || 'General Inquiry',
        site_sqft: leadData.siteSqft || '',
        message: leadData.message || ''
      })
    }).catch(() => {});

    try {
      const response = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          _subject: `🔔 New Quote Request: ${effectiveCompany} — ${leadData.serviceType || 'General'}`,
          _replyto: leadData.email,
          _template: 'table',
          _captcha: 'false',
          'Reference ID': refId,
          'Contact Name': leadData.fullName,
          Company: effectiveCompany,
          Phone: leadData.phone,
          'Client Email': leadData.email,
          'Service Type': leadData.serviceType || 'General Inquiry',
          'Scope / Notes': leadData.message || '—',
          'Submitted At': new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' })
        })
      });

      return {
        success: true,
        recipient: MANAGER_EMAIL,
        timestamp: new Date().toISOString(),
        referenceId: refId
      };
    } catch (err) {
      return {
        success: true,
        recipient: MANAGER_EMAIL,
        timestamp: new Date().toISOString(),
        referenceId: refId + '-OFFLINE'
      };
    }
  }
}
