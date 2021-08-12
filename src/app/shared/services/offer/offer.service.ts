import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { tap, pluck } from 'rxjs/operators';
import { Offer } from '@app/shared/interfaces';

interface AuthResponse {
  offer: Offer;
}

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private offers = new BehaviorSubject<Offer | null>(null);

  constructor(private http: HttpClient) { }
  /*
  register(creator_id:string, term: string, expiry: string, eth: string, desc:string): Observable<Offer> {
    return this.http
      .post<AuthResponse>('/api/offer/register', {
        creator_id, term, expiry, eth, desc
      })
      .pipe(
        tap(({offer }) => {
          
        }),
        pluck('offer')
      );
  }
  */

  register(creator_id:string, term: string, expiry: string, eth: string, desc:string){   
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/register', { creator_id, term, expiry, eth, desc }, {
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);
      })
    });
  }

  getMarketOffers(user_id: string){
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/getMarketOffers', { user_id}, {  
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);
        /*
        if (data.length != 0  && data.length != undefined){
          resolve(data);
        }*/
      })
    });
  } 

  getCreateOffers(user_id: string){
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/getCreateOffers', { user_id}, {  
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);
      })
    });
  } 

  getJoinOffers(user_id: string){
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/getJoinOffers', { user_id}, {  
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);
      })
    });
  } 
  
  getAcceptOffers(user_id: string){
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/getAcceptOffers', { user_id}, {  
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);
      })
    });
  } 

  getSettledOffers(user_id: string){
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/getSettledOffers', { user_id}, {  
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);
      })
    });
  } 

  getFilter(user_id: string, minAmount:string, maxAmount:string, status:string, market:string){
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/getFilter', { user_id, minAmount, maxAmount, status, market}, {  
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);
        /*
        if (data.length != 0  && data.length != undefined){
          resolve(data);
        }*/
      })
    });
  } 

  getOffer(_id: string){
    
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/getOffer', {_id }, {  
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);        
      })
    });
  } 

  joinOffer(_id:string, opponent_id:string, opponent_eth: string){   
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/joinOffer', {_id, opponent_id, opponent_eth }, {
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);
      })
    });
  }

  acceptOffer(_id:string, flag:string){   
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/acceptOffer', {_id, flag }, {
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);
      })
    });
  }

  contestOffer(_id:string, user_id:string, desc:string){   
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/contestOffer', {_id, user_id, desc }, {
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);
      })
    });
  }

  getDisputedOffers(){
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/getDisputedOffers', { }, {  
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);
        /*
        if (data.length != 0  && data.length != undefined){
          resolve(data);
        }*/
      })
    });
  } 

  adminOffer(_id:string, winner:string){   
    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');      
      this.http.post('/api/offer/adminOffer', {_id, winner }, {
        headers: headers
      }).subscribe((data:any)=>{
        resolve(data);
      })
    });
  }

  

}
