import { Component } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { merge, Observable } from 'rxjs';
import { User } from './shared/interfaces';
import { AuthService } from './shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  menu_status = true;
  rememberMe = false;

  user$: Observable<User | null> = merge(
    // Init on startup
    this.authService.me(),
    // Update after login/register/logout
    this.authService.getUser()
  );

  constructor(private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry, private authService: AuthService, private router: Router ) {
    this.registerSvgIcons();
   
    if (location.href.search("login")>0 || location.href.search("register")>0 || location.href.search("password-setting")>0 || location.href.search("forgot")>0 ){
      this.menu_status = false;	
      if (sessionStorage.getItem('_id') || localStorage.getItem('rememberCurrentUser') ) {          
        this.router.navigate(["/"]).then(() => { window.location.reload();})  
      }
    } else {
      if (sessionStorage.getItem('_id') || localStorage.getItem('rememberCurrentUser') ) {      
      } else {
        this.router.navigate(["/auth/login"]).then(() => { window.location.reload();})  
      }
    }
  }

  ngOnInit() {
    
  }
  registerSvgIcons() {
    [
      'close',
      'add',
      'add-blue',
      'airplane-front-view',
      'air-station',
      'balloon',
      'boat',
      'cargo-ship',
      'car',
      'catamaran',
      'clone',
      'convertible',
      'delete',
      'drone',
      'fighter-plane',
      'fire-truck',
      'horseback-riding',
      'motorcycle',
      'railcar',
      'railroad-train',
      'rocket-boot',
      'sailing-boat',
      'segway',
      'shuttle',
      'space-shuttle',
      'steam-engine',
      'suv',
      'tour-bus',
      'tow-truck',
      'transportation',
      'trolleybus',
      'water-transportation',
    ].forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`)
      );
    });
  }
  
}
