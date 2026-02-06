"use client";

import Image from "next/image";
import styles from "./login.module.scss";
import { PasswordInput } from "../../components/ui/passwordInput/passwordInput";
import { TextInput } from "@/app/components/form/TextInput/TextInput";
import IconSvgMono, { logo } from "@/app/components/Icon/SvgIcon";

const Login = () => {
  return (
    <div className={styles.login}>
      <IconSvgMono
        className={styles.logo}
        svg={logo({ a:"logo-mark", b:"logo-dot", c:"logo-mark"})}
        alt="logoAdmin"
        width={200}
        height={60}
        fixColor={true}
      ></IconSvgMono>
      <form className={styles.form} action="">
        <TextInput
          title="ชื่อผู้ใช้งาน"
          placeholder="ชื่อผู้ใช้ที่ลงทะเบียนไว้"
          require
        ></TextInput>
        <PasswordInput
          title="รหัสผ่าน"
          placeholder="รหัสผ่านของคุณ"
        ></PasswordInput>
        <button type="submit" className={styles.submit}>
          ยืนยัน
        </button>
      </form>
    </div>
  );
};

export default Login;
