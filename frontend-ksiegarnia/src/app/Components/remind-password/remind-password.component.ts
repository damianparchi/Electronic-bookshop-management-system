import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../../Services/user/user-service.service";
import {ParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.css']
})
export class RemindPasswordComponent implements OnInit {

  constructor(private userService: UserServiceService,
              private route: Router,
              private matSnackBar: MatSnackBar) { }

  public error = null;
  message = null;
  token: any;
  public form = {
    email: null,
  };

  ngOnInit(): void {
      // this.token = localStorage.getItem('token');
      // console.log(this.token);
  }
  onSubmit() {

    this.userService.remindPassword(this.form).subscribe(

      data => this.handleResponse(data),
      error => this.handleError(error));
  }
  handleError(error: { error: any; }) {
    this.error = error.error.message;
    console.log(error);
    this.matSnackBar.open(error.error.message, 'ok', {
      duration: 5000
    });
  }
  handleResponse(data) {
    this.matSnackBar.open('Na podany adres e-mail wysłaliśmy link, który pomoże Ci przypomnieć sobie swoje hasło.', 'ok', {
      duration: 5000,
      verticalPosition: "top"
    });
    // this.route.navigateByUrl('\login');
  }


}
