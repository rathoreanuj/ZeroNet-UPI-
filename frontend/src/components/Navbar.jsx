import React from 'react';

export default function Navbar({ theme, onToggleTheme, onShowKeyModal, onSync, isSyncing }) {
  return (
    <header className="saas-header">
      <div className="header-inner">
        <div className="brand-cluster">
          <div className="brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
              <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
              <line x1="12" y1="20" x2="12.01" y2="20"></line>
            </svg>
          </div>
          <div className="brand-title-wrap">
            <h1>
              MeshPay
              <span className="badge-pill badge-pro">Protocol</span>
            </h1>
            <div className="brand-subtitle">
              Offline UPI via Bluetooth Mesh &amp; Idempotent Settlement
            </div>
          </div>
        </div>

        <div className="header-actions">
          {/* Theme Toggle Button */}
          <button 
            className="theme-toggle-btn" 
            onClick={onToggleTheme} 
            title="Switch Theme"
          >
            <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>

          <div className="system-status">
            <div className="pulse-indicator"></div>
            <span>Enclave: <strong>Active</strong></span>
          </div>

          <button className="btn-ghost-sm" onClick={onShowKeyModal}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            RSA Key
          </button>

          <a href="http://localhost:8080/h2-console" target="_blank" rel="noreferrer" className="btn-ghost-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
            H2 Console
          </a>

          <button className="btn-ghost-sm" onClick={() => onSync(true)}>
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              style={{ transform: isSyncing ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
            Sync
          </button>
        </div>
      </div>
    </header>
  );
}
