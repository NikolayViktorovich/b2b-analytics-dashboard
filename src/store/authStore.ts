import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthState } from '@/types'

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      token: null,

      login: async (email: string, pwd: string) => {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          role: email.includes('admin') ? 'admin' : 'manager',
        }

        set({
          user: mockUser,
          isAuth: true,
          token: 'mock-jwt-token',
        })
      },

      logout: () => {
        set({
          user: null,
          isAuth: false,
          token: null,
        })
      },

      setUser: (user: User) => {
        set({ user })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
