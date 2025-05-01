import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [
    { id: 1, name: 'Nader', email: 'nader@example.com', locked: false, active: true },
    { id: 2, name: 'Wael', email: 'wael@example.com', locked: true, active: false },
    { id: 3, name: 'Anis', email: 'anis@example.com', locked: false, active: true },
    { id: 4, name: 'Mohamed', email: 'mohamed@example.com', locked: true, active: true }
  ];
  
  constructor() { }
}
