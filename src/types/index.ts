export type UserRole = 'admin' | 'manager' | 'viewer'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  permissions?: Permission[]
}

export interface AuthState {
  user: User | null
  isAuth: boolean
  token: string | null
}

export type Permission = 
  | 'dashboard:view'
  | 'dashboard:edit'
  | 'analytics:view'
  | 'analytics:export'
  | 'nps:view'
  | 'nps:manage'
  | 'website:view'
  | 'settings:view'
  | 'settings:edit'
  | 'users:view'
  | 'users:manage'
  | 'roles:manage'

export interface RoleUpdate {
  userId: string
  role: UserRole
  permissions: Permission[]
  updatedBy: string
  timestamp: number
}

export interface GAMetrics {
  activeUsers: number
  sessions: number
  pageViews: number
  bounceRate: number
  avgSessionDuration: number
  topPages: Array<{path: string, views: number}>
  trafficSources: Array<{source: string, users: number}>
}
