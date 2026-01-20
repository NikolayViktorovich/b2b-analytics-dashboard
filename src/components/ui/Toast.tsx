import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
}

const Toast = ({ message, type = 'info', onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500)
    return () => clearTimeout(timer)
  }, [onClose])

  let textColor = 'var(--text-primary)'
  if (type === 'success') textColor = '#4ade80'
  else if (type === 'error') textColor = '#f87171'

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '14px 18px',
        minWidth: '250px',
        maxWidth: '400px',
        zIndex: 10000,
        cursor: 'pointer',
        animation: 'slideIn 0.2s ease',
      }}
    >
      <div style={{ fontSize: '14px', color: textColor, fontWeight: 500 }}>
        {message}
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default Toast
