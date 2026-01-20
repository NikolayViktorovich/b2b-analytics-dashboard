import type { User } from '@/types'

interface GoogleUser {
  email: string
  name: string
  picture?: string
  sub: string
}

export const parseGoogleUser = (credential: string): GoogleUser | null => {
  try {
    const payload = JSON.parse(atob(credential.split('.')[1]))
    return { email: payload.email, name: payload.name, picture: payload.picture, sub: payload.sub }
  } catch {
    return null
  }
}

export const mapGoogleUserToUser = (googleUser: GoogleUser): User => ({
  id: googleUser.sub,
  email: googleUser.email,
  name: googleUser.name,
  avatar: googleUser.picture,
  role: googleUser.email.includes('admin') ? 'admin' : 'manager',
})
