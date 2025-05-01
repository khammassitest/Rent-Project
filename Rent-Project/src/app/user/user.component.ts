import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user';
import { FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  
  users: User[] = [];
  userForm!: FormGroup;
  showAddUserForm = false;
  isAdmin =true;
  fb: any;
  searchTerm: string = '';
  showOnlyActive: boolean = false;
  nextId: number = 4;

  showForm: boolean = false;

  userToEdit: User | null = null;
  showEditUserForm: boolean = false;


  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.userForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
  }

  get filteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (!this.showOnlyActive || user.active)
    );
  }

  toggleAddUserForm(): void {
    this.showAddUserForm = !this.showAddUserForm;
    if (!this.showAddUserForm) {
      this.userForm.reset({
        phoneNumber: '',
        address: '',
        role: 'user'
      });
    }
  }
  

  addUser(): void {
    if (this.userForm.valid) {
      const newId =
        this.users.length > 0
          ? Math.max(...this.users.map((u) => u.id)) + 1
          : 1;
  
      const newUser: User = {
        id: newId,
        ...this.userForm.value,
      };
  
      this.users.push(newUser);
      this.userForm.reset(); 
      this.showAddUserForm = false; 
    } else {
      alert('Merci de remplir tous les champs requis.');
    }
  }
    
  cancelEdit() {
    this.showEditUserForm = false;
    this.userForm.reset({ phoneNumber: '', address: '', role: 'user' });
    this.userToEdit = null;
  }
  
  
  editUser(user: User): void {
    console.log('Editing user:', user); 
    this.userToEdit = user;
    this.showEditUserForm = true;
    this.showAddUserForm = false;
    this.userForm.patchValue(user);
    this.userForm.setValue({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role
    });
    this.showEditUserForm = true;
    this.showAddUserForm = false; 
  }

  updateUser(): void {
    if (this.userForm.valid && this.userToEdit) {
      Object.assign(this.userToEdit, this.userForm.value);
      this.userToEdit = null;
      this.showEditUserForm = false;
      this.userForm.reset({ phoneNumber: '', address: '', role: 'user' });
    }
  }
  
  deleteUser(user: any) {
    this.users = this.users.filter(u => u !== user);
  }
}
