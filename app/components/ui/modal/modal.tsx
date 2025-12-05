import { ReactNode } from "react";
import CreateItem from "../create_item/create";
import styles from "./modal.module.scss";
const Modal = ({
  modalState,
  onClose,
}: {
  modalState: Record<string, boolean>;
  onClose: (modalName: string) => void;
}) => {
  const ModalOptionsMapProps: Record<string, ReactNode> = {
    create: <CreateItem />,
  };

  return (
    <div className={styles.container}>
      {Object.entries(modalState).map(([modalName, isOpen], index) => {
        if (isOpen) {
          if (ModalOptionsMapProps[modalName])
            return (
              <div key={index} className={styles.modalContainer}>
                <div
                  className={styles.background}
                  onClick={() => {
                    onClose(modalName);
                  }}
                ></div>
                {ModalOptionsMapProps[modalName]}
              </div>
            );
          console.error(
            `[Modal Error] Component not found for modal: "${modalName}" 
            must provide component
            >11 | components/ui/modal/modal.tsx`
          );
          return;
        }
      })}
    </div>
  );
};

export default Modal;
