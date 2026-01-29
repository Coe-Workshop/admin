import { useState } from "react";
import { TagInputProps } from "./TagInput.type";
import styles from "./TagInput.module.scss";
export const TagInput = ({ placeholder = "", label = "" }: TagInputProps) => {
  const [currentInput, setCurrentInput] = useState<string>("");
  const [Tag, setTag] = useState<string[]>([]);

  const onTagInput = (element: React.KeyboardEvent<HTMLInputElement>) => {
    if (currentInput === "") {
      return;
    } else if (element.key === "Enter") {
      setTag((prev) => [...prev, currentInput]);
      setCurrentInput("");
    } else {
      setCurrentInput(element.currentTarget.value);
    }
  };

  const onDeleteTag = (idx: number): void => {
    setTag((prev) => prev.filter((_, i) => idx != i));
  };
  return (
    <div className={styles.tagInput}>
      {label && <label htmlFor="">{label}</label>}
      <div className={styles.tag_collection}>
        {Tag.map((t, index) => (
          <h2 className={styles.tag_body} key={index}>
            {t}{" "}
            <button
              onClick={() => onDeleteTag(index)}
              type="button"
              className={styles.tag_delete}
            >
              x
            </button>
          </h2>
        ))}
        <input
          className={styles.tag_input}
          placeholder={placeholder}
          value={currentInput}
          type="text"
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={onTagInput}
        />
      </div>
    </div>
  );
};
