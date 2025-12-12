import { TextInput } from "../../ui/textInput/textInput";
import styles from "./deleteConfirm.module.scss";
import { DeleteConfirmProps } from "./deleteConfirm.types";
export const DeleteConfirm = ({
  onClose,
  confirmMessage,
}: DeleteConfirmProps) => {
  return (
    <div className={styles.deleteConfirm}>
      <div className={styles.header}>
        <h2>ยืนยันการลบเลขครุภัณฑ์</h2>
        <p>
          เลขครุภัณฑ์จะถูกลบไปอย่างถาวร ประวัติหรือข้อมูลอื่นๆ
          ที่เกี่ยวข้องจะไม่สามารถย้อนกลับได้อีก กรุณาพิม{" "}
          <span>{confirmMessage + " "}</span>
          เพื่อยืนยันการลบ
        </p>
      </div>
      <form action="">
        <TextInput></TextInput>
        <div className={styles.action}>
          <button
            className={styles.cancel}
            onClick={() => onClose()}
            type="button"
          >
            ยกเลิก
          </button>
          <button className={styles.confirm}>ลบรายการ</button>
        </div>
      </form>
    </div>
  );
};
