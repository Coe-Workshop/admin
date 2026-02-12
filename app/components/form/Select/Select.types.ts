export interface SelectProps<T> {
  value?: T; //value when user select
  onChange: (value: T) => void; //setValue
  label?: string; //input label tag
  require?: boolean; //must full fill this input
  options: T[];
  placeholder?: string;
  errorMessage?: string; //error message display
  onTop?: boolean; //date form have on top on buttom placeholder
}
