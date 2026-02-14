"use client";

import styles from "./login.module.scss";
import { PasswordInput } from "../../components/ui/passwordInput/passwordInput";
import { TextInput } from "@/app/components/form/TextInput/TextInput";
import SvgIconColor from "@/app/components/Icon/SvgIconColor";
import { FormEvent, useState } from "react";
import { useLoginMutation } from "@/lib/features/auth/authApi";
import { useDispatch } from "react-redux";
import { loginFailure } from "@/lib/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    console.log("login!");
    try {
      const credentials = { email, password };
      const userData = await login(credentials);
      console.log(userData);
    } catch (error) {
      dispatch(loginFailure("Login failed"));
      console.log("error", error);
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
          onChange={setEmail}
        ></TextInput>
        <PasswordInput
          label="รหัสผ่าน"
          placeholder="รหัสผ่านของคุณ"
          value={password}
          onChange={setPassword}
        ></PasswordInput>
        <button type="submit" className={styles.submit}>
          ยืนยัน
        </button>
      </form>
    </div>
  );
};

export default Login;
