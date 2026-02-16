import styles from "./page.module.scss";
import Link from "next/link";
const Hello = () => {
  return (
    <div className={styles.hello}>
      <Link href={"/transaction"} className={styles.message}>
        EN Workshop Admin is on. 😎
      </Link>
    </div>
  );
};

export default Hello;
