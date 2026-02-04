"use client";
import { Toast } from "@/app/components/ui/Toast/Toast";
import { useToast } from "@/app/context/Toast/ToastProvider";
const Test = () => {
  const { addToastStack } = useToast();

  const handleAddToast = () => {
    addToastStack("บันทึกสำเร็จ", "บันทึกสำเร็จแล้วจ้า", "success");
  };
  return (
    <div>
      <Toast Position="top-right"></Toast>
      <button onClick={handleAddToast} type="button">
        กด
      </button>
    </div>
  );
};

export default Test;
