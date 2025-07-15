import { UserRole } from './user-role.enum';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  profession: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  connected?: boolean;
}
