import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  userForm!: FormGroup;
  showAddUserForm = false;
  showEditUserForm = false;
  userToEdit: User | null = null;
  searchTerm: string = '';
  isAdmin = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();

    this.userForm = new FormGroup({
      id: new FormControl(null),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erreur lors du chargement des utilisateurs', err)
    });
  }

  get filteredUsers() {
    return this.users.filter(user =>
      user.fullName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleAddUserForm(): void {
    this.showAddUserForm = !this.showAddUserForm;
    if (!this.showAddUserForm) {
      this.userForm.reset({
        phone: '',
        address: '',
        role: 'user'
      });
    }
  }

  addUser(): void {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      this.users.push(newUser); // Remplacer par appel HTTP si nécessaire
      this.userForm.reset();
      this.showAddUserForm = false;
    } else {
      alert('Merci de remplir tous les champs requis.');
    }
  }

  editUser(user: User): void {
    this.userToEdit = user;
    this.showEditUserForm = true;
    this.showAddUserForm = false;
    this.userForm.setValue({
      id: user.id,
      name: user.fullName,
      email: user.email,
      phoneNumber: user.phone,
      address: user.address,
      role: user.role
    });
  }

  updateUser(): void {
    if (this.userForm.valid && this.userToEdit) {
      Object.assign(this.userToEdit, this.userForm.value);
      this.userToEdit = null;
      this.showEditUserForm = false;
      this.userForm.reset({ phoneNumber: '', address: '', role: 'user' });
    }
  }

  deleteUser(user: User): void {
    if (user.id != null) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  cancelEdit(): void {
    this.showEditUserForm = false;
    this.userForm.reset({ phoneNumber: '', address: '', role: 'user' });
    this.userToEdit = null;
  }
}
