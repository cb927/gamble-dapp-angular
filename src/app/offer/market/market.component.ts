import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';
import { OfferService } from '@app/shared/services';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  rememberMe = false;
  current_user:any;
  
  user_id : any;
  marketOffers : any;  
  market_label = false;
  filters : any;

  generalForm : FormGroup;


  constructor(private router: Router, private offerService: OfferService, private fb: FormBuilder) {
    this.generalForm = this.fb.group({
      minAmount: new FormControl(''),
      maxAmount: new FormControl(''),
      status: new FormControl('')
    });
  }

  async ngOnInit() {     
    this.user_id = sessionStorage.getItem("_id");
    this.marketOffers = await this.offerService.getMarketOffers(this.user_id);

    for(let i=0; i<this.marketOffers.length; i++){
      this.marketOffers[i].term == "1" ? this.marketOffers[i].term = "English Premier League":i=i;
      this.marketOffers[i].term == "2" ? this.marketOffers[i].term = "NBA":i=i;
      this.marketOffers[i].term == "3" ? this.marketOffers[i].term = "Spanish Premier League":i=i;
    }
    if (this.marketOffers.length > 0) {
      this.market_label = true;
    }

  }

  async onGeneralSubmit() {
    var { minAmount, maxAmount, status } = this.generalForm.getRawValue()    

    this.marketOffers = await this.offerService.getFilter(this.user_id, minAmount, maxAmount, status, "0");     
    for(let i=0; i<this.marketOffers.length; i++){
      this.marketOffers[i].term == "1" ? this.marketOffers[i].term = "English Premier League":i=i;
      this.marketOffers[i].term == "2" ? this.marketOffers[i].term = "NBA":i=i;
      this.marketOffers[i].term == "3" ? this.marketOffers[i].term = "Spanish Premier League":i=i;
    }
    (this.marketOffers.length > 0) ? this.market_label = true : this.market_label=false;
  }

  joinClick(id:string): void {
    this.router.navigateByUrl("/offer/join-offer/"+id)  
  }

  


}
