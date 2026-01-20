import { useState, useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import MainDashboard from '@/components/dashboard/MainDashboard'
import AdminPanelPage from './AdminPanelPage'
import ManagerPanelPage from './ManagerPanelPage'
import NPSPage from './NPSPage'
import AnalyticsPage from './AnalyticsPage'
import WebsitePage from './WebsitePage'
import SettingsPage from './SettingsPage'

const DashboardPage = () => {
  const [currView, setCurrView] = useState('desktop')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const renderContent = () => {
    switch(currView) {
      case 'desktop': return <MainDashboard />
      case 'admin': return <AdminPanelPage />
      case 'manager': return <ManagerPanelPage />
      case 'analytics': return <AnalyticsPage />
      case 'website': return <WebsitePage />
      case 'nps': return <NPSPage />
      case 'settings': return <SettingsPage />
      default: return <MainDashboard />
    }
  }

  const container: React.CSSProperties = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    minHeight: '100vh',
    background: 'var(--bg-primary)',
  }

  const main: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }

  const content: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    background: 'var(--bg-primary)',
    paddingBottom: isMobile ? '60px' : '0',
  }

  return (
    <div style={container}>
      {!isMobile && <Sidebar currView={currView} onViewChange={setCurrView} />}
      <div style={main}>
        <Header />
        <div style={content}>
          {renderContent()}
        </div>
      </div>
      {isMobile && <Sidebar currView={currView} onViewChange={setCurrView} />}
    </div>
  )
}

export default DashboardPage
