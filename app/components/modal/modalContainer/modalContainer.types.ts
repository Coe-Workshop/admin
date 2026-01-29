import { ReactNode } from "react";

export interface ModalContainerProps {
  opened: boolean;
  onClose: (id?: number) => void;
  children: ReactNode;
}
