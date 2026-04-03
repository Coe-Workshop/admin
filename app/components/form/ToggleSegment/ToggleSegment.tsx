"use client";
import styles from "./ToggleSegment.module.scss";

export const ToggleSegment = ({ value, onChange, data }: ToggleSegmentProps) => {
  return (
    <div className={styles.container}>
      {data.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={`${styles.button} ${value === item.value ? styles.active : ""}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};