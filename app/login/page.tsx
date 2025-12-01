import Image from "next/image";
import styles from "./login.module.scss";
import { PasswordInput } from "../components/ui/passwordInput/passwordInput";
import { TextInput } from "../components/ui/textInput/textInput";
const Login = () => {
  return (
    <div>
      <Image
        className={styles.logo}
        src={"logo/logo.svg"}
        alt="logoAdmin"
        width={235}
        height={64}
      ></Image>
      <form className={styles.form} action="">
        <TextInput
          title="ชื่อผู้ใช้งาน"
          placeholder="ชื่อผู้ใช้ที่ลงทะเบียนไว้"
          require
        ></TextInput>
        <PasswordInput title="รหัสผ่าน"></PasswordInput>
        <button type="submit" className={styles.submit}>
          ยืนยัน
        </button>
      </form>
    </div>
  );
};

export default Login;
