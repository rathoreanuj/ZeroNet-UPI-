import React from 'react';

export default function ToastContainer({ toasts }) {
  const colorMap = {
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)',
    info: 'var(--accent-primary)',
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="saas-toast">
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: colorMap[toast.type] || colorMap.info,
              flexShrink: 0,
            }}
          ></div>
          <div>
            <strong
              style={{
                display: 'block',
                fontSize: '12px',
                color: colorMap[toast.type] || colorMap.info,
              }}
            >
              {toast.title}
            </strong>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {toast.message}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
