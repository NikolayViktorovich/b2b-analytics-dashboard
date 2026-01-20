import { sendEmail, sendWeeklyReport, sendNotification } from './emailService.js'

const pushSubscriptions = new Map()

export const subscribeToPush = (userId, subscription) => {
  pushSubscriptions.set(userId, subscription)
}

export const unsubscribeFromPush = (userId) => {
  pushSubscriptions.delete(userId)
}

export const sendPushNotification = async (userId, {title, body, icon, data}) => {
  const subscription = pushSubscriptions.get(userId)
  
  if(!subscription){
    return {success: false, message: 'Подписка не найдена'}
  }

  try{
    return {success: true, message: 'Push отправлен'}
  }catch(error){
    return {success: false, error: error.message}
  }
}

export const notifyUser = async (user, notification) => {
  const results = {}

  if (user.notifications?.emailNotifications) {
    results.email = await sendNotification(user, notification)
  }

  if (user.notifications?.pushNotifications) {
    results.push = await sendPushNotification(user._id, {
      title: notification.title,
      body: notification.message,
      icon: '/vite.svg',
      data: notification.data
    })
  }

  return results
}

export const sendWeeklyReports = async (User, Dashboard, NPS) => {
  try{
    const users = await User.find({
      'notifications.weeklyReport': true,
      isActive: true
    })

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

    const results = await Promise.allSettled(
      users.map(user => sendWeeklyReport(user, reportData))
    )

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length
    const failed = results.length - successful

    return {successful, failed, total: results.length}
  }catch(error){
    throw error
  }
}
