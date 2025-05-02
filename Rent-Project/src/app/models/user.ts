import { UserRole } from './user-role.enum';

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  profession: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  connected?: boolean;
}
