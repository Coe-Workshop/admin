"use client";

import styles from "./login.module.scss";
import { PasswordInput } from "../../components/ui/passwordInput/passwordInput";
import { TextInput } from "@/app/components/form/TextInput/TextInput";
import SvgIconColor from "@/app/components/Icon/SvgIconColor";
import { useState } from "react";
import { useLoginMutation } from "@/lib/features/auth/authApi";
import { useDispatch } from "react-redux";
import { loginFailure } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { dashboard } from "@/app/utils/prefix";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    console.log("login!");
    try {
      const credentials = { email, password };
      const userData = await login(credentials).unwrap();
      console.log(userData);
      setErrorMessage(null);
      router.push(dashboard);
    } catch (err) {
      let apiMessage = "Login failed";

      if (typeof err === "object" && err != null && "data" in err) {
        apiMessage =
          (err as { data?: { message?: string } }).data?.message || apiMessage;
      }
      dispatch(loginFailure(apiMessage));
      setErrorMessage(apiMessage);
      console.log("error", apiMessage);
    }
  };
  return (
    <div className={styles.login}>
      <SvgIconColor
        className={styles.logo}
        src={"logo/logo.svg"}
        alt="logoAdmin"
        width={200}
        height={60}
      ></SvgIconColor>
      <form
        className={styles.form}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <TextInput
          label="ชื่อผู้ใช้งาน"
          placeholder="ชื่อผู้ใช้ที่ลงทะเบียนไว้"
          require
          value={email}
          onChange={(newVar) => {
            setErrorMessage(null);
            setEmail(newVar);
          }}
        ></TextInput>
        <PasswordInput
          label="รหัสผ่าน"
          placeholder="รหัสผ่านของคุณ"
          value={password}
          onChange={(newVar) => {
            setErrorMessage(null);
            setPassword(newVar);
          }}
        ></PasswordInput>
        <button
          type="submit"
          className={`${styles.submit} ${errorMessage ? styles.errorButton : ""}`}
        >
          {isLoading ? "กำลังเข้าสู่ระบบ..." : "ยืนยัน"}
        </button>
        {errorMessage && (
          <div className={styles.error}>
            {errorMessage || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ"}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
