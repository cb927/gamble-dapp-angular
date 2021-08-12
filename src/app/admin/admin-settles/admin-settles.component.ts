import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';
import { AuthService, Metamask, OfferService } from '@app/shared/services';

@Component({
  selector: 'app-admin-settles',
  templateUrl: './admin-settles.component.html',
  styleUrls: ['./admin-settles.component.scss']
})
export class AdminSettlesComponent implements OnInit {
  rememberMe = false;
  user_id:any;
  
  offers : any;
  label = false;

  constructor(private router: Router, private offerService: OfferService, private fb: FormBuilder) {
    if ( sessionStorage.getItem('roles') != "1" ) this.router.navigateByUrl("/");
  }

  async ngOnInit() {     
    this.user_id = sessionStorage.getItem("_id");
    this.offers = await this.offerService.getDisputedOffers();

    for(let i=0; i<this.offers.length; i++){
      this.offers[i].term == "1" ? this.offers[i].term = "English Premier League":i=i;
      this.offers[i].term == "2" ? this.offers[i].term = "NBA":i=i;
      this.offers[i].term == "3" ? this.offers[i].term = "Spanish Premier League":i=i;
    }
    if (this.offers.length > 0) {
      this.label = true;
    }

  }

  settleClick(id:string): void {
    this.router.navigateByUrl("/admin/admin-settle/"+id)  
  }


}
