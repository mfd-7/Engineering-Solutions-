// ==========================================================
// VIEW: AdminPanel
// Access: /admin-panel
// Admin password: CreW@321 (full access - view, delete)
// Moderator password: mod@321 (view + accept only)
// Stores leads in localStorage (until backend is deployed)
// ==========================================================

import React, { useState, useEffect } from 'react';
import { Shield, LogOut, Check, Trash2, ChevronDown, Bell, Search } from 'lucide-react';
import { LeadController } from '../CONTROLLERS/03_LeadController';

// status badge colors
const STATUS_STYLES = {
  pending:      { bg: '#f59e0b22', color: '#f59e0b', label: 'Pending' },
  new:          { bg: '#f59e0b22', color: '#f59e0b', label: 'New' },
  accepted:     { bg: '#10b98122', color: '#10b981', label: 'Accepted' },
  rejected:     { bg: '#e61c2422', color: '#e61c24', label: 'Rejected' },
  closed:       { bg: '#e61c2422', color: '#e61c24', label: 'Closed' },
  'under review': { bg: '#3b82f622', color: '#3b82f6', label: 'Under Review' },
};

// ── Main Component ────────────────────────────────────────
export const AdminPanelView = () => {
  const [role, setRole]         = useState(null);   // 'admin' | null
  const [passInput, setPass]    = useState('');
  const [passError, setError]   = useState('');
  const [leads, setLeads]       = useState([]);
  const [search, setSearch]     = useState('');
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter]     = useState('all');

  useEffect(() => {
    if (role) {
      LeadController.getLeads().then(data => setLeads(data || []));
    }
  }, [role]);

  const login = () => {
    if (LeadController.verifyAdminPassword(passInput)) {
      setRole('admin');
      setError('');
    } else {
      setError('Invalid password. Access denied.');
    }
  };

  const logout = () => { setRole(null); setPass(''); setLeads([]); };

  const updateStatus = async (id, status) => {
    const updated = await LeadController.updateStatus(id, status);
    setLeads(updated);
  };

  const deleteLead = async (id) => {
    const updated = await LeadController.deleteLead(id);
    setLeads(updated);
  };

  const filtered = leads.filter(l => {
    const matchSearch = !search ||
      l.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      l.company?.toLowerCase().includes(search.toLowerCase()) ||
      l.email?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || l.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all:      leads.length,
    pending:  leads.filter(l => l.status === 'pending' || !l.status).length,
    accepted: leads.filter(l => l.status === 'accepted').length,
    rejected: leads.filter(l => l.status === 'rejected').length,
  };

  // ── Login Screen ─────────────────────────────────────────
  if (!role) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.loginCard}>
          <div style={styles.loginIcon}><Shield size={32} color="#e61c24" /></div>
          <h2 style={styles.loginTitle}>Engineering Solutions</h2>
          <p style={styles.loginSub}>Restricted Management Portal</p>

          <input
            type="password"
            placeholder="Enter access password"
            value={passInput}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={styles.passInput}
            autoFocus
          />
          {passError && <p style={styles.errText}>{passError}</p>}
          <button style={styles.loginBtn} onClick={login}>Access Portal</button>

          <div style={styles.loginHint}>
            <span style={{ color: '#475569', fontSize: '0.75rem' }}>
              Admin credentials required
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────
  return (
    <div style={styles.dashWrap}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <Shield size={20} color="#e61c24" />
          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>ES Panel</span>
        </div>

        <div style={styles.sidebarRole}>
          <span style={styles.roleTag}>🔑 Admin</span>
        </div>

        {['all', 'pending', 'accepted', 'rejected'].map(f => (
          <button
            key={f}
            style={{ ...styles.sidebarBtn, ...(filter === f ? styles.sidebarBtnActive : {}) }}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span style={styles.countBadge}>{counts[f]}</span>
          </button>
        ))}

        <button style={styles.logoutBtn} onClick={logout}>
          <LogOut size={15} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        <div style={styles.topBar}>
          <div>
            <h1 style={styles.pageTitle}>Quote Requests</h1>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: 2 }}>
              {counts.pending} pending · {counts.accepted} accepted
            </p>
          </div>
          <div style={styles.searchWrap}>
            <Search size={15} color="#64748b" />
            <input
              style={styles.searchInput}
              placeholder="Search name, company, email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={styles.emptyBox}>
            <Bell size={40} color="#334155" />
            <p style={{ color: '#64748b', marginTop: 12 }}>
              {leads.length === 0
                ? 'No requests yet. They will appear here once someone submits a quote form on the website.'
                : 'No results match your search.'}
            </p>
          </div>
        )}

        {/* Lead Cards */}
        {filtered.map(lead => {
          const normStatus = (lead.status || 'pending').toLowerCase();
          const st = STATUS_STYLES[normStatus] || STATUS_STYLES.pending;
          const isOpen = expanded === lead.id;
          return (
            <div key={lead.id} style={styles.leadCard}>
              <div style={styles.leadHeader} onClick={() => setExpanded(isOpen ? null : lead.id)}>
                <div>
                  <div style={styles.leadName}>{lead.fullName}</div>
                  <div style={styles.leadMeta}>{lead.company} · {lead.phone}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ ...styles.statusBadge, background: st.bg, color: st.color }}>
                    {st.label}
                  </span>
                  <span style={{ color: '#475569', fontSize: '0.75rem' }}>{lead.submittedAt}</span>
                  <ChevronDown size={16} color="#64748b" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </div>
              </div>

              {isOpen && (
                <div style={styles.leadBody}>
                  <div style={styles.detailGrid}>
                    <Detail label="Email"        value={lead.email} />
                    <Detail label="Service Type" value={lead.serviceType} />
                    <Detail label="Reference"    value={lead.referenceId} />
                    <Detail label="Submitted"    value={lead.submittedAt} />
                  </div>
                  {lead.message && (
                    <div style={styles.messageBox}>
                      <p style={{ color: '#94a3b8', fontSize: '0.76rem', marginBottom: 4 }}>NOTES / SCOPE</p>
                      <p style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{lead.message}</p>
                    </div>
                  )}
                  <div style={styles.actionRow}>
                    <button style={styles.acceptBtn} onClick={() => updateStatus(lead.id, 'accepted')}>
                      <Check size={14} /> Accept
                    </button>
                    <button style={styles.rejectBtn} onClick={() => updateStatus(lead.id, 'rejected')}>
                      Reject
                    </button>
                    <button style={styles.deleteBtn} onClick={() => deleteLead(lead.id)}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div style={{ marginBottom: 8 }}>
    <span style={{ color: '#64748b', fontSize: '0.74rem', display: 'block', marginBottom: 2 }}>{label}</span>
    <span style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600 }}>{value || '—'}</span>
  </div>
);

// ── Inline Styles ─────────────────────────────────────────
const styles = {
  loginWrap:      { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0e12' },
  loginCard:      { background: '#14161c', border: '1px solid #ffffff14', borderRadius: 16, padding: '48px 40px', width: '100%', maxWidth: 400, textAlign: 'center' },
  loginIcon:      { marginBottom: 16, display: 'flex', justifyContent: 'center' },
  loginTitle:     { color: '#fff', fontFamily: '"Outfit", sans-serif', fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 },
  loginSub:       { color: '#64748b', fontSize: '0.85rem', marginBottom: 28 },
  passInput:      { width: '100%', background: '#0f1116', border: '1.5px solid #ffffff1f', borderRadius: 8, padding: '12px 16px', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', marginBottom: 8 },
  errText:        { color: '#e61c24', fontSize: '0.8rem', marginBottom: 12 },
  loginBtn:       { width: '100%', background: '#e61c24', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', marginTop: 8 },
  loginHint:      { marginTop: 20 },
  dashWrap:       { display: 'flex', minHeight: '100vh', background: '#0d0e12', fontFamily: '"Inter", sans-serif' },
  sidebar:        { width: 220, background: '#14161c', borderRight: '1px solid #ffffff0f', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 },
  sidebarLogo:    { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #ffffff0f' },
  sidebarRole:    { marginBottom: 12 },
  roleTag:        { background: '#ffffff0f', color: '#94a3b8', borderRadius: 999, padding: '4px 12px', fontSize: '0.76rem', fontWeight: 700 },
  sidebarBtn:     { background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '10px 12px', borderRadius: 8, textAlign: 'left', fontSize: '0.88rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  sidebarBtnActive: { background: '#ffffff0f', color: '#fff' },
  countBadge:     { background: '#ffffff14', borderRadius: 999, padding: '2px 8px', fontSize: '0.72rem' },
  logoutBtn:      { marginTop: 'auto', background: 'transparent', border: '1px solid #ffffff14', color: '#64748b', cursor: 'pointer', padding: '10px 12px', borderRadius: 8, fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: 8 },
  main:           { flex: 1, padding: '32px', overflowY: 'auto' },
  topBar:         { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 },
  pageTitle:      { color: '#fff', fontFamily: '"Outfit", sans-serif', fontSize: '1.6rem', fontWeight: 800 },
  searchWrap:     { display: 'flex', alignItems: 'center', gap: 8, background: '#14161c', border: '1px solid #ffffff14', borderRadius: 8, padding: '8px 14px', minWidth: 280 },
  searchInput:    { background: 'transparent', border: 'none', color: '#e2e8f0', outline: 'none', fontSize: '0.88rem', width: '100%' },
  emptyBox:       { textAlign: 'center', padding: '64px 20px', color: '#64748b' },
  leadCard:       { background: '#14161c', border: '1px solid #ffffff0f', borderRadius: 12, marginBottom: 12, overflow: 'hidden' },
  leadHeader:     { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', cursor: 'pointer' },
  leadName:       { color: '#e2e8f0', fontWeight: 700, fontSize: '0.98rem' },
  leadMeta:       { color: '#64748b', fontSize: '0.8rem', marginTop: 2 },
  statusBadge:    { borderRadius: 999, padding: '3px 10px', fontSize: '0.74rem', fontWeight: 700 },
  leadBody:       { padding: '16px 20px 20px', borderTop: '1px solid #ffffff08' },
  detailGrid:     { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', marginBottom: 16 },
  messageBox:     { background: '#0f1116', borderRadius: 8, padding: '12px 16px', marginBottom: 16 },
  actionRow:      { display: 'flex', gap: 10 },
  acceptBtn:      { display: 'flex', alignItems: 'center', gap: 6, background: '#10b98122', border: '1px solid #10b98166', color: '#10b981', borderRadius: 8, padding: '8px 16px', fontSize: '0.84rem', fontWeight: 700, cursor: 'pointer' },
  rejectBtn:      { background: '#e61c2415', border: '1px solid #e61c2466', color: '#e61c24', borderRadius: 8, padding: '8px 16px', fontSize: '0.84rem', fontWeight: 700, cursor: 'pointer' },
  deleteBtn:      { display: 'flex', alignItems: 'center', gap: 6, background: '#ffffff08', border: '1px solid #ffffff14', color: '#94a3b8', borderRadius: 8, padding: '8px 16px', fontSize: '0.84rem', fontWeight: 700, cursor: 'pointer', marginLeft: 'auto' },
};
