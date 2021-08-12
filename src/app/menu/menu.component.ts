import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { Metamask } from '@app/shared/services/metamask/metamask.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  address:any;
  addressSlice:any;
  hash:any;
  roles:any;
  duplicationWallet:any;

  metaUser = false;
  first_screen = false;
  second_screen = false;
  deposit_screen = false;
  card_screen = false;  

  constructor(private router: Router, private authService: AuthService, private Metamask: Metamask) {  
    if ( sessionStorage.getItem('address') == "undefined" || sessionStorage.getItem('address') == null ){   

    } else {
      this.address = sessionStorage.getItem('address');
      this.addressSlice = this.address.slice(0,6) + '...'+this.address.slice(36,42)
      this.metaUser = true;
      this.first_screen =  true;
    }
    this.roles = sessionStorage.getItem("roles")=="1" ? true:false;
  }

  ngOnInit(): void {
  
  }

  adminClick():void{
    this.router.navigateByUrl("/admin/admin-settles")
  }

  dashboardClick():void{
    this.router.navigateByUrl("/")
  }

  accountClick(): void {
    this.router.navigateByUrl("/account")
    //this.router.navigate(["/home"]).then(() => { window.location.reload();})
  }

  offersClick(): void {
    this.router.navigateByUrl("/offer/offers")  
  }

  marketClick(): void {
    this.router.navigateByUrl("/offer/market")
  }

  logoutClick(): void {
    this.authService.signOut();    
    this.router.navigate(["/auth/login"]).then(() => { window.location.reload();})
  }

  async metamask(){
    await this.Metamask.connectETH();
  }

  addFund(): void{
    this.first_screen = false;
    this.second_screen = true;
    this.deposit_screen = false;
    this.card_screen = false;

  }
  
  goBack(order:string): void{
    switch (order){
      case "1":
        this.first_screen = true;
        this.second_screen = false;
        this.deposit_screen = false;
        this.card_screen = false;
        break;
      case "2":
        this.first_screen = false;
        this.second_screen = true;
        this.deposit_screen = false;
        this.card_screen = false;
        break;
      case "3":
        this.first_screen = false;
        this.second_screen = false;
        this.deposit_screen = true;
        this.card_screen = false;
        break;
      case "4":
        this.first_screen = false;
        this.second_screen = false;
        this.deposit_screen = false;
        this.card_screen = true;
        break;
    } 
  }
  
  

}
