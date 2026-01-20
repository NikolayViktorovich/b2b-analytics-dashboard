import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true' || parseInt(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

export const sendEmail = async ({to, subject, html, text}) => {
  try {
    if(!process.env.SMTP_USER || !process.env.SMTP_PASS){
      return {success: false, message: 'Email не настроен'}
    }

    const info = await transporter.sendMail({
      from: `"Reddix Analytics" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html
    })

    return {success: true, messageId: info.messageId}
  } catch(error) {
    return {success: false, error: error.message}
  }
}

export const sendWeeklyReport = async (user, reportData) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .metric { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
        .metric-title { font-size: 14px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; }
        .metric-value { font-size: 32px; font-weight: bold; color: #111827; }
        .metric-change { font-size: 14px; color: #10b981; margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 32px;">Еженедельный отчет</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Reddix Analytics</p>
        </div>
        <div class="content">
          <p>Привет, ${user.name}!</p>
          <p>Вот сводка за прошедшую неделю:</p>
          
          <div class="metric">
            <div class="metric-title">Выручка</div>
            <div class="metric-value">$${((reportData.revenue || 0) / 1000).toFixed(1)}K</div>
            <div class="metric-change">↑ ${reportData.revenueChange || 0}% к прошлой неделе</div>
          </div>
          
          <div class="metric">
            <div class="metric-title">Заказы</div>
            <div class="metric-value">${reportData.orders || 0}</div>
            <div class="metric-change">↑ ${reportData.ordersChange || 0}% к прошлой неделе</div>
          </div>
          
          <div class="metric">
            <div class="metric-title">Конверсия</div>
            <div class="metric-value">${reportData.conversion || 0}%</div>
            <div class="metric-change">↑ ${reportData.conversionChange || 0}% к прошлой неделе</div>
          </div>
          
          <div class="metric">
            <div class="metric-title">NPS Score</div>
            <div class="metric-value">${reportData.nps || 0}</div>
          </div>
          
          <p style="margin-top: 30px;">
            <a href="${process.env.APP_URL || 'http://localhost:5173'}" 
               style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Открыть полный отчет
            </a>
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Reddix Analytics. Все права защищены.</p>
          <p>Вы получили это письмо, потому что подписаны на еженедельные отчеты.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
Еженедельный отчет Reddix Analytics

Привет, ${user.name}!

Вот сводка за прошедшую неделю:

Выручка: $${((reportData.revenue || 0) / 1000).toFixed(1)}K (↑ ${reportData.revenueChange || 0}%)
Заказы: ${reportData.orders || 0} (↑ ${reportData.ordersChange || 0}%)
Конверсия: ${reportData.conversion || 0}% (↑ ${reportData.conversionChange || 0}%)
NPS Score: ${reportData.nps || 0}

Откройте полный отчет: ${process.env.APP_URL || 'http://localhost:5173'}

© ${new Date().getFullYear()} Reddix Analytics
  `

  return sendEmail({
    to: user.email,
    subject: `Еженедельный отчет - ${new Date().toLocaleDateString('ru')}`,
    html,
    text
  })
}

export const sendNotification = async (user, {title, message, type = 'info'}) => {
  const icons = {
    success: '[OK]',
    error: '[ERROR]',
    warning: '[WARNING]',
    info: '[INFO]'
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body{font-family: Arial, sans-serif; line-height: 1.6; color: #333;}
        .container{max-width: 600px; margin: 0 auto; padding: 20px;}
        .notification{background: #f9fafb; padding: 30px; border-radius: 10px; border-left: 4px solid #667eea;}
        .title{font-size: 20px; font-weight: bold; margin-bottom: 15px;}
        .message{font-size: 16px; color: #4b5563;}
        .footer{text-align: center; padding: 20px; color: #6b7280; font-size: 12px;}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="notification">
          <div class="title">${icons[type]} ${title}</div>
          <div class="message">${message}</div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Reddix Analytics</p>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: user.email,
    subject: `${icons[type]} ${title}`,
    html,
    text: `${title}\n\n${message}`
  })
}
