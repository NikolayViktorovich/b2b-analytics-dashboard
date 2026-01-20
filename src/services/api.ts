import { useAuthStore } from '@/store/authStore'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

class ApiClient {
  private getHeaders() {
    const token = useAuthStore.getState().token
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: { ...this.getHeaders(), ...options?.headers }
    })

    if (response.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
      throw new Error('Unauthorized')
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(error.error || 'Request failed')
    }

    return response.json()
  }

  async get<T>(endpoint: string) {
    return this.request<T>(endpoint)
  }

  async post<T>(endpoint: string, data?: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async patch<T>(endpoint: string, data?: unknown) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  async delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const api = new ApiClient()

export const dashboardApi = {
  getStats: (period: string) => api.get(`/dashboard?period=${period}`),
  getDashboard: (period: string) => api.get(`/dashboard?period=${period}`)
}

export const analyticsApi = {
  getAll: (params?: { startDate?: string; endDate?: string; period?: string }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString()
    return api.get(`/analytics${query ? '?' + query : ''}`)
  },
  getRevenue: () => api.get('/analytics/revenue'),
  getProducts: () => api.get('/analytics/products'),
  getCategories: () => api.get('/analytics/categories'),
  getGeography: () => api.get('/analytics/geography'),
  getFunnel: () => api.get('/analytics/funnel'),
  getRFM: () => api.get('/analytics/rfm')
}

export const npsApi = {
  getAll: (params?: { startDate?: string; endDate?: string }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString()
    return api.get(`/nps${query ? '?' + query : ''}`)
  },
  getCurrent: () => api.get('/nps/current'),
  getTrend: () => api.get('/nps/trend'),
  getReviews: (params?: { category?: string; limit?: number }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString()
    return api.get(`/nps/reviews${query ? '?' + query : ''}`)
  }
}

export const websiteApi = {
  getAll: (params?: { startDate?: string; endDate?: string }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString()
    return api.get(`/website${query ? '?' + query : ''}`)
  },
  getTraffic: () => api.get('/website/traffic'),
  getSources: () => api.get('/website/sources'),
  getDevices: () => api.get('/website/devices'),
  getPages: () => api.get('/website/pages')
}

export const usersApi = {
  getAll: () => api.get('/users'),
  create: (data: { name: string; email: string; role: string }) => 
    api.post('/users', data),
  update: (userId: number, data: { name?: string; email?: string; role?: string }) => 
    api.patch(`/users/${userId}`, data),
  delete: (userId: number) => 
    api.delete(`/users/${userId}`),
  updateRole: (userId: string, role: string) => 
    api.patch(`/users/${userId}/role`, { role }),
  updateStatus: (userId: string, isActive: boolean) => 
    api.patch(`/users/${userId}/status`, { isActive })
}

export const systemApi = {
  getLogs: (limit?: number) => api.get(`/system/logs${limit ? `?limit=${limit}` : ''}`),
  clearCache: () => api.post('/system/cache/clear'),
  createBackup: (data?: { name?: string; description?: string }) => 
    api.post('/system/backup', data),
  getBackups: () => api.get('/system/backups'),
  getBackup: (id: string) => api.get(`/system/backups/${id}`),
  deleteBackup: (id: string) => api.delete(`/system/backups/${id}`),
  getStats: () => api.get('/system/stats')
}
