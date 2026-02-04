import { ReactNode } from "react";
import Navbar from "../components/layout/navbar/navbar";
import styles from "./main.module.scss";
import ToastProvider from "../context/Toast/ToastProvider";
import { Toast } from "../components/ui/Toast/Toast";
const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <ToastProvider>
        <Navbar />
        <main className={styles.children}>{children}</main>
        <Toast Position="top-right"></Toast>
      </ToastProvider>
    </div>
  );
};

export default MainLayout;
