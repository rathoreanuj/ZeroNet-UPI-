import React from 'react';

export default function KpiMetrics({ settledVolume, settledCount, duplicateCount, activePackets, deviceCount, idempotencyCount }) {
  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div className="kpi-header">
          <span>Total Settled Volume</span>
          <div className="kpi-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)' }}>₹</div>
        </div>
        <div className="kpi-value">
          ₹{settledVolume.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="kpi-meta">
          {settledCount} settled &bull; {duplicateCount} duplicates shielded
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-header">
          <span>In-Flight Mesh Packets</span>
          <div className="kpi-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-primary)' }}>📦</div>
        </div>
        <div className="kpi-value">{activePackets}</div>
        <div className="kpi-meta">Gossip propagation pool</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-header">
          <span>Active Mesh Nodes</span>
          <div className="kpi-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--purple)' }}>📱</div>
        </div>
        <div className="kpi-value">{deviceCount} Nodes</div>
        <div className="kpi-meta">4 Offline &bull; 1 4G Bridge</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-header">
          <span>Idempotency Cache</span>
          <div className="kpi-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' }}>🛡️</div>
        </div>
        <div className="kpi-value">{idempotencyCount}</div>
        <div className="kpi-meta">Atomic duplicate shields</div>
      </div>
    </div>
  );
}
