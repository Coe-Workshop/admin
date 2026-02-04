import styles from "./modalContainer.module.scss";
import { ModalContainerProps } from "./modalContainer.types";
export const ModalContainer = ({
  opened,
  onClose,
  children,
}: ModalContainerProps) => {
  if (opened)
    return (
      <div className={styles.modalContainer}>
        <div
          className={styles.background}
          onClick={() => {
            onClose();
          }}
        ></div>
        {children}
      </div>
    );
};
