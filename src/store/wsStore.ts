import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'
import type { RoleUpdate } from '@/types'

interface WSStore {
  socket: Socket | null
  connected: boolean
  connect: (token: string) => void
  disconnect: () => void
  onRoleUpdate: (callback: (update: RoleUpdate) => void) => void
}

export const useWSStore = create<WSStore>((set, get) => ({
  socket: null,
  connected: false,

  connect: (token: string) => {
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001'
    const socket = io(wsUrl, { auth: { token }, transports: ['websocket'] })

    socket.on('connect', () => set({ connected: true }))
    socket.on('disconnect', () => set({ connected: false }))
    set({ socket })
  },

  disconnect: () => {
    const { socket } = get()
    socket?.disconnect()
    set({ socket: null, connected: false })
  },

  onRoleUpdate: (callback: (update: RoleUpdate) => void) => {
    const { socket } = get()
    socket?.on('role:update', callback)
  },
}))
