import { InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  placeholder?: string;
  require?: boolean;
  error?: string;
}
