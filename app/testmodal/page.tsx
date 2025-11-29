"use client";

import { useEffect } from "react";
import { useModal } from "../hook/useModal";
import Modal from "../components/ui/modal/modal";
function page() {
  const { modalState, handle } = useModal();
  useEffect(() => {
    console.log("opened", modalState);
  }, [modalState]);
  return (
    <div>
      {/* default ให้ส่ง params แบบนี้ทุกการใช้ */}
        <Modal modalState={modalState} onClose={handle.close}></Modal>
      <button type="button" onClick={() => handle.toggle("create")}>
        เรียก create
      </button>

      <button type="button" onClick={() => handle.toggle("Toom")}>
        ยังไม่ได้ set up
      </button>
      <h1>ไปเพิ่ม component ที่อยากใช้ /components/ui/modal/modal</h1>
    </div>
  );
}

export default page;
