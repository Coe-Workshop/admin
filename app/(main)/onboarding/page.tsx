import { TextInput } from "@/app/components/ui/textInput/textInput";
import styles from "./onboarding.module.scss";
const OnBoarding = () => {
  return (
    <div>
      <TextInput title="ชื่อ" placeholder="กรอกชื่อของคุณ" require></TextInput>
    </div>
  );
};
export default OnBoarding;
