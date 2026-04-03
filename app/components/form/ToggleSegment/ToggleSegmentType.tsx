interface ToggleSegmentProps {
  value: string;
  onChange: (value: string) => void;
  data: { label: string; value: string }[];
}