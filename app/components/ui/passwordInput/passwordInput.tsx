"use client";

import { PasswordInputProps } from "./tpyes";
import styles from "./passwordInput.module.scss";
import { useState } from "react";

export const PasswordInput = ({
  title,
  placeholder = "",
  require = true,
}: PasswordInputProps) => {
  const [hide, setHide] = useState(true);
  return (
    <div className={styles.textInput}>
      {title && (
        <label htmlFor={title} className={styles.textInput_label}>
          {title}
          <span className={styles.textInput_require}>{require ? "*" : ""}</span>
        </label>
      )}

      <input
        className={styles.textInput_input}
        type={hide ? "password" : "text"}
        name={title}
        id={title}
        placeholder={placeholder}
      ></input>
      <button
        onClick={() => setHide((prev) => !prev)}
        type="button"
        className={styles.password_toggle}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
          {hide && (
            <line
              className="hs-password-active:hidden"
              x1="2"
              x2="22"
              y1="2"
              y2="22"
            ></line>
          )}
          <path
            className="hidden hs-password-active:block"
            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
          ></path>
          <circle
            className="hidden hs-password-active:block"
            cx="12"
            cy="12"
            r="3"
          ></circle>
        </svg>
      </button>
    </div>
  );
};
