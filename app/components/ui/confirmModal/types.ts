export enum ConfirmTypes {
  "Delete",
  "Confirm",
}

export interface ModalConfirmProps {
  title: string;
  description?: string;
  action: () => void;
  confirmTypes: ConfirmTypes;
}
