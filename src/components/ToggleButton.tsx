// ToggleButton.tsx
// Usa este archivo como `ToggleButton.tsx`

import React, { useState } from 'react';
import styles from './ToggleButton.module.scss';

export type ToggleButtonProps = {
  /** estado inicial: true -> presionado ("desuso") */
  defaultOn?: boolean;
  /** callback cuando cambia el estado */
  onChange?: (on: boolean) => void;
  /** texto cuando está apagado (por defecto: "uso") */
  offLabel?: string;
  /** texto cuando está encendido (por defecto: "desuso") */
  onLabel?: string;
  className?: string;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  defaultOn = false,
  onChange,
  offLabel = 'Uso',
  onLabel = 'Baja',
  className = '',
}) => {
  const [on, setOn] = useState<boolean>(defaultOn);

  function toggle() {
    const next = !on;
    setOn(next);
    onChange?.(next);
  }

  return (
    <button
      type="button"
      aria-pressed={on}
      className={`${styles.toggle} ${on ? styles.on : ''} ${className}`}
      onClick={toggle}
      title={on ? onLabel : offLabel}
    >
      <span className={styles.track}>
        <span className={styles.thumb} />
      <span className={styles.label}>{on ? onLabel : offLabel}</span>

      </span>
    </button>
  );
};

export default ToggleButton;
