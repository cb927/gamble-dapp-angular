import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Metamask, OfferService } from '@app/shared/services';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-set-offer',
  templateUrl: './set-offer.component.html',
  styleUrls: ['./set-offer.component.scss']
})
export class SetOfferComponent implements OnInit {


  rememberMe = false;
  current_user:any;

  fail=false;
  success=false;
  
  exist = false;
  email :any;
  creator_id: any;

  address:any;
  addressSlice:any;
  hash:any;
  offer : any;
  metaUser = false;

  notification = false;
  notificationForm : FormGroup;
  modalForm : FormGroup;
  notificationUpdate = false;
  
  date = new Date();
//this.date.getDate()+"/"+(this.date.getMonth()+1)+"/"+this.date.getFullYear()
  constructor(private router: Router, private Metamask: Metamask, private offerService:OfferService, private fb: FormBuilder, private _snackBar: MatSnackBar) { 
    this.notificationForm = this.fb.group({
      term: new FormControl('', [Validators.required]),
      expiry: new FormControl(this.date.getFullYear()+"-"+(((this.date.getMonth()+1) < 10)?"0":"") + (this.date.getMonth()+1)+"-"+((this.date.getDate() < 10)?"0":"") + this.date.getDate(), [Validators.required]),
      
      desc: new FormControl('', [Validators.required]),
      eth: new FormControl('', [Validators.required]),
    });  

    this.modalForm = this.fb.group({
      walletValue: new FormControl(''),
    }); 

  }

  ngOnInit() {  
    this.creator_id = sessionStorage.getItem("_id");
  }

  get term() { return this.notificationForm.get('term'); }
  get expiry() { return this.notificationForm.get('expiry'); }  
  get desc() { return this.notificationForm.get('desc'); }  
  get eth() { return this.notificationForm.get('eth'); }  

  set eth(value) { this.notificationForm.setValue(['eth', value])}
  
  async onNotificationSubmit() {
    var { term, expiry, eth, desc } = this.notificationForm.getRawValue()    

    this.offer = await this.offerService.register(this.creator_id, term, expiry, eth, desc);
    if (this.offer == undefined || this.offer ==null ) {
      this._snackBar.open("Can't make new offer. Please check DB connection and try it again", 'Close');    
    } else {
      this._snackBar.open('Created new offer successfully.', 'Close');    
      this.router.navigateByUrl("/");
    }
    
  }

  async metamask(){
    sessionStorage.getItem('address')?this.router.navigate(["/setting"]).then(() => { window.location.reload();}) : await this.Metamask.connectETH();
    //await this.Metamask.connectETH();

  }

  addFund(): void{
    var wallet = this.modalForm.getRawValue(); 
    this.notificationForm.patchValue({eth: wallet.walletValue});
  }



}
