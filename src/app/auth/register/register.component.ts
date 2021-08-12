import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent {
  userForm : FormGroup;
  emailDuplicate = false;

  constructor(private router: Router, private authService: AuthService) {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator]),
    });
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.root.get('password');
    
    return password && control.value !== password.value
      ? {
          passwordMatch: true,
        }
      : null;
  }

  ngOnInit(): void {    
  }

  get username(): AbstractControl {
    return this.userForm.get('username')!;
  }

  get email(): AbstractControl {
    return this.userForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.userForm.get('repeatPassword')!;
  }

  onSubmit(): void {
    
    const { username, email, password } = this.userForm.getRawValue();

    this.authService.register(username, email, password).subscribe(data => {
      
      if (data ==undefined || data ==null) { this.router.navigateByUrl('/auth/login') } else if(data.email == email) { this.emailDuplicate = true } 
    });
  }
}

