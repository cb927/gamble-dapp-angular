import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  userForm : FormGroup;
  rememberMe=false;
  user:any;
  is_confirm_alert = false
  is_default = true;
  is_show_alert = false;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder,) { 
    this.userForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });  
  }

  ngOnInit(): void {
     

    this.rememberMe = localStorage.getItem('rememberCurrentUser') == 'true' ? true : false;
    if (sessionStorage.getItem('_id')){
      this.router.navigateByUrl("/home")	 
    } else if(this.rememberMe == true) {
      if (localStorage.getItem('currentUser') !==null ) {
        this.user = localStorage.getItem('currentUser');
        this.user = JSON.parse( this.user );       
        sessionStorage.setItem('_id', this.user._id)
        sessionStorage.setItem('username', this.user.username)
        sessionStorage.setItem('email', this.user.email)
        sessionStorage.setItem('roles', this.user.roles)
        this.router.navigateByUrl("/home")
        //this.router.onSameUrlNavigation = 'reload'    
      } 
    }
  }

  get email() { return this.userForm.get('email'); } 

  onSubmit(): void {
    var { email } = this.userForm.getRawValue();

    this.authService.forgot(email).subscribe((user) => { 
      if (user == undefined || user == null) {
        this.is_show_alert=true;
        this.is_default = true;   
      } else {
        
        this.is_confirm_alert = true;
        this.is_default = false;
          /*
            this.http.post('/api/v1/forgot_email', JSON.stringify(user), {
              headers: headers
            }).subscribe((data : any) => {
              this.is_confirm_alert = true
		          this.is_default = false;
            });
          */
      }
    })
/*
    if (this.form_login.invalid) {
      return;
    }

    this.authService.login(this.email!, this.password!).subscribe(() => {
      this.router.navigateByUrl('/');
    });
*/
  }
}


