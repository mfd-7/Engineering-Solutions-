// ==========================================================
// APPLICATION ROOT
// MVC Architecture Entry: Dispatches to NavbarView, HomeView, and FooterView
// ==========================================================

import React, { useState, Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarView } from './VIEWS/COMPONENTS/01_NavbarView';
import { HomeView } from './VIEWS/HomeView';
import { FooterView } from './VIEWS/COMPONENTS/04_FooterView';
import { QuoteModalView } from './VIEWS/MODALS/01_QuoteModalView';
import { AdminPanelView } from './VIEWS/AdminPanelView';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('UI Error Boundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#FFFFFF', background: '#0D0E12', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: 'sans-serif', marginBottom: '12px' }}>Engineering Solutions</h2>
          <p style={{ color: '#8E9BAE', maxWidth: '420px', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '12px' }}>
            The application experienced an unexpected display issue:
          </p>
          <pre style={{ color: '#FF6B6B', background: '#14161C', padding: '12px', borderRadius: '8px', fontSize: '0.72rem', maxWidth: '90vw', overflowX: 'auto', textAlign: 'left', whiteSpace: 'pre-wrap', border: '1px solid rgba(255,255,255,0.1)' }}>
            {this.state.error?.toString() || 'Unknown Error'}
            {'\n'}
            {this.state.error?.stack || ''}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '12px 28px', background: '#E61C24', color: '#FFFFFF', border: 'none', borderRadius: '999px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Reload Website
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppLayout() {
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

  return (
    <div className="app-layout">
      <NavbarView onOpenQuote={() => handleOpenQuote('General Quotation Request')} />
      <main>
        <HomeView />
      </main>
      <FooterView onOpenQuote={() => handleOpenQuote('Footer Direct Request')} />

      <QuoteModalView
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        defaultSubject={quoteSubject}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/admin-panel" element={<AdminPanelView />} />
          <Route path="*" element={<AppLayout />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
