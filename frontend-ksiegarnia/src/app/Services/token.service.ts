import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public signIn = false;

  constructor() { }


  public handle(data){
    this.set(data);
  }

  public get (){
    return localStorage.getItem('token');
  }

  public set(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);
    localStorage.setItem('Name', data.obj.username);
    localStorage.setItem('phoneNumber', data.phoneNumber);
  }

  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('Name');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('role');
    sessionStorage.clear();
  }

  signedIn(value: boolean){
    if (this.get()!=null){
      return this.signIn = true;
    }
  }

}
