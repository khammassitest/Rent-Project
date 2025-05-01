import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  
  users: User[] = [];
  
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  addUser() {
    throw new Error('Method not implemented.');
  }

  searchTerm: string = '';
  showOnlyActive: boolean = false;
  nextId: number = 4;

  showForm: boolean = false;

  newUser: any = {
    name: '',
    email: '',
    locked: false,
    active: true
  };

  get filteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (!this.showOnlyActive || user.active)
    );
  }

  toggleForm() {
    this.showForm = true;
  }

  confirmAddUser() {
    if (!this.newUser.name || !this.newUser.email) {
      alert("Le nom et l'email sont requis !");
      return;
    }

    const userToAdd = {
      id: ++this.nextId,
      ...this.newUser
    };

    this.users.push(userToAdd);
    this.resetForm();
  }

  cancelAddUser() {
    this.resetForm();
  }

  resetForm() {
    this.newUser = { name: '', email: '', locked: false, active: true };
    this.showForm = false;
  }

  editUser(user: any) {
    console.log('Modifier', user);
  }

  lockUser(user: any) {
    user.locked = !user.locked;
  }

  deleteUser(user: any) {
    this.users = this.users.filter(u => u !== user);
  }
}
