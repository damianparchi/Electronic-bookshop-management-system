import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../Services/token/token.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {

  username: any;
  role: any;
  isUser = false;
  isSeller = false;
  isAdmin = false;

  constructor(private token: TokenService,
              private route: Router,
              private matsnackbar: MatSnackBar) { }

  ngOnInit(): void {

  this.username = localStorage.getItem('Name');
  this.role = localStorage.getItem('role');
  console.log('username: '+ this.username +' role: '+ this.role)

  if(this.role === 'user') {
    this.isUser = true;
  }
  if(this.role === 'seller') {
    this.isSeller = true;
  }
  if(this.role === 'admin') {
    this.isAdmin = true;
  }
}

  logout(event: MouseEvent) {
    console.log('wylogowanie');
    event.preventDefault();
    this.token.remove();
    this.token.signedIn();
    this.route.navigateByUrl('/home/login');
    this.matsnackbar.open('Wylogowano pomyślnie!', 'ok', {
      duration: 5000
    });
  }

}
