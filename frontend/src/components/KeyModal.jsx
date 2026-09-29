import React from 'react';

export default function KeyModal({ isOpen, onClose, publicKey, onCopyKey }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Server Enclave Public Key</h3>
          <button className="btn-ghost-sm" onClick={onClose} style={{ border: 'none', fontSize: '16px' }}>
            ✕
          </button>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Every offline mobile client caches this RSA-2048 public key when online. In the basement, the phone uses it with <strong>OAEP-SHA256</strong> to seal an ephemeral <strong>AES-256-GCM</strong> session key. Intermediate mesh phones cannot decrypt the payment payload.
        </p>
        <div
          style={{
            background: 'var(--modal-inner-bg)',
            border: '1px solid var(--border-subtle)',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            wordBreak: 'break-all',
            color: 'var(--accent-primary)',
            maxHeight: '180px',
            overflowY: 'auto',
          }}
        >
          {publicKey || 'Loading server public key...'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', gap: '8px' }}>
          <button className="saas-btn saas-btn-secondary" style={{ width: 'auto' }} onClick={onCopyKey}>
            Copy Public Key
          </button>
          <button className="saas-btn saas-btn-primary" style={{ width: 'auto' }} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
