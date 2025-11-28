import React, { useState } from "react";
import styles from "./ToggleButton.module.scss";

export type ToggleButtonProps = {
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
  offLabel?: string;
  onLabel?: string;
  className?: string;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  defaultOn = false,
  onChange,
  offLabel = "Uso",
  onLabel = "Baja",
  className = "",
}) => {
  const [on, setOn] = useState<boolean>(defaultOn);

  function toggle() {
    const next = !on;
    setOn(next);
    onChange?.(next);
  }

  return (
    <section className={styles.containerToggle}>
      <button
        type="button"
        aria-pressed={on}
        className={`${styles.toggle} ${on ? styles.on : ""} ${className}`}
        onClick={toggle}
        title={on ? onLabel : offLabel}
      >
        <span className={styles.track}>
          <span className={styles.thumb} />
          <span className={styles.label}>{on ? onLabel : offLabel}</span>
        </span>
      </button>
    </section>
  );
};

export default ToggleButton;
