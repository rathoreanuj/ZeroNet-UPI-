import React, { useRef, useEffect } from 'react';

const NODE_COORDINATES = {
  'phone-alice': { x: 80, y: 55, name: 'Alice (Sender)', color: '#38bdf8' },
  'phone-stranger1': { x: 190, y: 120, name: 'Peer 1', color: '#94a3b8' },
  'phone-stranger2': { x: 300, y: 45, name: 'Peer 2', color: '#94a3b8' },
  'phone-stranger3': { x: 410, y: 125, name: 'Peer 3', color: '#94a3b8' },
  'phone-bridge': { x: 520, y: 65, name: 'Bridge (4G)', color: '#34d399' }
};

export default function MeshTopology({ devices, theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const isLight = theme === 'light';

    ctx.clearRect(0, 0, width, height);

    // Draw Basement Zone vs Surface Zone divider
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.08)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(465, 0);
    ctx.lineTo(465, height);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = isLight ? '#64748b' : 'rgba(148, 163, 184, 0.5)';
    ctx.font = '600 10px Inter';
    ctx.fillText('BASEMENT (NO SIGNAL)', 20, 20);
    ctx.fillStyle = isLight ? '#059669' : 'rgba(52, 211, 153, 0.7)';
    ctx.fillText('SURFACE (4G)', 480, 20);

    // Connections between mesh nodes
    const links = [
      ['phone-alice', 'phone-stranger1'],
      ['phone-stranger1', 'phone-stranger2'],
      ['phone-stranger2', 'phone-stranger3'],
      ['phone-stranger3', 'phone-bridge'],
      ['phone-alice', 'phone-stranger2'],
      ['phone-stranger2', 'phone-bridge']
    ];

    ctx.strokeStyle = isLight ? 'rgba(37, 99, 235, 0.22)' : 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 1.5;
    links.forEach(([fromId, toId]) => {
      const p1 = NODE_COORDINATES[fromId];
      const p2 = NODE_COORDINATES[toId];
      if (p1 && p2) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    Object.entries(NODE_COORDINATES).forEach(([id, coords]) => {
      const deviceState = devices.find((d) => d.deviceId === id);
      const hasPackets = deviceState && deviceState.packetCount > 0;
      const isBridge = id === 'phone-bridge';

      // Glow ring if holding packets
      if (hasPackets) {
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = isBridge 
          ? (isLight ? 'rgba(5, 150, 105, 0.2)' : 'rgba(52, 211, 153, 0.25)')
          : (isLight ? 'rgba(37, 99, 235, 0.2)' : 'rgba(59, 130, 246, 0.25)');
        ctx.fill();
      }

      // Bridge cellular signal animation wave
      if (isBridge) {
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 24, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? 'rgba(5, 150, 105, 0.35)' : 'rgba(52, 211, 153, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Core node dot
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = isBridge 
        ? (isLight ? '#059669' : '#10b981')
        : (hasPackets ? (isLight ? '#2563eb' : '#3b82f6') : (isLight ? '#94a3b8' : '#334155'));
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.fillStyle = isLight ? '#0f172a' : '#cbd5e1';
      ctx.font = '600 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(coords.name, coords.x, coords.y + 24);

      // Packet counter badge
      if (hasPackets) {
        ctx.fillStyle = isLight ? '#d97706' : '#fbbf24';
        ctx.font = 'bold 9px JetBrains Mono';
        ctx.fillText(`${deviceState.packetCount} pkt`, coords.x, coords.y - 14);
      }
    });
  }, [devices, theme]);

  return (
    <div className="saas-card">
      <div className="card-title-bar">
        <div className="card-heading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
          Mesh Network Topology
        </div>
        <div className="card-badge">{devices.length} Devices Active</div>
      </div>

      <div className="devices-container">
        {devices.map((d) => {
          const isBridge = d.hasInternet;
          return (
            <div key={d.deviceId} className={`device-row ${isBridge ? 'is-bridge' : ''}`}>
              <div className="device-info-left">
                <div className="device-avatar">
                  {isBridge ? '🌐' : '📱'}
                </div>
                <div>
                  <div className="device-id">
                    {d.deviceId}
                    <span className={`badge-status ${isBridge ? 'badge-status-bridge' : 'badge-status-offline'}`}>
                      {isBridge ? '4G GATEWAY' : 'OFFLINE BLE'}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Holding <strong>{d.packetCount}</strong> encrypted packet(s)
                  </div>
                </div>
              </div>
              <div className="device-packets-chips">
                {d.packetIds.length === 0 ? (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    No packets held
                  </span>
                ) : (
                  d.packetIds.map((id) => (
                    <span key={id} className="packet-chip">#{id}</span>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Mesh Topology Canvas */}
      <div className="topology-canvas-wrap">
        <span className="canvas-overlay-tag">LIVE MESH SIMULATION MAP</span>
        <canvas ref={canvasRef} id="meshCanvas" width="600" height="180"></canvas>
      </div>
    </div>
  );
}
