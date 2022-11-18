import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../Services/user/user-service.service";
import {TokenService} from "../../Services/token/token.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public error = null;
  public hide = true;
  public credentials = {
    email: null,
    password: null,
    role: null,
  };

  constructor(private user: UserServiceService,
              private token: TokenService,
              private route: Router,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  handleError(error: { error: any; }) {
    this.error = error.error.message;
    if (error.error.status === 0) {
      console.log('brak polaczenia z baza');
    }
    this.matSnackBar.open(error.error.message, 'ok', {
      duration: 5000
    });
    console.log(error);
  }

  onSubmit() {
    this.user.logIn(this.credentials).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.token.handle(data);
    console.log(data);
    this.token.signedIn();
    this.matSnackBar.open('Zalogowano pomyślnie!', 'ok', {
      duration: 5000
    });
    if (this.credentials.role === 'admin') {
      localStorage.setItem('role', 'admin');
      this.route.navigateByUrl('home');
      return;
    }
    if (this.credentials.role === 'seller') {
      localStorage.setItem('role', 'seller');
      this.route.navigateByUrl('home');
      return;
    }
    if (this.credentials.role === 'user') {
      localStorage.setItem('role', 'user');
      this.route.navigateByUrl('home');
      return;
    }
  }
}
