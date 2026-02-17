export interface SelectProps {
  value?: any; //value when user select
  onChange: (value: any) => void; //setValue
  label?: string; //input label tag
  require?: boolean; //must full fill this input
  options: any[];
  placeholder?: string;
  errorMessage?: string; //error message display
  onTop?: boolean; //date form have on top on buttom placeholder
}
