import { ItemTransaction } from "@/app/types/api/table";
import styles from "./transactionInfo.module.scss";
import { StatusTag } from "../../ui/statusTag/statusTag";
export const TransactionInfo = ({
  user,
  startTime,
  endTime,
  message,
  status,
}: ItemTransaction) => {
  return (
    <div className={styles.info}>
      <section>
        <div className={styles.header}>
          <span>
            <h2>รายละเอียดการจอง</h2>
          </span>
          <StatusTag status={status}></StatusTag>
        </div>
        <span>
          <p>ผู้ยื่นคำร้อง:</p>
          <p>{user.username}</p>
        </span>
        <span>
          <p>เบอร์โทรติดต่อ:</p>
          <p>{user.tel}</p>
        </span>
        <span>
          <p>คำร้อง:</p>
          <p>{message}</p>
        </span>
        <span>
          <p>เวลาเริ่ม:</p>
          <p>{startTime}</p>
        </span>
        <span>
          <p>เวลาสิ้นสุด:</p>
          <p>{endTime}</p>
        </span>
      </section>
      <hr className={styles.line} />
      <section>
        <span>
          <h2>เกี่ยวกับอุปกรณ์</h2>
        </span>
        <div className={styles.tool}>
          <h3>ชื่อของอุปกรณ์</h3>
        </div>
      </section>
      <section className={styles.action}>
        <form
          onSubmit={(e: Event) => {
            e.preventDefault();
            onclose();
          }}
        >
          <button type="submit"></button>
        </form>
      </section>
    </div>
  );
};
