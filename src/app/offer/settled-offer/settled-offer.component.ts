import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, Metamask, OfferService } from '@app/shared/services';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-settled-offer',
  templateUrl: './settled-offer.component.html',
  styleUrls: ['./settled-offer.component.scss']
})
export class SettledOfferComponent implements OnInit {
  
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
  desc:any;
  opponent_name:any;
  opponent_eth:any;
  opponent_usd:any;
  user_id : any;

  notificationForm : FormGroup;
  
  constructor(private router: Router, private route: ActivatedRoute, private offerService: OfferService, private authService: AuthService, private fb: FormBuilder, private _snackBar: MatSnackBar) { 
    
    this.notificationForm = this.fb.group({
     
    });  

    this._id = this.route.snapshot.paramMap.get('id');
    this.user_id = sessionStorage.getItem("_id");
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
    this.opponent_eth = this.offer.opponent_eth;
    this.opponent_usd = (this.offer.opponent_eth * 2700).toFixed(2);
   
    if (this.offer.creator[0].username==undefined || this.offer.creator[0].username==null || this.offer.creator[0].username=="") {
      this.creator_name = "Player 1";
    } else {
      this.creator_name = this.offer.creator[0].username;
    }
    
    this.authService.userProfile(this.offer.opponent_id).subscribe((user) => { 
      if (user.username==undefined || user.username==null || user.username=="") {
        this.opponent_name = "Player 2";
      } else {
        this.opponent_name = user.username;
      }
    });
  }  

  async onNotificationSubmit() {
/*
    var { desc } = this.notificationForm.getRawValue()    

    this.result = await this.offerService.contestOffer(this._id, this.user_id, desc);
    if (this.result == undefined || this.result ==null ) {
      this._snackBar.open('DB is not connected. Please try it again.', 'Close');       
    } else {
      this._snackBar.open('Successfully reported.', 'Close');       
      this.router.navigateByUrl("/");
    }
 */  
  } 

}
