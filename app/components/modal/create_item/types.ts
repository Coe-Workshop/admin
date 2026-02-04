export enum Category {
  DevelopmentBoard = "development_board",
  Tool = "tool",
  ElectronicComponent = "electronic_component",
  Others = "others",
}

export interface crateProps {
  name: string;
  description: string;
  category: Category | "";
  image: string;
}

export interface CreateItemProps {
  onClose: () => void;
}
