import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserManagementService } from '../../service/user-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-addedituser',
  templateUrl: './addedituser.component.html',
  styleUrls: ['./addedituser.component.scss']
})

export class AddedituserComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  userId: string | null = null;
  users: User[] = []; 

  constructor(
    private fb: FormBuilder,
    private userService: UserManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadUsers();
    this.createForm();
    
    
  }

  createForm(): void {
    this.userForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      enabled: [true, Validators.required],
      details: this.fb.group({
        id: [''],
        userUuid: [''],
        departement: ['', Validators.required],
        telephone: ['', Validators.required],
        poste: ['', Validators.required],
        manager: ['', Validators.required]
      })
    });
  }

  getUser(): void{
    if (this.userId) {
      this.isEditMode = true;
      this.userService.getUserById(this.userId).subscribe({
        next: (data: User) => {
          this.populateForm(data);
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load user data' });
        }
      });
    }
  }

  populateForm(user: User): void {
  
    const managerID = user.details?.manager?.id;
    console.log("managerID", managerID);
    console.log("this.users", this.users);

    // Check if managerID exists and is valid before searching for the manager
    const manager = managerID !== undefined ? 
    this.users.find(userD => String(userD.details?.id) === String(managerID)) : 
    null;

console.log("manager", manager);
    this.userForm.patchValue({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      enabled: user.enabled,
      details: {
        id: user.details?.id,
        userUuid: user.details?.userUuid,
        departement: user.details?.departement,
        telephone: user.details?.telephone,
        poste: user.details?.poste,
        manager : manager
      }
    });
    
  }



  saveUser(): void {
    if (this.userForm.invalid) {
      return;
    }
  
    const userData = this.userForm.value;

    // Garder seulement l'id dans userData.details.manager
    if (userData.details && userData.details.manager) {
      userData.details.manager = {
        id: userData.details.manager.details.id
      };
    }
    
    console.log("userData",userData);
    
    if (this.isEditMode) {
      // Modification de l'utilisateur
      this.userService.updateUser(userData.id, userData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
          this.router.navigate(['/back-office/user-list']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update user' });
        }
      });
    } else {
      // Création d'un nouvel utilisateur
      this.userService.createUser(userData).subscribe({
        next: () => {
          console.log('Utilisateur créé avec succès');  // Ajoute ce log pour vérifier
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully' });
          this.router.navigate(['back-office/user-list']);  // Redirection après création
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create user' });
        }
      });
    }
  }
  
  navigateBack(): void {
    this.router.navigate(['/back-office/user-list']);
  }
  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.getUser();
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec du chargement des utilisateurs'
        });
      }
    });
  }
}