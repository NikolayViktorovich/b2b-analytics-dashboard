import { describe, it, expect } from 'vitest'
import { formatNum, formatCurrency, formatPercent } from '../format'

describe('format utils', () => {
  describe('formatNum', () => {
    it('should format numbers correctly', () => {
      expect(formatNum(500)).toBe('500')
      expect(formatNum(1500)).toBe('1.5K')
      expect(formatNum(1500000)).toBe('1.5M')
    })
  })

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1000)).toBe('$1,000')
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
    })
  })

  describe('formatPercent', () => {
    it('should format percent correctly', () => {
      expect(formatPercent(12.5)).toBe('+12.5%')
      expect(formatPercent(-5.2)).toBe('-5.2%')
    })
  })
})
