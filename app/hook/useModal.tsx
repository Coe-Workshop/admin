import { useCallback, useState } from "react";
import { ModalConfirmProps } from "../components/ui/confirmModal/types";
export const useModal = () => {
  const [modalState, setModalState] = useState<Record<string, boolean>>({});
  const [modalConfirm, setModalConfirm] = useState<ModalConfirmProps>();
  const open = useCallback((modalName: string) => {
    setModalState((prev) => ({ ...prev, [modalName]: true }));
  }, []);

  const close = useCallback((modalName: string) => {
    setModalState((prev) => ({ ...prev, [modalName]: false }));
  }, []);

  const createConfirm = useCallback((modalConfirm: ModalConfirmProps) => {
    setModalState((prev) => ({ ...prev, ["confirm"]: true }));
    setModalConfirm(modalConfirm);
  }, []);

  const toggle = useCallback((modalName: string) => {
    setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  }, []);

  return {
    modalState,
    modalConfirm,
    handle: {
      open,
      close,
      toggle,
      createConfirm,
    },
  };
};
