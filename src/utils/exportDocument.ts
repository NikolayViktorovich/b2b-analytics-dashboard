export const exportToDocument = (data: any, filename: string) => {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value)
  }

  let content = ''
  
  content += 'REDDIX ANALYTICS\n'
  content += 'Отчет по данным системы\n\n'
  
  content += `Дата создания: ${formatDate(new Date())}\n`
  content += `Тип отчета: ${data.title || 'Общий отчет'}\n\n`
  

  if (data.dashboard) {
    content += 'ОСНОВНЫЕ ПОКАЗАТЕЛИ\n\n'
    
    if (data.dashboard.stats) {
      const stats = data.dashboard.stats
      
      if (stats.revenue) {
        content += `  Выручка:           ${formatCurrency(stats.revenue.value)}\n`
        content += `  Изменение:         ${stats.revenue.change > 0 ? '↑' : '↓'} ${Math.abs(stats.revenue.change)}%\n\n`
      }
      
      if (stats.orders) {
        content += `  Заказы:            ${formatNumber(stats.orders.value)}\n`
        content += `  Изменение:         ${stats.orders.change > 0 ? '↑' : '↓'} ${Math.abs(stats.orders.change)}%\n\n`
      }
      
      if (stats.avgOrder) {
        content += `  Средний чек:       ${formatCurrency(stats.avgOrder.value)}\n\n`
      }
      
      if (stats.conversion) {
        content += `  Конверсия:         ${stats.conversion.value}%\n`
        content += `  Изменение:         ${stats.conversion.change > 0 ? '↑' : '↓'} ${Math.abs(stats.conversion.change)}%\n\n`
      }
    }
    
  }

  if (data.analytics) {
    content += 'АНАЛИТИКА ПРОДАЖ\n\n'
    
    if (data.analytics.totalRevenue !== undefined) {
      content += `  Общая выручка:     ${formatCurrency(data.analytics.totalRevenue)}\n`
    }
    if (data.analytics.totalOrders !== undefined) {
      content += `  Всего заказов:     ${formatNumber(data.analytics.totalOrders)}\n`
    }
    if (data.analytics.avgOrderValue !== undefined) {
      content += `  Средний чек:       ${formatCurrency(data.analytics.avgOrderValue)}\n`
    }
    
  }

  if (data.website) {
    content += 'ВЕБ-ТРАФИК\n\n'
    
    if (data.website.visitors !== undefined) {
      content += `  Посетители:        ${formatNumber(data.website.visitors)}\n`
    }
    if (data.website.pageViews !== undefined) {
      content += `  Просмотры страниц: ${formatNumber(data.website.pageViews)}\n`
    }
    if (data.website.bounceRate !== undefined) {
      content += `  Показатель отказов: ${data.website.bounceRate}%\n`
    }
    if (data.website.avgDuration) {
      content += `  Среднее время:     ${data.website.avgDuration}\n`
    }
    
  }

  if (data.nps) {
    content += 'NPS ПОКАЗАТЕЛИ\n\n'
    
    if (data.nps.score !== undefined) {
      content += `  NPS Score:         ${data.nps.score}\n`
    }
    if (data.nps.promoters !== undefined) {
      content += `  Промоутеры:        ${data.nps.promoters}%\n`
    }
    if (data.nps.passives !== undefined) {
      content += `  Нейтральные:       ${data.nps.passives}%\n`
    }
    if (data.nps.detractors !== undefined) {
      content += `  Критики:           ${data.nps.detractors}%\n`
    }
    
  }

  if (data.segments) {
    content += 'СЕГМЕНТЫ КЛИЕНТОВ\n\n'
    
    if (data.segments.vip) {
      content += `  VIP клиенты:       ${formatNumber(data.segments.vip.count)}\n`
      content += `  Критерий:          ${data.segments.vip.criteria}\n\n`
    }
    if (data.segments.active) {
      content += `  Активные:          ${formatNumber(data.segments.active.count)}\n`
      content += `  Критерий:          ${data.segments.active.criteria}\n\n`
    }
    if (data.segments.sleeping) {
      content += `  Спящие:            ${formatNumber(data.segments.sleeping.count)}\n`
      content += `  Критерий:          ${data.segments.sleeping.criteria}\n\n`
    }
    
    if (data.segments.total) {
      content += `  Всего клиентов:    ${formatNumber(data.segments.total)}\n`
    }
    
  }

  content += '© Reddix Analytics ' + new Date().getFullYear() + '\n'

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
