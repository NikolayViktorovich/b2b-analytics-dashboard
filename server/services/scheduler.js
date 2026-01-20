import cron from 'node-cron'
import { sendWeeklyReports } from './notificationService.js'
import User from '../models/User.js'
import Dashboard from '../models/Dashboard.js'
import NPS from '../models/NPS.js'

export const startScheduler = () => {
  cron.schedule('0 9 * * 1', async () => {
    try{
      await sendWeeklyReports(User, Dashboard, NPS)
    }catch(error){
      // silent fail
    }
  }, {
    timezone: 'Europe/Moscow'
  })
}

export const sendTestReport = async (userId) => {
  try{
    const user = await User.findById(userId)
    if(!user) throw new Error('Пользователь не найден')

    const [dashboardData, npsData] = await Promise.all([
      Dashboard.findOne(),
      NPS.findOne().sort({createdAt: -1})
    ])

    const reportData = {
      revenue: dashboardData?.stats?.revenue?.value || 0,
      revenueChange: dashboardData?.stats?.revenue?.change || 0,
      orders: dashboardData?.stats?.orders?.value || 0,
      ordersChange: dashboardData?.stats?.orders?.change || 0,
      conversion: dashboardData?.stats?.conversion?.value || 0,
      conversionChange: dashboardData?.stats?.conversion?.change || 0,
      nps: npsData?.score || 0
    }

    const {sendWeeklyReport} = await import('./emailService.js')
    return await sendWeeklyReport(user, reportData)
  }catch(error){
    throw error
  }
}
