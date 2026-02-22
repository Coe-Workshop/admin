export interface SelectProps {
  value?: unknown; //value when user select
  onChange: (value: unknown) => void; //setValue
  label?: string; //input label tag
  require?: boolean; //must full fill this input
  options: unknown[];
  placeholder?: string;
  errorMessage?: string; //error message display
  onTop?: boolean; //date form have on top on buttom placeholder
}
