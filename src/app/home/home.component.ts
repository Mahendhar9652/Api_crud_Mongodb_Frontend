import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users: any[] = [];
  showFormPopup: boolean = false;
  mode: string = 'add';

  addForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService) {}


  togglePopup() {
    this.showFormPopup = !this.showFormPopup;
  }

  addUser() {
    console.log(this.addForm.value);
    if (this.addForm.value.id) {
      this.userService.updateUser(this.addForm.value.id, this.addForm.value).subscribe(
        (updatedUser) => {
          console.log('User updated successfully', updatedUser);
          this.addForm.reset();
          this.mode = 'add';
          this.loadUsers(); 
        },
        (error) => {
          console.error('Update failed:', error);
        }
      );
    } else {
      this.userService.addUser(this.addForm.value).subscribe(
        () => {
          this.addForm.reset();
          this.loadUsers(); 
        },
        (error) => {
          console.error('Add failed:', error);
        }
      );
    }
  }
  

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users: any) => {
        this.users = users;
      },
      (err) => {
        console.error('Error loading users:', err);
      }
    );
  }

  editUser(id: string) {
    this.togglePopup();

    const editUser = this.users.find((user) => user._id === id);

    if (editUser) {
      this.addForm.patchValue({
        id: editUser._id,
        name: editUser.name,
        email: editUser.email,
        address: editUser.address
      });
      this.mode = 'edit';
    }
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id)
    this.userService.getUsers();
    this.loadUsers();
    
  }
}
