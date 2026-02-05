import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { TagInputProps, TagItem } from "./TagInput.type";
import styles from "./TagInput.module.scss";

export const TagInput = ({ placeholder = "", label = "" }: TagInputProps) => {
  const [currentInput, setCurrentInput] = useState<string>("");
  const [Tag, setTag] = useState<TagItem[]>([]);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  const onTagInput = (element: React.KeyboardEvent<HTMLInputElement>) => {
    if (currentInput === "") return;

    if (element.key === "Enter") {
      const newTag: TagItem = { id: crypto.randomUUID(), value: currentInput }; // collect tag id for scrolling
      setCurrentInput("");
      // sorting
      setTag((prev) => [...prev, newTag].sort((a, b) => a.value.localeCompare(b.value)));
      setLastAddedId(newTag.id); // เก็บ id ของ tag ที่เพิ่งเพิ่ม
    }
  };

  const onDeleteTag = (idx: number): void => {
    const tagElement = document.querySelectorAll(`.${styles.tag_body}`)[idx];
    tagElement?.classList.add(styles.tag_removing);

    setTimeout(() => {
      setTag((prev) => prev.filter((_, i) => idx !== i));
    }, 150);
  };

  // effect for scrolling
  useEffect(() => {
    if (lastAddedId) {
      const el = document.querySelector(`[data-tag-id="${lastAddedId}"]`) as HTMLElement;
      el?.scrollIntoView({ block: "center" });
      setLastAddedId(null); // reset
    }
  }, [Tag, lastAddedId]);

  return (
    <div className={styles.tagInput}>
      {label && <label htmlFor="">{label}</label>}
      <div className={styles.tag_collection}>
        {Tag.map((t, index) => (
          <div className={`${styles.tag_body} ${styles.tag_enter}`} 
          key={t.id} data-tag-id={t.id}>
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
