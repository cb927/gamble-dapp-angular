import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';
import { AuthService, Metamask, OfferService } from '@app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rememberMe = false;
  user_id:any;
  
  marketOffers : any;
  createOffers : any;
  joinOffers : any;
  acceptOffers : any;
  settledOffers : any;
  
  market_label = false;
  create_label = false;
  join_label = false;
  accept_label = false;
  settled_label = false;
  
  constructor(private router: Router, private offerService: OfferService, private fb: FormBuilder) {
    if ( sessionStorage.getItem('_id') || localStorage.getItem('rememberCurrentUser') ) {      
    } else {
      this.router.navigate(["/auth/login"]).then(() => { window.location.reload();})  
    }    

  }

  async ngOnInit() {     
    this.user_id = sessionStorage.getItem("_id");
    this.marketOffers = await this.offerService.getMarketOffers(this.user_id);
    this.createOffers = await this.offerService.getCreateOffers(this.user_id);
    this.joinOffers = await this.offerService.getJoinOffers(this.user_id);
    this.acceptOffers = await this.offerService.getAcceptOffers(this.user_id);
    this.settledOffers = await this.offerService.getSettledOffers(this.user_id);

    for(let i=0; i<this.marketOffers.length; i++){
      this.marketOffers[i].term == "1" ? this.marketOffers[i].term = "English Premier League":i=i;
      this.marketOffers[i].term == "2" ? this.marketOffers[i].term = "NBA":i=i;
      this.marketOffers[i].term == "3" ? this.marketOffers[i].term = "Spanish Premier League":i=i;
    }
    if (this.marketOffers.length > 0) {
      this.market_label = true;
    }

    for(let i=0; i<this.createOffers.length; i++){
      this.createOffers[i].term == "1" ? this.createOffers[i].term = "English Premier League":i=i;
      this.createOffers[i].term == "2" ? this.createOffers[i].term = "NBA":i=i;
      this.createOffers[i].term == "3" ? this.createOffers[i].term = "Spanish Premier League":i=i;
    }
    if (this.createOffers.length > 0) {
      this.create_label = true;
    }
    
    for(let i=0; i<this.joinOffers.length; i++){
      this.joinOffers[i].term == "1" ? this.joinOffers[i].term = "English Premier League":i=i;
      this.joinOffers[i].term == "2" ? this.joinOffers[i].term = "NBA":i=i;
      this.joinOffers[i].term == "3" ? this.joinOffers[i].term = "Spanish Premier League":i=i;
    }
    if (this.joinOffers.length > 0) {
      this.join_label = true;
    }
    
    for(let i=0; i<this.acceptOffers.length; i++){
      this.acceptOffers[i].term == "1" ? this.acceptOffers[i].term = "English Premier League":i=i;
      this.acceptOffers[i].term == "2" ? this.acceptOffers[i].term = "NBA":i=i;
      this.acceptOffers[i].term == "3" ? this.acceptOffers[i].term = "Spanish Premier League":i=i;
    }
    if (this.acceptOffers.length > 0) {
      this.accept_label = true;
    }
    
    for(let i=0; i<this.settledOffers.length; i++){
      this.settledOffers[i].term == "1" ? this.settledOffers[i].term = "English Premier League":i=i;
      this.settledOffers[i].term == "2" ? this.settledOffers[i].term = "NBA":i=i;
      this.settledOffers[i].term == "3" ? this.settledOffers[i].term = "Spanish Premier League":i=i;
    }
    if (this.settledOffers.length > 0) {
      this.settled_label = true;
    }
  }

  contestClick(id:string): void {
    this.router.navigateByUrl("/offer/contest-offer/"+id)  
  }

  settledClick(id:string): void {
    this.router.navigateByUrl("/offer/settled-offer/"+id)  
  }

  acceptClick(id:string):void{
    this.router.navigateByUrl("/offer/accept-offer/"+id)  
  }

  joinClick(id:string): void {
    this.router.navigateByUrl("/offer/join-offer/"+id)  
  }

  myClick(): void {
    this.router.navigateByUrl("/offer/offers")  
  }

  viewClick(id:string): void {
    this.router.navigateByUrl("/offer/view-offer/"+id)  
  }
  
  marketClick(): void {
    this.router.navigateByUrl("/offer/market")  
  }

}
