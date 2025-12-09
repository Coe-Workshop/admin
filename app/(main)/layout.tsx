import { ReactNode } from "react";
import Navbar from "../components/layout/navbar/navbar";
import styles from "./main.module.scss";
const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.children}>{children}</main>
    </div>
  );
};

export default MainLayout;
