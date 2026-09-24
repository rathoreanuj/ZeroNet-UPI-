import React, { useState } from 'react';

export default function ActionConsole({
  onSendPacket,
  onGossip,
  onFlushBridges,
  onResetMesh,
  isInjecting,
  isGossiping,
  isFlushing,
  senderVpa,
  setSenderVpa,
}) {
  const [receiverVpa, setReceiverVpa] = useState('bob@demo');
  const [amount, setAmount] = useState(500);
  const [pin, setPin] = useState('1234');

  const handleSubmitInject = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    onSendPacket({
      senderVpa,
      receiverVpa,
      amount: parseFloat(amount),
      pin,
      ttl: 5,
      startDevice: 'phone-alice',
    });
  };

  return (
    <div className="action-strip">
      <div className="action-strip-header">
        <div className="action-strip-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
          Protocol Simulation Control Center
        </div>
        <button 
          className="saas-btn-danger" 
          style={{ width: 'auto', padding: '6px 14px', fontSize: '12px', borderRadius: 'var(--radius-sm)' }}
          onClick={onResetMesh}
        >
          🗑 Reset Mesh & Cache
        </button>
      </div>

      <div className="stepper-grid">
        {/* Step 1: Inject Payment */}
        <div className="step-block featured">
          <div>
            <div className="step-title-wrap">
              <span className="step-pill">1</span>
              <div>
                <div className="step-name">Compose & Inject</div>
                <div className="step-desc">Offline client encrypts with Server RSA key</div>
              </div>
            </div>

            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="form-row">
                <div className="input-group">
                  <span className="input-label">Sender (Offline)</span>
                  <select 
                    className="saas-select" 
                    value={senderVpa} 
                    onChange={(e) => setSenderVpa(e.target.value)}
                  >
                    <option value="alice@demo">alice@demo (Alice)</option>
                    <option value="bob@demo">bob@demo (Bob)</option>
                    <option value="carol@demo">carol@demo (Carol)</option>
                  </select>
                </div>
                <div className="input-group">
                  <span className="input-label">Receiver</span>
                  <select 
                    className="saas-select" 
                    value={receiverVpa} 
                    onChange={(e) => setReceiverVpa(e.target.value)}
                  >
                    <option value="bob@demo">bob@demo (Bob)</option>
                    <option value="carol@demo">carol@demo (Carol)</option>
                    <option value="alice@demo">alice@demo (Alice)</option>
                    <option value="dave@demo">dave@demo (Dave)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <span className="input-label">Amount (₹)</span>
                  <input 
                    type="number" 
                    className="saas-input" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    min="1" 
                    step="10" 
                  />
                  <div className="quick-amounts">
                    <span className="amt-chip" onClick={() => setAmount(100)}>₹100</span>
                    <span className="amt-chip" onClick={() => setAmount(500)}>₹500</span>
                    <span className="amt-chip" onClick={() => setAmount(1000)}>₹1k</span>
                    <span className="amt-chip" onClick={() => setAmount(2500)}>₹2.5k</span>
                  </div>
                </div>
                <div className="input-group">
                  <span className="input-label">UPI PIN</span>
                  <input 
                    type="password" 
                    className="saas-input" 
                    value={pin} 
                    maxLength={6} 
                    onChange={(e) => setPin(e.target.value)}
                    style={{ letterSpacing: '2px' }} 
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            className="saas-btn saas-btn-primary" 
            onClick={handleSubmitInject} 
            disabled={isInjecting}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            {isInjecting ? 'Encrypting & Sealing...' : 'Inject into Mesh (phone-alice)'}
          </button>
        </div>

        {/* Step 2: Mesh Gossip */}
        <div className="step-block">
          <div>
            <div className="step-title-wrap">
              <span className="step-pill" style={{ background: 'var(--cyan)' }}>2</span>
              <div>
                <div className="step-name">Gossip Hop</div>
                <div className="step-desc">Relay via Bluetooth BLE hops</div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: '1.5' }}>
              Simulates peer discovery in the basement. Every device relays held packets to neighbors; TTL decrements by 1 each hop.
            </p>
          </div>
          <button 
            className="saas-btn saas-btn-secondary" 
            onClick={onGossip} 
            disabled={isGossiping}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            {isGossiping ? 'Gossiping...' : 'Run Gossip Round'}
          </button>
        </div>

        {/* Step 3: Bridge Uplink */}
        <div className="step-block">
          <div>
            <div className="step-title-wrap">
              <span className="step-pill" style={{ background: 'var(--success)' }}>3</span>
              <div>
                <div className="step-name">Bridge 4G Ingest</div>
                <div className="step-desc">Node reaches outdoor cellular connection</div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: '1.5' }}>
              Bridge nodes POST held packets in parallel to <code>/api/bridge/ingest</code>. Exercises concurrent atomic SHA-256 deduplication.
            </p>
          </div>
          <button 
            className="saas-btn saas-btn-primary" 
            style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}
            onClick={onFlushBridges} 
            disabled={isFlushing}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            {isFlushing ? 'Uploading to 4G...' : 'Bridges Upload to 4G'}
          </button>
        </div>

        {/* Step 4: Replay Defense */}
        <div className="step-block">
          <div>
            <div className="step-title-wrap">
              <span className="step-pill" style={{ background: 'var(--warning)' }}>4</span>
              <div>
                <div className="step-name">Replay Defense</div>
                <div className="step-desc">Test duplicate storms</div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: '1.5' }}>
              Re-flush bridges with existing packets to prove duplicate rejection without double-spending.
            </p>
          </div>
          <button 
            className="saas-btn saas-btn-outline" 
            onClick={onFlushBridges}
            disabled={isFlushing}
          >
            ⚡ Re-Attempt Upload
          </button>
        </div>
      </div>
    </div>
  );
}
