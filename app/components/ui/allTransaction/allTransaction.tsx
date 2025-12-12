import styles from "./allTrasaction.module.scss";

export const AllTransaction = () => {
  return (
    <div>
      <table className={styles.header}>
        <thead>
          <tr>
            <th>ชื่ออุปกรณ์</th>
            <th>เลขครุภัณฑ์</th>
            <th>สถานะ</th>
            <th>วันสิ้นสุด</th>
            <th>คำร้อง</th>
          </tr>
        </thead>
      </table>
      <table className={styles.body}>
        <tbody>
          <tr>
            <td>This row ignores header column sizing</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
