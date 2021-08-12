import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, Metamask, OfferService } from '@app/shared/services';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.scss']
})
export class ViewOfferComponent implements OnInit {

  _id : any;
  offer: any;
  creator_eth:any;
  term : any;
  date: any;
  desc: any;  

//this.date.getDate()+"/"+(this.date.getMonth()+1)+"/"+this.date.getFullYear()
  constructor(private router: Router, private route: ActivatedRoute, private Metamask: Metamask, private offerService:OfferService, private fb: FormBuilder, private _snackBar: MatSnackBar) { 
    this._id = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {  
    this.offer = await this.offerService.getOffer(this._id);  

    this.creator_eth = this.offer.eth;
    this.offer.term == "1" ? this.term = "English Premier League": 1;
    this.offer.term == "2" ? this.term = "NBA":1;
    this.offer.term == "3" ? this.term = "Spanish Premier League":1;
    this.date = this.offer.expiry;
    this.desc = this.offer.desc;    
  }
  
  
  
 
}
