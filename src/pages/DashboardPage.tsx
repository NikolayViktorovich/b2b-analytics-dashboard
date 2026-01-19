import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import MainDashboard from '@/components/dashboard/MainDashboard'
import NPSPage from './NPSPage'

const DashboardPage = () => {
  const [currView, setCurrView] = useState('desktop')

  const renderContent = () => {
    switch (currView) {
      case 'desktop':
        return <MainDashboard />
      case 'nps':
        return <NPSPage />
      default:
        return <MainDashboard />
    }
  }

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
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
