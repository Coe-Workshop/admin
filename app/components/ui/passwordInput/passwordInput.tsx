"use client";

import { PasswordInputProps } from "./tpyes";
import styles from "./passwordInput.module.scss";
import { useState } from "react";
import { EyeIcon } from "@/public/react-icon/eyeIcon";
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

      <div className={styles.inputWrapper}>
        <input
          className={styles.textInput_input}
          type={hide ? "password" : "text"}
          name={title}
          id={title}
          placeholder={placeholder}
        />

        <button
          type="button"
          className={styles.password_toggle}
          onClick={() => setHide(!hide)}
          aria-label={hide ? "แสดงรหัสผ่าน" : "ซ่อนรหัสผ่าน"}
        >
          <EyeIcon width={20} height={20} isHide={hide}></EyeIcon>
        </button>
      </div>
    </div>
  );
};
