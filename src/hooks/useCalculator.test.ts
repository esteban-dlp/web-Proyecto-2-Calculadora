import { describe, it, expect } from 'vitest'
import { calcReducer, initialState, CalcState } from './useCalculator'

function apply(actions: Parameters<typeof calcReducer>[1][], state = initialState): CalcState {
  return actions.reduce((s, a) => calcReducer(s, a), state)
}

describe('calcReducer', () => {
  it('starts with display showing 0', () => {
    expect(initialState.display).toBe('0')
  })

  it('concatenates digits correctly', () => {
    const state = apply([
      { type: 'DIGIT', payload: '1' },
      { type: 'DIGIT', payload: '2' },
      { type: 'DIGIT', payload: '3' }
    ])
    expect(state.display).toBe('123')
  })

  it('ignores digits after the 9-character limit', () => {
    const digits = ['1','2','3','4','5','6','7','8','9','0'].map(d => ({ type: 'DIGIT' as const, payload: d }))
    const state = apply(digits)
    expect(state.display).toBe('123456789')
    expect(state.display.length).toBe(9)
  })

  it('performs addition and shows result', () => {
    const state = apply([
      { type: 'DIGIT', payload: '5' },
      { type: 'OPERATOR', payload: '+' },
      { type: 'DIGIT', payload: '3' },
      { type: 'EQUALS' }
    ])
    expect(state.display).toBe('8')
  })

  it('shows ERROR when subtraction result is negative', () => {
    const state = apply([
      { type: 'DIGIT', payload: '3' },
      { type: 'OPERATOR', payload: '-' },
      { type: 'DIGIT', payload: '9' },
      { type: 'EQUALS' }
    ])
    expect(state.display).toBe('ERROR')
  })

  it('resets after pressing a digit in ERROR state', () => {
    const errorState = apply([
      { type: 'DIGIT', payload: '1' },
      { type: 'OPERATOR', payload: '-' },
      { type: 'DIGIT', payload: '9' },
      { type: 'EQUALS' }
    ])
    expect(errorState.display).toBe('ERROR')
    const recovered = calcReducer(errorState, { type: 'DIGIT', payload: '5' })
    expect(recovered.display).toBe('5')
  })

  it('evaluates chained operations and shows intermediate result', () => {
    const afterFirst = apply([
      { type: 'DIGIT', payload: '2' },
      { type: 'OPERATOR', payload: '+' },
      { type: 'DIGIT', payload: '3' },
      { type: 'OPERATOR', payload: '×' }
    ])
    expect(afterFirst.display).toBe('5')

    const final = apply([
      { type: 'DIGIT', payload: '4' },
      { type: 'EQUALS' }
    ], afterFirst)
    expect(final.display).toBe('20')
  })

  it('divides numbers correctly', () => {
    const state = apply([
      { type: 'DIGIT', payload: '9' },
      { type: 'OPERATOR', payload: '÷' },
      { type: 'DIGIT', payload: '3' },
      { type: 'EQUALS' }
    ])
    expect(state.display).toBe('3')
  })

  it('returns ERROR on division by zero', () => {
    const state = apply([
      { type: 'DIGIT', payload: '5' },
      { type: 'OPERATOR', payload: '÷' },
      { type: 'DIGIT', payload: '0' },
      { type: 'EQUALS' }
    ])
    expect(state.display).toBe('ERROR')
  })

  it('handles decimal point input', () => {
    const state = apply([
      { type: 'DIGIT', payload: '3' },
      { type: 'DIGIT', payload: '.' },
      { type: 'DIGIT', payload: '5' }
    ])
    expect(state.display).toBe('3.5')
  })

  it('ignores duplicate decimal points', () => {
    const state = apply([
      { type: 'DIGIT', payload: '1' },
      { type: 'DIGIT', payload: '.' },
      { type: 'DIGIT', payload: '2' },
      { type: 'DIGIT', payload: '.' },
      { type: 'DIGIT', payload: '3' }
    ])
    expect(state.display).toBe('1.23')
  })

  it('computes modulo correctly', () => {
    const state = apply([
      { type: 'DIGIT', payload: '1' },
      { type: 'DIGIT', payload: '0' },
      { type: 'OPERATOR', payload: '%' },
      { type: 'DIGIT', payload: '3' },
      { type: 'EQUALS' }
    ])
    expect(state.display).toBe('1')
  })

  it('toggles sign with TOGGLE_SIGN action', () => {
    const positive = apply([{ type: 'DIGIT', payload: '7' }])
    const negative = calcReducer(positive, { type: 'TOGGLE_SIGN' })
    expect(negative.display).toBe('-7')
    const backToPositive = calcReducer(negative, { type: 'TOGGLE_SIGN' })
    expect(backToPositive.display).toBe('7')
  })

  it('clears state with CLEAR action', () => {
    const state = apply([
      { type: 'DIGIT', payload: '5' },
      { type: 'DIGIT', payload: '5' },
      { type: 'CLEAR' }
    ])
    expect(state.display).toBe('0')
    expect(state.operator).toBeNull()
    expect(state.prevValue).toBeNull()
  })

  it('shows ERROR when sum exceeds 999999999', () => {
    const nines = ['9','9','9','9','9','9','9','9','9'].map(d => ({ type: 'DIGIT' as const, payload: d }))
    const state = apply([
      ...nines,
      { type: 'OPERATOR', payload: '+' },
      { type: 'DIGIT', payload: '1' },
      { type: 'EQUALS' }
    ])
    expect(state.display).toBe('ERROR')
  })
})
