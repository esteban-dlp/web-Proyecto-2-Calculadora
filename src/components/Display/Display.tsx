import styles from './Display.module.css'

interface DisplayProps {
  value: string
}

export function Display({ value }: DisplayProps) {
  const isError = value === 'ERROR'
  return (
    <div className={styles.wrapper} aria-live="polite" aria-label="Pantalla de la calculadora">
      <span className={`${styles.value} ${isError ? styles.error : ''}`}>{value}</span>
    </div>
  )
}
