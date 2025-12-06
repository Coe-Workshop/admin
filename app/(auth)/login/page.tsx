import Image from "next/image";
import styles from "./login.module.scss";
import { PasswordInput } from "../../components/ui/passwordInput/passwordInput";
import { TextInput } from "../../components/ui/textInput/textInput";
const Login = () => {
  return (
    <div className={styles.login}>
      <Image
        className={styles.logo}
        src={"logo/logo.svg"}
        alt="logoAdmin"
        width={200}
        height={60}
      ></Image>
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
