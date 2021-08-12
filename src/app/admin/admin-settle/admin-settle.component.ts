import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, Metamask, OfferService } from '@app/shared/services';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-settle',
  templateUrl: './admin-settle.component.html',
  styleUrls: ['./admin-settle.component.scss']
})
export class AdminSettleComponent implements OnInit {

  _id : any;
  offer: any;
  result:any;
  creator:any;
  creator_name:any;
  creator_eth:any;
  creator_usd:any;
  term : any;
  date: any;
  desc: any;
  opponent_name:any;
  opponent_eth:any;
  opponent_usd:any;
  winner_name:any;

  notificationForm : FormGroup;
  
  constructor(private router: Router, private route: ActivatedRoute, private offerService: OfferService, private authService: AuthService, private fb: FormBuilder, private _snackBar: MatSnackBar) { 
    
    if ( sessionStorage.getItem('roles') != "1" ) this.router.navigateByUrl("/");

    this.notificationForm = this.fb.group({      
    });  
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
    this.desc = this.offer.contest_desc;
    this.opponent_eth = this.offer.opponent_eth;
    this.opponent_usd = (this.offer.opponent_eth * 2700).toFixed(2);
   
    if (this.offer.creator[0]==undefined || this.offer.creator[0]==null || this.offer.creator[0]=="") {
      this.creator_name = "Player 1";
    } else {
      this.creator_name = this.offer.creator[0].username;
    }
    
    this.authService.userProfile(this.offer.opponent_id).subscribe((user) => { 
      if (user==undefined || user==null ) {
        this.opponent_name = "Player 2";
      } else {
        this.opponent_name = user.username;
      }
    });

    this.authService.userProfile(this.offer.winner_id).subscribe((user) => { 
      if (user==undefined || user==null ) {
        this.winner_name = "NONE";
      } else {
        this.winner_name = user.username;
      }
    });
  }

  async win(winner:string){
    (winner == "1") ? winner = this.offer.creator_id : winner = this.offer.opponent_id;
    this.result = await this.offerService.adminOffer(this._id, winner);
    if (this.result == undefined || this.result ==null ) {
      this._snackBar.open('DB is not connected. Please try it again.', 'Close');       
    } else {
      (winner == "1")? this._snackBar.open('Successfully accepted.', 'Close') :  this._snackBar.open('Successfully declined.', 'Close');  
      this.router.navigateByUrl("/");
    }
  }

}
