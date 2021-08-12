import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { Metamask } from '@app/shared/services/metamask/metamask.service';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  rememberMe = false;
  current_user:any;
  
  exist = false;
  _id :any;

  address:any;
  addressSlice:any;
  hash:any;

  metaUser = false;

  account=false;
  accountForm : FormGroup;
  
  general = true;
  generalForm : FormGroup;
  fail = false;
  success = false;

  notification = false;
  notificationForm : FormGroup;
  notificationUpdate = false;

  appearance = false;
  appearanceForm : FormGroup;

  constructor(private router: Router, private authService: AuthService, private Metamask: Metamask, private fb: FormBuilder) { 
        
    if (sessionStorage.getItem('address')){
      this.address = sessionStorage.getItem('address');
      this.addressSlice = this.address.slice(0,8) + '...'+this.address.slice(32,42)
      //this.hash = sessionStorage.getItem('hash');
      this.metaUser = true;
    } 

    this.accountForm = this.fb.group({
      walletAddress: new FormControl('')
    });  

    this.generalForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      bio: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email])
    });  

    this.notificationForm = this.fb.group({
      item: new FormControl(''),
      bid: new FormControl(''),
      price: new FormControl(''),
      auction: new FormControl(''),
      outbid: new FormControl(''),
      referral: new FormControl(''),
      asset: new FormControl(''),
      purchase: new FormControl(''),
      newsletter: new FormControl(''),
      ethvalue: new FormControl('', [Validators.required]),
      exchange: new FormControl('')
    });  

    this.appearanceForm = new FormGroup({
      theme : new FormControl(''),
    });

    
  }

  ngOnInit() {  
    
    this._id = sessionStorage.getItem('_id');
    this.authService.userProfile(this._id).subscribe((user) => { 
      if (user == undefined || user == null ) {
            
      } else {
        this.accountForm.patchValue({walletAccount:this.address})

        this.generalForm.patchValue({email: user.email});
        this.generalForm.patchValue({bio:user.bio});
        this.generalForm.patchValue({username: user.username});

        this.notificationForm.patchValue({item: user.item});
        this.notificationForm.patchValue({bid:user.bid});
        this.notificationForm.patchValue({price: user.price});
        this.notificationForm.patchValue({auction: user.auction});
        this.notificationForm.patchValue({outbid:user.outbid});
        this.notificationForm.patchValue({referral: user.referral});
        this.notificationForm.patchValue({asset: user.asset});
        this.notificationForm.patchValue({purchase:user.purchase});
        this.notificationForm.patchValue({newsletter: user.newsletter});
        this.notificationForm.patchValue({ethvalue: user.ethvalue});
        this.notificationForm.patchValue({exchange: user.exchange});
      }
    }) 

  }

  // General page
  get username() { return this.generalForm.get('username'); }
  get email() { return this.generalForm.get('email'); }  
  
  // Notification page
  get ethvalue() { return this.notificationForm.get('ethvalue'); }  
  get exchange() { return this.notificationForm.get('ethvalue'); }  
  
  onAccountSubmit(): void {
    var { walletAddress } = this.generalForm.getRawValue();
    

  }

  onGeneralSubmit(): void {
    var { email, bio, username } = this.generalForm.getRawValue();
    /*
    this.authService.metaUserProfile(username, bio, email, this.address, this.hash, "1" ).subscribe((user) => { 
      if (user == undefined || user == null ) {
        this.fail=true;        
      } else {
        this.success = true;
        //this.router.navigate(["/home"]).then(() => { window.location.reload();})
      }
    })
    */


  }

  onNotificationSubmit(): void {
    var { item, bid, price, auction, outbid, referral, asset, purchase, newsletter, ethvalue, exchange } = this.notificationForm.getRawValue()
    item? item=1:item="";
    bid? bid=1:bid="";
    price? price=1:price="";
    auction? auction=1:auction="";
    outbid? outbid=1:outbid="";
    referral? referral=1:referral="";
    asset? asset=1:asset="";
    purchase? purchase=1:purchase="";
    newsletter? newsletter=1:newsletter="";  
    exchange = ethvalue * 2775;
/*    
    this.authService.metaUserNotification(this.beforeEmail, this.address, item,bid,price,auction,outbid,referral,asset,purchase,newsletter,ethvalue,exchange ).subscribe((user) => { 
      if (user == undefined || user ==null ) {
            
      } else {
        this.notificationUpdate = true;
      }
    })
*/

  }


  accountClick(): void {
    this.account = true;
    this.general = false;
    this.notification = false;
    this.appearance = false;
  }

  generalClick(): void {
    this.account = false;
    this.general = true;
    this.notification = false;
    this.appearance = false;    
  }

  notificationClick(): void {
    this.account = false;
    this.general = false;
    this.notification = true;
    this.appearance = false;
  }

  appearanceClick(): void {
    this.account = false;
    this.general = false;
    this.notification = false;
    this.appearance = true;
  }

  async metamask(){
    sessionStorage.getItem('address')?this.router.navigate(["/setting"]).then(() => { window.location.reload();}) : await this.Metamask.connectETH();
    //await this.Metamask.connectETH();

  }

}
