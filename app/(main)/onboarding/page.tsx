"use client"

import { TextInput } from "@/app/components/ui/textInput/textInput";
import styles from "./onboarding.module.scss";
import { useState } from "react";
const OnBoarding = () => {
  //เขียน handleSubmitตรงนี้ อย่าลืม e.preventDefault()
  return (
    <div>
      <form>
        {/* เรียก onsubmit handler บน onsubmit ใน tag form*/}
        <TextInput
          title="ชื่อ"
          placeholder="กรอกชื่อของคุณ"
          require
        ></TextInput>
        <button type="submit"></button>
      </form>
    </div>
  );
};
export default OnBoarding;
