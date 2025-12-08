"use client";

import { TextInput } from "@/app/components/ui/textInput/textInput";
import styles from "./onboarding.module.scss";
import { useEffect, useState } from "react";
const OnBoarding = () => {
  const [toom, setToom] = useState<string>("");
  // useEffect(() => {
  //   console.log("toom", toom);
  // }, [toom]); เผื่อยากดูว่าค่าออกจริงไหม
  //เขียน handleSubmitตรงนี้ อย่าลืม e.preventDefault()
  return (
    <div>
      <form>
        {/* เรียก onsubmit handler บน onsubmit ใน tag form*/}
        <TextInput
          title="ชื่อ"
          placeholder="กรอกชื่อของคุณ"
          require
          value={toom}
          onChange={(e) => setToom(e.target.value)}
        ></TextInput>
        <button type="submit"></button>
      </form>
    </div>
  );
};
export default OnBoarding;
