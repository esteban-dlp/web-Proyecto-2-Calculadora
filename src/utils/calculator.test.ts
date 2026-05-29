import { describe, it, expect } from 'vitest'
import { compute, formatResult, MAX_DISPLAY_LENGTH, ERROR } from './calculator'

describe('formatResult', () => {
  it('returns the number as string when within limits', () => {
    expect(formatResult(42)).toBe('42')
  })

  it('returns ERROR for negative numbers', () => {
    expect(formatResult(-1)).toBe(ERROR)
  })

  it('returns ERROR when result exceeds MAX_VALUE (999999999)', () => {
    expect(formatResult(1000000000)).toBe(ERROR)
  })

  it('formats division result to fit within 9 characters', () => {
    const result = formatResult(1 / 3)
    expect(result.length).toBeLessThanOrEqual(MAX_DISPLAY_LENGTH)
  })

  it('returns ERROR for NaN', () => {
    expect(formatResult(NaN)).toBe(ERROR)
  })

  it('returns ERROR for Infinity', () => {
    expect(formatResult(Infinity)).toBe(ERROR)
  })
})

describe('compute', () => {
  it('adds two numbers correctly', () => {
    expect(compute(3, 4, '+')).toBe('7')
  })

  it('returns ERROR when subtraction result is negative', () => {
    expect(compute(3, 10, '-')).toBe(ERROR)
  })

  it('multiplies two numbers correctly', () => {
    expect(compute(6, 7, '×')).toBe('42')
  })

  it('returns ERROR when multiplication exceeds 999999999', () => {
    expect(compute(100000, 10000, '×')).toBe(ERROR)
  })

  it('divides two numbers correctly', () => {
    expect(compute(10, 2, '÷')).toBe('5')
  })

  it('returns ERROR for division by zero', () => {
    expect(compute(5, 0, '÷')).toBe(ERROR)
  })

  it('computes modulo correctly', () => {
    expect(compute(10, 3, '%')).toBe('1')
  })

  it('returns zero for 0 mod anything', () => {
    expect(compute(0, 5, '%')).toBe('0')
  })
})
