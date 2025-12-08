"use client";

import { ItemTransaction } from "./components/ui/itemTransaction/itemTransaction";
import { Tooltip } from "./components/ui/tooltip/tooltip";
import styles from "./page.module.scss";
import { useClickOutSide } from "./hook/useClickOutside";
function page() {
  const { ref, isOpen, setIsopen } = useClickOutSide();
  return (
    <div className={styles.landing}>
      <ItemTransaction></ItemTransaction>
      <div style={{ marginTop: "50px", marginInline: "400px" }}>
        <Tooltip title={"tool"}>
          <button onClick={() => setIsopen(true)} ref={ref} type="button">
            {isOpen ? "click is side" : "outside"}
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default page;
