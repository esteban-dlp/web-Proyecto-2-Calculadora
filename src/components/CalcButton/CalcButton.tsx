import styles from './CalcButton.module.css'

export type ButtonVariant = 'digit' | 'operator' | 'equals' | 'function'

interface CalcButtonProps {
  label: string
  onClick: () => void
  variant?: ButtonVariant
  ariaLabel?: string
}

export function CalcButton({ label, onClick, variant = 'digit', ariaLabel }: CalcButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      type="button"
    >
      {label}
    </button>
  )
}
