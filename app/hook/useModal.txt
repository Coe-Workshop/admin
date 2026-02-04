import { useCallback, useState } from "react";

export const useModal = () => {
  const [modalState, setModalState] = useState<Record<string, boolean>>({});

  const open = useCallback((modalName: string) => {
    setModalState((prev) => ({ ...prev, [modalName]: true }));
  }, []);

  const close = useCallback((modalName: string) => {
    setModalState((prev) => ({ ...prev, [modalName]: false }));
  }, []);

  const toggle = useCallback((modalName: string) => {
    setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  }, []);

  return {
    modalState,
    handle: {
      open,
      close,
      toggle,
    },
  };
};
