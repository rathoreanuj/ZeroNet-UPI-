import React from 'react';

export default function HeroBanner({ onRunAutomatedDemo, isAutoSimulating }) {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h2>Offline UPI Payment Mesh Simulator (React Edition)</h2>
        <p>
          Enables instant peer-to-peer UPI payments in cellular dead-zones (basements, underground transit, remote regions).
          Transactions are end-to-end encrypted on the sender's device, hopped across peer Bluetooth mesh nodes, and settled atomically once any bridge node touches 4G/WiFi.
        </p>
        <div className="security-tags">
          <span className="sec-tag">🔐 RSA-2048 OAEP + AES-256-GCM Hybrid</span>
          <span className="sec-tag">⚡ Atomic SHA-256 Idempotency Cache</span>
          <span className="sec-tag">⏳ 24h Replay Attack Window</span>
          <span className="sec-tag">📡 Hop-Decremented BLE Gossip (TTL 5)</span>
        </div>
      </div>
      <div style={{ flexShrink: 0, textAlign: 'right' }}>
        <button 
          className="saas-btn saas-btn-purple" 
          onClick={onRunAutomatedDemo} 
          disabled={isAutoSimulating}
          style={{ width: 'auto', padding: '10px 20px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          {isAutoSimulating ? 'Simulating Full Flow...' : 'Simulate Full Lifecycle'}
        </button>
      </div>
    </div>
  );
}
