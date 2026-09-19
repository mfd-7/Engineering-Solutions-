import { LeadModel } from '../MODELS/04_LeadModel';

export class LeadController {
  static async processQuoteSubmission(formData) {
    const validation = LeadModel.validateLead(formData);
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    try {
      const submissionData = {
        ...formData,
        company: validation.sanitizedCompany || formData.company
      };
      const result = await LeadModel.submitLeadToManagingDirector(submissionData);
      return {
        success: true,
        data: result
      };
    } catch (err) {
      return {
        success: false,
        errors: { general: 'Communication gateway temporarily unavailable. Please call our direct hotline.' }
      };
    }
  }

  static async getLeads() {
    return await LeadModel.getLeadsFromStorage();
  }

  static async updateStatus(id, status) {
    return await LeadModel.updateLeadStatus(id, status);
  }

  static async deleteLead(id) {
    return await LeadModel.deleteLead(id);
  }

  static verifyAdminPassword(passInput) {
    const ADMIN_PASS = 'crewbro321';
    return passInput === ADMIN_PASS;
  }
}
