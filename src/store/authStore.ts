import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthState, UserRole } from '@/types'
import { rolePermissions } from '@/utils/permissions'

interface AuthStore extends AuthState {
  loginWithGoogle: (credential: string, accessCode: string) => Promise<any>
  logout: () => void
  setUser: (user: User) => void
  updateRole: (role: UserRole) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      token: null,

  loginWithGoogle: async (credential: string, accessCode: string) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
    const res = await fetch(`${apiUrl}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential, accessCode }),
    })

    if (!res.ok) throw new Error('Auth failed')

    const data = await res.json()
    set({
      user: { ...data.user, permissions: rolePermissions[data.user.role as UserRole] },
      isAuth: true,
      token: data.token,
    })
    
    return data
  },

      logout: () => set({ user: null, isAuth: false, token: null }),

      setUser: (user: User) => set({ user }),

      updateRole: (role: UserRole) => set(state => ({
        user: state.user ? { ...state.user, role, permissions: rolePermissions[role] } : null,
      })),
    }),
    {
      name: 'auth-storage',
    }
  )
)
