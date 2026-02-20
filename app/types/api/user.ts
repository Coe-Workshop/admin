export interface User {
  phone: string;
  profileUrl: string;
  userName: string;
}

export enum UserRole {
  RESERVER = "RESERVER",
  ADMIN = 'ADMIN',
}