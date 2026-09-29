import React, { useState } from 'react';

export default function TransactionLedger({ transactions }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter((t) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (t.senderVpa && t.senderVpa.toLowerCase().includes(term)) ||
      (t.receiverVpa && t.receiverVpa.toLowerCase().includes(term)) ||
      (t.status && t.status.toLowerCase().includes(term)) ||
      (t.bridgeNodeId && t.bridgeNodeId.toLowerCase().includes(term))
    );
  });

  return (
    <div className="saas-card ledger-section">
      <div className="card-title-bar">
        <div className="card-heading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Audit Settlement Ledger
        </div>
        <div className="table-toolbar">
          <div className="search-box">
            <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Filter by VPA or status..."
              className="saas-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="saas-table-wrap">
        <table className="saas-table">
          <thead>
            <tr>
              <th>Tx ID</th>
              <th>Sender VPA</th>
              <th>Receiver VPA</th>
              <th>Amount</th>
              <th>Settlement Status</th>
              <th>Relayed Via Bridge</th>
              <th>BLE Hops</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px' }}>
                  No mesh transactions executed yet. Inject a payment above to begin!
                </td>
              </tr>
            ) : (
              filteredTransactions.map((t) => {
                const dateStr = t.settledAt ? new Date(t.settledAt).toLocaleTimeString() : 'Pending';
                let statusIcon = '●';
                if (t.status === 'SETTLED') statusIcon = '✓';
                if (t.status === 'DUPLICATE_DROPPED') statusIcon = '✕';

                return (
                  <tr key={t.id}>
                    <td>
                      <span className="tx-id-badge">#TX-{t.id}</span>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--accent-primary)', fontFamily: "'JetBrains Mono', monospace" }}>
                        {t.senderVpa}
                      </strong>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--text-primary)', fontFamily: "'JetBrains Mono', monospace" }}>
                        {t.receiverVpa}
                      </strong>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--success)', fontFamily: "'JetBrains Mono', monospace" }}>
                        ₹{parseFloat(t.amount || 0).toFixed(2)}
                      </strong>
                    </td>
                    <td>
                      <span className={`status-chip status-${t.status}`}>
                        <span>{statusIcon}</span>
                        {t.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--purple)', fontWeight: 500 }}>
                        {t.bridgeNodeId}
                      </span>
                    </td>
                    <td>
                      <span style={{ background: 'var(--chip-bg)', padding: '2px 7px', borderRadius: '4px', fontSize: '11px', border: '1px solid var(--border-subtle)' }}>
                        {t.hopCount} hops
                      </span>
                    </td>
                    <td style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {dateStr}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
