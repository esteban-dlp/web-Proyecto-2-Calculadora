import { useReducer } from 'react'
import { compute, isError, MAX_DISPLAY_LENGTH, Operator } from '../utils/calculator'

export interface CalcState {
  display: string
  prevValue: string | null
  operator: Operator | null
  waitingForOperand: boolean
}

export const initialState: CalcState = {
  display: '0',
  prevValue: null,
  operator: null,
  waitingForOperand: false
}

export type CalcAction =
  | { type: 'DIGIT'; payload: string }
  | { type: 'OPERATOR'; payload: Operator }
  | { type: 'EQUALS' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'CLEAR' }

export function calcReducer(state: CalcState, action: CalcAction): CalcState {
  switch (action.type) {
    case 'DIGIT': {
      const d = action.payload
      if (isError(state.display)) return { ...initialState, display: d }
      if (state.waitingForOperand) return { ...state, display: d, waitingForOperand: false }
      if (state.display === '0' && d !== '.') return { ...state, display: d }
      if (state.display.length >= MAX_DISPLAY_LENGTH) return state
      if (d === '.' && state.display.includes('.')) return state
      return { ...state, display: state.display + d }
    }
    case 'OPERATOR': {
      if (isError(state.display)) return state
      if (state.operator && !state.waitingForOperand) {
        const result = compute(parseFloat(state.prevValue!), parseFloat(state.display), state.operator)
        return { display: result, prevValue: result, operator: action.payload, waitingForOperand: true }
      }
      return { ...state, prevValue: state.display, operator: action.payload, waitingForOperand: true }
    }
    case 'EQUALS': {
      if (!state.operator || !state.prevValue || isError(state.display)) return state
      const result = compute(parseFloat(state.prevValue), parseFloat(state.display), state.operator)
      return { display: result, prevValue: null, operator: null, waitingForOperand: true }
    }
    case 'TOGGLE_SIGN': {
      if (isError(state.display) || state.display === '0') return state
      const negated = state.display.startsWith('-') ? state.display.slice(1) : '-' + state.display
      if (negated.length > MAX_DISPLAY_LENGTH) return state
      return { ...state, display: negated }
    }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(calcReducer, initialState)

  return {
    display: state.display,
    handleDigit: (d: string) => dispatch({ type: 'DIGIT', payload: d }),
    handleOperator: (op: Operator) => dispatch({ type: 'OPERATOR', payload: op }),
    handleEquals: () => dispatch({ type: 'EQUALS' }),
    handleToggleSign: () => dispatch({ type: 'TOGGLE_SIGN' }),
    handleClear: () => dispatch({ type: 'CLEAR' })
  }
}
