import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import MainDashboard from '@/components/dashboard/MainDashboard'

const DashboardPage = () => {
  const [currView, setCurrView] = useState('desktop')

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    background: 'var(--bg-primary)',
  }

  const mainStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    background: 'var(--bg-primary)',
  }

  return (
    <div style={containerStyle}>
      <Sidebar currView={currView} onViewChange={setCurrView} />
      <div style={mainStyle}>
        <Header />
        <div style={contentStyle}>
          <MainDashboard />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
