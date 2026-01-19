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
