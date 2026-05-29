import { useEffect } from 'react'
import { Display } from '../Display'
import { Keyboard } from '../Keyboard'
import { useCalculator } from '../../hooks/useCalculator'
import { Operator } from '../../utils/calculator'
import styles from './Calculator.module.css'

export function Calculator() {
  const { display, handleDigit, handleOperator, handleEquals, handleToggleSign, handleClear } = useCalculator()

  useEffect(() => {
    const map: Record<string, () => void> = {
      '0': () => handleDigit('0'), '1': () => handleDigit('1'), '2': () => handleDigit('2'),
      '3': () => handleDigit('3'), '4': () => handleDigit('4'), '5': () => handleDigit('5'),
      '6': () => handleDigit('6'), '7': () => handleDigit('7'), '8': () => handleDigit('8'),
      '9': () => handleDigit('9'), '.': () => handleDigit('.'),
      '+': () => handleOperator('+'), '-': () => handleOperator('-'),
      '*': () => handleOperator('×'), '/': () => handleOperator('÷'),
      'Enter': handleEquals, '=': handleEquals,
      'Escape': handleClear, 'Backspace': handleClear
    }
    const onKeyDown = (e: KeyboardEvent) => {
      const fn = map[e.key]
      if (fn) { e.preventDefault(); fn() }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleDigit, handleOperator, handleEquals, handleClear])

  return (
    <main className={styles.wrapper} aria-label="Calculadora">
      <div className={styles.calculator}>
        <Display value={display} />
        <Keyboard
          onDigit={handleDigit}
          onOperator={(op: Operator) => handleOperator(op)}
          onEquals={handleEquals}
          onToggleSign={handleToggleSign}
          onClear={handleClear}
        />
      </div>
    </main>
  )
}
