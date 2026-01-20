import { describe, it, expect } from 'vitest'
import { parseGoogleUser, mapGoogleUserToUser } from '../googleAuth'

describe('googleAuth', () => {
  const mockCredential = 'header.' + btoa(JSON.stringify({
    email: 'test@example.com',
    name: 'Test User',
    picture: 'https://example.com/photo.jpg',
    sub: '123456789',
  })) + '.signature'

  it('parses google credential correctly', () => {
    const user = parseGoogleUser(mockCredential)
    expect(user).toEqual({
      email: 'test@example.com',
      name: 'Test User',
      picture: 'https://example.com/photo.jpg',
      sub: '123456789',
    })
  })

  it('returns null for invalid credential', () => {
    const user = parseGoogleUser('invalid')
    expect(user).toBeNull()
  })

  it('maps google user to app user', () => {
    const googleUser = {
      email: 'test@example.com',
      name: 'Test User',
      picture: 'https://example.com/photo.jpg',
      sub: '123456789',
    }
    
    const user = mapGoogleUserToUser(googleUser)
    expect(user).toEqual({
      id: '123456789',
      email: 'test@example.com',
      name: 'Test User',
      avatar: 'https://example.com/photo.jpg',
      role: 'manager',
    })
  })

  it('assigns admin role for admin emails', () => {
    const googleUser = {
      email: 'admin@example.com',
      name: 'Admin User',
      sub: '123',
    }
    
    const user = mapGoogleUserToUser(googleUser)
    expect(user.role).toBe('admin')
  })
})
