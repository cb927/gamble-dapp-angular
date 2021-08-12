import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, Metamask, OfferService } from '@app/shared/services';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-join-offer',
  templateUrl: './join-offer.component.html',
  styleUrls: ['./join-offer.component.scss']
})
export class JoinOfferComponent implements OnInit {
  
  modalForm:any;
  _id : any;
  opponent_id : any;
  offer: any;
  result:any;
  creator:any;
  creator_name:any;
  creator_eth:any;
  creator_usd:any;
  term : any;
  date: any;
  desc: any;

  account=false;
  notificationForm : FormGroup;
  
  constructor(private router: Router, private route: ActivatedRoute, private offerService: OfferService, private authService: AuthService, private fb: FormBuilder, private _snackBar: MatSnackBar) { 
    
    this.notificationForm = this.fb.group({
      opponent_eth: new FormControl('', [Validators.required]),
    });  

    this.modalForm = this.fb.group({
      walletValue: new FormControl(''),
    }); 

    this.opponent_id = sessionStorage.getItem("_id");
    this._id = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {  
    this.offer = await this.offerService.getOffer(this._id);    
    this.creator_eth = this.offer.eth;
    this.creator_usd = (this.offer.eth * 2700).toFixed(2);
    this.offer.term == "1" ? this.term = "English Premier League": 1;
    this.offer.term == "2" ? this.term = "NBA":1;
    this.offer.term == "3" ? this.term = "Spanish Premier League":1;
    this.date = this.offer.expiry;
    this.desc = this.offer.desc;
    
    if (this.offer.creator[0].username==undefined || this.offer.creator[0].username==null || this.offer.creator[0].username=="") {
      this.creator_name = "Player 1";
    } else {
      this.creator_name = this.offer.creator[0].username;
    }
   
  }

  get opponent_eth() { return this.notificationForm.get('opponent_eth'); }  

  async onNotificationSubmit() {
    var { opponent_eth } = this.notificationForm.getRawValue()    

    this.result = await this.offerService.joinOffer(this._id, this.opponent_id, opponent_eth);
    if (this.result == undefined || this.result ==null ) {
      this._snackBar.open('Did not join into the offer. Please try it again.', 'Close');       
    } else {
      this._snackBar.open('Successfully joined.', 'Close');       
      this.router.navigateByUrl("/");
    }
    
  }

  addFund(): void{
    var wallet = this.modalForm.getRawValue(); 
    this.notificationForm.patchValue({opponent_eth: wallet.walletValue});
  }

}
