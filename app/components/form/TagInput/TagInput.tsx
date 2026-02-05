import { useState, useRef, useEffect } from "react";
import { TagInputProps, TagItem } from "./TagInput.type";
import styles from "./TagInput.module.scss";

export const TagInput = ({ placeholder = "", label = "" }: TagInputProps) => {
  const [currentInput, setCurrentInput] = useState<string>("");
  const [Tag, setTag] = useState<TagItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [duplicateValue, setDuplicateValue] = useState<string | null>(null);
  const lastAddedIdRef = useRef<string | null>(null);

  const onTagInput = (element: React.KeyboardEvent<HTMLInputElement>) => {
    if (currentInput === "") return;

    if (element.key === "Enter") {
      // ตรวจว่ามีซ้ำหรือไม่
      const newValue = currentInput.trim();
      const isDuplicate = Tag.some((t) => t.value === newValue);
      if (isDuplicate) {
        setDuplicateValue(newValue); // highlight tag ที่ซ้ำ
        setError(`AssetId "${newValue}" ถูกเพิ่มแล้ว`);
        return;
      }
      const newTag: TagItem = { id: crypto.randomUUID(), value: currentInput }; // collect tag id for scrolling
      setCurrentInput("");
      // sorting
      setTag((prev) => [...prev, newTag].sort((a, b) => a.value.localeCompare(b.value)));
      lastAddedIdRef.current = newTag.id; // เก็บ id ของ tag ที่เพิ่งเพิ่ม
      setDuplicateValue(null);
    }
  };

  const onDeleteTag = (idx: number): void => {
    const tagElement = document.querySelectorAll(`.${styles.tag_body}`)[idx];
    tagElement?.classList.add(styles.tag_removing);

    setTimeout(() => {
      setTag((prev) => prev.filter((_, i) => idx !== i));
    }, 150);
  };

  useEffect(() => {
    // duplicate effect
    if (duplicateValue) {
      const el = document.querySelector(`[data-tag-value="${duplicateValue}"]`) as HTMLElement;
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      const timer = setTimeout(() => {
        setDuplicateValue(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
    // create effect
    if (lastAddedIdRef.current) {
      const el = document.querySelector(
        `[data-tag-id="${lastAddedIdRef.current}"]`
      ) as HTMLElement;
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.classList.add(styles.tag_enter);
      const timer = setTimeout(() => {
        el?.classList.remove(styles.tag_enter); // reset class
        setDuplicateValue(null);
      }, 1000);
      lastAddedIdRef.current = null; // reset ref ไม่ trigger render
    }
  }, [Tag, duplicateValue, lastAddedIdRef]);

  return (
    <div className={styles.tagInput}>
      {label && <label htmlFor="">{label}</label>}
      <div className={styles.tag_collection}>
        {Tag.map((t, index) => (
          <div className={`${styles.tag_body} ${duplicateValue === t.value ? styles.tag_duplicate : ""}`} 
          key={t.id} data-tag-id={t.id} data-tag-value={t.value}>
            {t.value}
            <button
              onClick={() => onDeleteTag(index)}
              type="button"
              className={styles.tag_delete}
            >
              x
            </button>
          </div>
        ))}
        <input
          className={`${styles.tag_input} ${error ? styles.error_input : ""}`}
          placeholder={placeholder}
          value={currentInput}
          type="text"
          onChange={(e) => {
            setCurrentInput(e.target.value); 
            setError(null);
          }}
          onKeyDown={onTagInput}
        />
      </div>
    </div>
  );
};
