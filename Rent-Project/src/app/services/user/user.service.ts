import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { UserRole } from '../../models/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Nader',
      email: 'nader@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St, Cityville',
      profession: 'Engineer',
      password: 'password123',
      role: UserRole.Admin,
      createdAt: new Date('2024-01-10T10:00:00'),
      updatedAt: new Date('2024-04-15T12:00:00'),
      connected: true
    },
    {
      id: 2,
      name: 'Wael',
      email: 'wael@example.com',
      phoneNumber: '987-654-3210',
      address: '456 Elm St, Townsville',
      profession: 'Designer',
      password: 'pass9876',
      role: UserRole.User,
      createdAt: new Date('2024-02-05T09:30:00'),
      updatedAt: new Date('2024-04-18T14:45:00'),
      connected: false
    },
    {
      id: 3,
      name: 'Anis',
      email: 'anis@example.com',
      phoneNumber: '555-555-5555',
      address: '789 Oak St, Villageburg',
      profession: 'Manager',
      password: 'anis2024',
      role: UserRole.User,
      createdAt: new Date('2024-03-01T11:15:00'),
      updatedAt: new Date('2024-04-20T08:20:00'),
      connected: false
    },
    {
      id: 4,
      name: 'Mohamed',
      email: 'mohamed@example.com',
      phoneNumber: '111-222-3333',
      address: '321 Pine St, Hamletton',
      profession: 'Developer',
      password: 'devpass321',
      role: UserRole.Admin,
      createdAt: new Date('2024-01-20T13:45:00'),
      updatedAt: new Date('2024-04-22T16:10:00'),
      connected: false
    },
    {
      id: 5,
      name: 'Salma',
      email: 'salma@example.com',
      phoneNumber: '222-333-4444',
      address: '654 Cedar Ave, Metropolis',
      profession: 'Product Owner',
      password: 'salma456',
      role: UserRole.Admin,
      createdAt: new Date('2024-03-18T10:00:00'),
      updatedAt: new Date('2024-04-25T09:30:00'),
      connected: false
    },
    {
      id: 6,
      name: 'Omar',
      email: 'omar@example.com',
      phoneNumber: '777-888-9999',
      address: '987 Maple Rd, Technotown',
      profession: 'QA Engineer',
      password: 'qa2024',
      role: UserRole.User,
      createdAt: new Date('2024-04-01T14:25:00'),
      updatedAt: new Date('2024-04-28T17:00:00'),
      connected: false
    }
  ];

  private connectedUser: User | null = null;

  constructor() {}

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  getConnectedUser(): User | null {
    return this.users.find(user => user.connected) || null;
  }
  
  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser, updatedAt: new Date() };
    }
  }
}