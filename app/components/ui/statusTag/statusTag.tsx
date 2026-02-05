import { statusVariant } from "@/app/types/api/transaction";
import styles from "./statusTag.module.scss";
import { StatusTagProps } from "./statusTag.types";
export const StatusTag = ({ status }: StatusTagProps) => {
  return (
    <div>
      <h3
        className={styles.statusTag}
        style={{ backgroundColor: statusVariant[status].color }}
      >
        {statusVariant[status].title}
      </h3>
    </div>
  );
};
