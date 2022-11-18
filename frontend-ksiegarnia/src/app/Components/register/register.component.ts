import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../Services/user/user-service.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  public error = '';
  message = null;
  public userr = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    phoneNumber: null,
    role: null,
  };


  constructor(private user: UserServiceService,
              private route: Router,
              private matSnakeBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  handleError(error) {
    //wyswietl error
    this.error = error.error.message;
  }

  onSubmit() {
    this.user.signUp(this.userr).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.message = data.message;
    //przejdz na localhost/login
    this.route.navigateByUrl('/login');
    //message
    this.matSnakeBar.open('Zarejestrowano pomyślnie! Możesz się zalogować!', 'ok', {
      duration: 5000
    });

  }
}
