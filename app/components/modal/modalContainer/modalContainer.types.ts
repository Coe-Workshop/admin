import { ReactNode } from "react";

export interface ModalContainerProps {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
}
