export const MAX_DISPLAY_LENGTH = 9
export const MAX_VALUE = 999999999
export const ERROR = 'ERROR'

export type Operator = '+' | '-' | '×' | '÷' | '%'

export function formatResult(value: number): string {
  if (isNaN(value) || !isFinite(value)) return ERROR
  if (value < 0) return ERROR
  if (value > MAX_VALUE) return ERROR

  const str = String(value)
  if (str.length <= MAX_DISPLAY_LENGTH) return str

  const fixed = value.toPrecision(MAX_DISPLAY_LENGTH - (str.includes('.') ? 0 : 1))
  const trimmed = parseFloat(fixed).toString()
  return trimmed.length <= MAX_DISPLAY_LENGTH ? trimmed : ERROR
}

export function compute(a: number, b: number, op: Operator): string {
  if (op === '÷') {
    if (b === 0) return ERROR
    return formatResult(a / b)
  }
  if (op === '%') return formatResult(a % b)
  if (op === '+') return formatResult(a + b)
  if (op === '-') return formatResult(a - b)
  if (op === '×') return formatResult(a * b)
  return ERROR
}

export function isError(display: string): boolean {
  return display === ERROR
}
