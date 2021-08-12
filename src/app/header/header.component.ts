import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

//import { User } from '@app/shared/interfaces';

import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
//  @Input() user: User | null = null;
  rememberMe = false;
  @Input() _id:any;
  user: any;

  constructor(private router: Router, private authService: AuthService) {
    this.rememberMe = localStorage.getItem('rememberCurrentUser') == 'true' ? true : false;
    if (sessionStorage.getItem('_id')){
      this._id = sessionStorage.getItem('_id');
    } else if(this.rememberMe == true) {
      if (localStorage.getItem('currentUser') !==null ) {
        this.user = localStorage.getItem('currentUser');
        this._id = JSON.parse( this.user )._id;   
      } 
    }
    
  }

  logout(): void {
    this.authService.signOut();    
    this.router.navigate(["/auth/login"]).then(() => { window.location.reload();})
  }

  account(): void {
    this.router.navigate(["/setting"])
  }
}
