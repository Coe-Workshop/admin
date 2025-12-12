import { Status, statusVariant } from "@/app/types/api/transaction";
import { StatusTagProps } from "./statusTag.types";
import styles from "./statusTag.module.scss";
export const StatusTag = ({ status }: StatusTagProps) => {
  const data = statusVariant[status];
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
