import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isUser = false;
  isSeller = false;
  isAdmin = false;
  role: any;
  isLogin = false;

  constructor() { }

  name: any;

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    console.log('aktualna rola:', this.role);
    if (this.role === 'admin') {
      this.isAdmin = true;
      this.isLogin = true;
    }
    if (this.role === 'seller') {
      this.isSeller = true;
      this.isLogin = true;
    }
    if (this.role === 'user') {
      this.isUser = true;
      this.isLogin = true;
      console.log('is user ', this.isUser);
    }
  }



}
