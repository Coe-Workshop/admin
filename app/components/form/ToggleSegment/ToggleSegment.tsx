"use client";
import styles from "./ToggleSegment.module.scss";
import { useState, useRef, useEffect } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  data: string[];
}

export function ToggleSegment({ value, onChange, data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, transform: "translateX(0px)" });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector<HTMLButtonElement>(`[data-value="${value}"]`);
    if (!activeBtn) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    setIndicatorStyle({
      width: btnRect.width,
      transform: `translateX(${btnRect.left - containerRect.left - 3}px)`,
    });
  }, [value]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.indicator} style={indicatorStyle} />
      {data.map((item) => (
        <button
          key={item}
          data-value={item}
          className={`${styles.button} ${value === item ? styles.active : ""}`}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}