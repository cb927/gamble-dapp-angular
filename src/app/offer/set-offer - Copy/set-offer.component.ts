import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { Metamask } from '@app/shared/services/metamask/metamask.service';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';

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

  address:any;
  addressSlice:any;
  hash:any;

  metaUser = false;

  notification = false;
  notificationForm : FormGroup;
  notificationUpdate = false;
  
  date = new Date();
//this.date.getDate()+"/"+(this.date.getMonth()+1)+"/"+this.date.getFullYear()
  constructor(private router: Router, private authService: AuthService, private Metamask: Metamask, private fb: FormBuilder) { 
    this.notificationForm = this.fb.group({
      term: new FormControl('', [Validators.required]),
      expiry: new FormControl(((this.date.getDate() < 10)?"0":"") + this.date.getDate() +"/"+(((this.date.getMonth()+1) < 10)?"0":"") + (this.date.getMonth()+1) +"/"+ this.date.getFullYear(), [Validators.required]),
      
      desc: new FormControl('', [Validators.required]),
      eth: new FormControl('', [Validators.required]),
    });  

  }

  ngOnInit() {  
    this.email = sessionStorage.getItem("email");
    this.address = sessionStorage.getItem('address');
  }

  get term() { return this.notificationForm.get('term'); }
  get expiry() { return this.notificationForm.get('expiry'); }  
  get desc() { return this.notificationForm.get('desc'); }  
  get eth() { return this.notificationForm.get('eth'); }  
  
  onNotificationSubmit(): void {
    var { term, expiry, desc, nft } = this.notificationForm.getRawValue()
  /*      
    this.authService.metaUserProfile(this.email, this.address,term,expiry,desc,nft ).subscribe((user) => { 
      if (user == undefined || user ==null ) {
        this.fail=true;        
      } else {
        this.success = true;
        //this.router.navigate(["/home"]).then(() => { window.location.reload();})
      }
    })
*/

  }

  async metamask(){
    sessionStorage.getItem('address')?this.router.navigate(["/setting"]).then(() => { window.location.reload();}) : await this.Metamask.connectETH();
    //await this.Metamask.connectETH();

  }


}
