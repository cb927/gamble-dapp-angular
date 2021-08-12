import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({ providedIn: 'root' })
export class TokenStorage {
  private tokenKey = 'authToken';
  constructor(private _snackBar: MatSnackBar) {  
  }
  signOut(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.clear();
  }

  saveToken(token?: string): void {
    if (!token) return;
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    var temp :any ;
    try {
      temp = localStorage.getItem(this.tokenKey);
    } catch {
      this._snackBar.open("We're sorry, but it seems you have third-party cookies disabled on your browser. Please enable the cookie of your browser if you want to use our site.", 'Close');
    }
    return localStorage.getItem(this.tokenKey);  
  }
}
