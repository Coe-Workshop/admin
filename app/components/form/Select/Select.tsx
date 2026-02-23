"use client";

import { prefix } from "@/app/utils/prefix";
import styles from "./Select.module.scss";
import { SelectProps } from "./Select.types";
import SvgIconMono from "@/app/components/Icon/SvgIconMono";
import { useClickOutSide } from "@/app/hook/useClickOutside";
export const Select = <T extends string>({
  value,
  label,
  require = false,
  options,
  placeholder,
  errorMessage,
  onTop = false,
  onChange,
}: SelectProps<T>) => {
  const { ref, isOpen, setIsopen } = useClickOutSide();

  return (
    <div className={styles.select}>
      <h2>
        {label} {require && <span className={styles.require}> *</span>}
      </h2>
      <div
        onClick={() => setIsopen((prev) => !prev)}
        className={`${styles.input} ${isOpen ? styles.input_focus : ""} ${errorMessage ? styles.input_error : ""}`}
      >
        <h4 className={styles.input_value}>{!!value ? value : placeholder}</h4>

        <SvgIconMono
          className={`${styles.icon} ${onTop ? styles.icon_onTop : ""} ${isOpen ? styles.icon_focus : ""}`}
          src={`/icon/arrow.svg`}
          alt="arrow"
          width={12}
          height={12}
        ></SvgIconMono>
        {isOpen && (
          <div
            ref={ref}
            className={`${styles.input_choiceContainer} ${onTop ? styles.input_onTop : ""}`}
          >
            {options.map((prefix, index) => (
              <button
                className={styles.input_choice}
                type="button"
                onClick={() => {
                  onChange?.(prefix);
                }}
                key={index}
              >
                {prefix}
              </button>
            ))}
          </div>
        )}
      </div>
      {value === "" ||
        (errorMessage && (
          <h4 className={styles.errorMessage}>{errorMessage}</h4>
        ))}
    </div>
  );
};
