import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '@app/shared/services/auth/auth.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import {MatSnackBar} from '@angular/material/snack-bar';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Metamask {
  
  chainId: any;
  address: any;
  duplicationWallet = false;

  constructor(private router: Router, private authService:AuthService, private http: HttpClient, private _snackBar: MatSnackBar) {
    
  }

  async connectETH () {
    try {
      if (window.ethereum === undefined) {
        window.open("https://metamask.io/download.html");
      } else {
        this.chainId = window.ethereum.chainId;
        // window.ethereum.request({method: 'disconnect'}).then((result: any) => {
        //   console.log("disconnected");
        // })
        //window.ethereum.on('connect', this.reConnect);
        if (window.ethereum.isConnected()) {
          
          let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          window.ethereum.on('accountsChanged', (accounts:any) => {
            // Handle the new accounts, or lack thereof.
            // "accounts" will always be an array, but it can be empty.
            console.log("success");
          });
          if (Array.isArray(accounts)){
            this.address = accounts[0];
            this.signETH(this.address, this.chainId);            
          } 
        } else {
          window.ethereum.on('connect', this.chainId);
        }                   
      }        
    } catch (error) {
      console.error(error);
    }
  };

  reConnect() {
  }

  async signETH (address: any, chainId: any) {

    let message='Welcome to our site\n\n Click "Sign" to sign in. No password needed!\n\nI accept this Term of Service \n\nWallet address:\n '+ address;
    let params =[address, message, chainId]
    
    await window.ethereum.request({method: 'personal_sign', params,}).then((result: any) => {
      // The result varies by by RPC method.
      // For example, this method will return a transaction hash hexadecimal string on success.
      let _id= sessionStorage.getItem("_id");
      //this.authService.registerMetamask(address, chainId);
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      

	  this.http.post('/api/auth/registerMetamask', {_id, address, chainId}, {  
        headers: headers
      }).subscribe((user:any)=>{ 
        if (user == "")  {
          this._snackBar.open('The other user has the wallet address. Please try other wallet.', 'Close'); 
        } else {
          this.duplicationWallet = false;
          sessionStorage.setItem('address', this.address)
          sessionStorage.setItem('chainId', this.chainId)    
          sessionStorage.setItem('hash', result);      
          sessionStorage.setItem("_id", user._id);   
          sessionStorage.setItem("roles", user.roles);   
          sessionStorage.setItem("email", user.email);   
          sessionStorage.setItem("username", user.username);   
          
          this.router.navigate(["/setting"]).then(() => {window.location.reload();})
        }
      })   
  
    })
    .catch((error: any) => {
      // If the request fails, the Promise will reject with an error.
      console.log(error)
    });
         
  };

  getInformation(_signedAccount: any){
    
  }

}
function block(_display: any, _block: any) {
  throw new Error('Function not implemented.');
}

