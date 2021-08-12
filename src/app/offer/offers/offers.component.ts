import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Metamask, OfferService } from '@app/shared/services';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  rememberMe = false;
  current_user:any;
  
  exist = false;
  beforeEmail :any;
  address:any;
  user_id : any;

  joinOffers : any;
  join_label = false;

  generalForm : FormGroup;

  constructor(private router: Router, private offerService: OfferService, private authService: AuthService, private Metamask: Metamask, private fb: FormBuilder) {
    this.generalForm = this.fb.group({
      minAmount: new FormControl(''),
      maxAmount: new FormControl(''),
      status: new FormControl('')
    });
  }

  async ngOnInit() {     
    this.beforeEmail = sessionStorage.getItem('email');
    this.address = sessionStorage.getItem('address')
    this.user_id = sessionStorage.getItem("_id");
    this.joinOffers = await this.offerService.getJoinOffers(this.user_id);

    for(let i=0; i<this.joinOffers.length; i++){
      this.joinOffers[i].term == "1" ? this.joinOffers[i].term = "English Premier League":i=i;
      this.joinOffers[i].term == "2" ? this.joinOffers[i].term = "NBA":i=i;
      this.joinOffers[i].term == "3" ? this.joinOffers[i].term = "Spanish Premier League":i=i;
    }
    if (this.joinOffers.length > 0) {
      this.join_label = true;
    }
    
  }

  async onGeneralSubmit() {
    var { minAmount, maxAmount, status } = this.generalForm.getRawValue()    

    this.joinOffers = await this.offerService.getFilter(this.user_id, minAmount, maxAmount, status, "1");     
    for(let i=0; i<this.joinOffers.length; i++){
      this.joinOffers[i].term == "1" ? this.joinOffers[i].term = "English Premier League":i=i;
      this.joinOffers[i].term == "2" ? this.joinOffers[i].term = "NBA":i=i;
      this.joinOffers[i].term == "3" ? this.joinOffers[i].term = "Spanish Premier League":i=i;
    }
    (this.joinOffers.length > 0) ? this.join_label = true : this.join_label=false;
  }

  acceptClick(id:string): void {
    this.router.navigateByUrl("/offer/accept-offer/"+id)  
  }
  
}
