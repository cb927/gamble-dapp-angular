import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { Metamask } from '@app/shared/services/metamask/metamask.service';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';

declare let window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent {
  userForm : FormGroup;
  fail = false;

  constructor(private router: Router, private authService: AuthService, private Metamask: Metamask, private fb: FormBuilder, ) {
    this.userForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl('')
    }); 
  }  

  ngOnInit(): void {    
  }
  
  get email() { return this.userForm.get('email'); }  
  get password() { return this.userForm.get('password'); }
  get remember() { return this.userForm.get('remember'); }

  onSubmit(): void {
    var { email, password, remember } = this.userForm.getRawValue();

    this.authService.login(email, password).subscribe((user) => { 
      if (user == undefined || user ==null ) {
        this.fail=true;        
      } else {
        if (remember){
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('rememberCurrentUser', '1');
        } else {
          localStorage.setItem('currentUser', '');
          localStorage.setItem('rememberCurrentUser', '');  
        }    
        //this.router.navigateByUrl('/home')
        this.router.navigate(["/"]).then(() => { window.location.reload();})
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

  async metamask(){
    sessionStorage.getItem('address')? this.router.navigate(["/setting"]).then(() => { window.location.reload();}): await this.Metamask.connectETH();
  }

}
