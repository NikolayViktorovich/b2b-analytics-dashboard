export type UserRole = 'admin' | 'manager' | 'viewer'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

export interface AuthState {
  user: User | null
  isAuth: boolean
  token: string | null
}

export type Permission = 
  | 'dashboard:view'
  | 'dashboard:edit'
  | 'dashboard:delete'
  | 'widget:create'
  | 'widget:edit'
  | 'widget:delete'
  | 'export:pdf'
  | 'export:excel'
  | 'users:manage'

export interface WidgetData {
  id: string
  type: 'chart' | 'stat' | 'table' | 'map'
  title: string
  data: any
  config?: Record<string, any>
}

export interface DashboardLayout {
  i: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
}

export interface Dashboard {
  id: string
  name: string
  widgets: WidgetData[]
  layout: DashboardLayout[]
  createdBy: string
  updatedAt: string
}

export interface StatCard {
  label: string
  value: string | number
  change?: number
  icon?: string
}

export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: any
}
