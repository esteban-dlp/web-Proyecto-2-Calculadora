import { CalcButton } from '../CalcButton'
import { Operator } from '../../utils/calculator'
import styles from './Keyboard.module.css'

interface KeyboardProps {
  onDigit: (d: string) => void
  onOperator: (op: Operator) => void
  onEquals: () => void
  onToggleSign: () => void
  onClear: () => void
}

type KeyType = 'digit' | 'op' | 'eq' | 'fn'
type Key = { label: string; type: KeyType; span?: number }

const KEYS: Key[] = [
  { label: 'C', type: 'fn' }, { label: '+/-', type: 'fn' },
  { label: '%', type: 'op' }, { label: '÷', type: 'op' },
  { label: '7', type: 'digit' }, { label: '8', type: 'digit' },
  { label: '9', type: 'digit' }, { label: '×', type: 'op' },
  { label: '4', type: 'digit' }, { label: '5', type: 'digit' },
  { label: '6', type: 'digit' }, { label: '-', type: 'op' },
  { label: '1', type: 'digit' }, { label: '2', type: 'digit' },
  { label: '3', type: 'digit' }, { label: '+', type: 'op' },
  { label: '0', type: 'digit', span: 2 }, { label: '.', type: 'digit' }, { label: '=', type: 'eq' }
]

const VARIANT_MAP: Record<KeyType, 'digit' | 'operator' | 'equals' | 'function'> = {
  digit: 'digit', op: 'operator', eq: 'equals', fn: 'function'
}

export function Keyboard({ onDigit, onOperator, onEquals, onToggleSign, onClear }: KeyboardProps) {
  function handleClick(key: Key) {
    if (key.label === 'C') return onClear()
    if (key.label === '+/-') return onToggleSign()
    if (key.label === '=') return onEquals()
    if (key.type === 'op') return onOperator(key.label as Operator)
    return onDigit(key.label)
  }

  return (
    <div className={styles.grid} role="group" aria-label="Teclado de la calculadora">
      {KEYS.map(key => (
        <div key={key.label} style={key.span ? { gridColumn: `span ${key.span}` } : undefined}>
          <CalcButton
            label={key.label}
            onClick={() => handleClick(key)}
            variant={VARIANT_MAP[key.type]}
          />
        </div>
      ))}
    </div>
  )
}
