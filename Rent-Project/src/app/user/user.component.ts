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

  isAdmin = true; // à gérer via AuthService si disponible

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
  }

  private initForm(): void {
    this.userForm = new FormGroup({
      id: new FormControl(null),
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]),
      address: new FormControl('', Validators.required),
      role: new FormControl('CLIENT', Validators.required),
      password: new FormControl('123456', Validators.required) // utile pour la mise à jour si on veut changer
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        console.log('Données reçues:', data);
        if (Array.isArray(data)) {
          this.users = data;
        } else if (data && Array.isArray(data.users)) {
          this.users = data.users;
        } else if (data && Array.isArray(data.result)) {
          this.users = data.result;
        } else if (data && Array.isArray(data.data)) {
          this.users = data.data;
        } else if (data && Array.isArray(data.$values)) {
          this.users = data.$values;
        } else {
          console.error('Format inattendu des utilisateurs', data);
          this.users = [];
        }
      },
      error: err => console.error('Erreur lors du chargement des utilisateurs', err)
    });
  }

  toggleAddUserForm(): void {
    this.showAddUserForm = !this.showAddUserForm;
    this.showEditUserForm = false;
    this.userForm.reset({ role: 'CLIENT' });
  }

  addUser(): void {
    if (this.userForm.invalid) {
      alert('Veuillez remplir correctement tous les champs.');
      return;
    }

    const newUser: User = this.userForm.value;
    this.userService.addUser(newUser).subscribe({
      next: (user: User) => {
        this.users.push(user);
        this.userForm.reset({ role: 'CLIENT' });
        this.showAddUserForm = false;
      },
      error: err => console.error('Erreur ajout utilisateur', err)
    });
  }

  editUser(user: User): void {
    this.userToEdit = user;
    this.showEditUserForm = true;
    this.showAddUserForm = false;
    this.userForm.setValue({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      password: '' // facultatif lors de l’édition
    });
  }

  updateUser(): void {
    if (this.userForm.invalid || !this.userToEdit) {
      alert('Veuillez remplir correctement tous les champs.');
      return;
    }

    const updatedUser: User = {
      ...this.userForm.value,
      password: this.userForm.value.password || this.userToEdit.password // garde l’ancien mot de passe si non modifié
    };

    this.userService.updateUser(updatedUser.email, updatedUser).subscribe({
      next: (responseUser: User) => {
        const index = this.users.findIndex(u => u.email === updatedUser.email);
        if (index !== -1) {
          this.users[index] = responseUser;
        }
        this.cancelEdit();
      },
      error: err => {
        console.error('Erreur mise à jour utilisateur', err);
        alert('Erreur lors de la mise à jour utilisateur.');
      }
    });
  }

  deleteUser(user: User): void {
  if (!user.email) return;  // On vérifie l'email au lieu de l'id
  if (!confirm(`Supprimer l'utilisateur ${user.fullName} ?`)) return;

  this.userService.deleteUserByEmail(user.email).subscribe({
    next: () => {
      this.users = this.users.filter(u => u.email !== user.email);
    },
    error: err => console.error('Erreur suppression utilisateur', err)
  });
}


  cancelEdit(): void {
    this.showEditUserForm = false;
    this.userToEdit = null;
    this.userForm.reset({ role: 'CLIENT' });
  }
}
