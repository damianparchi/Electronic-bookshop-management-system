import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../../Services/user/user-service.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  public error = null;
  public hide = true;
  token: any;
  public form = {
    email: null,
    newPassword: null,
    confirmPassword: null,
  }

  constructor(private userService: UserServiceService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private matSnakeBar: MatSnackBar){}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((parameters: ParamMap) => {
      this.token = parameters.get('token');
      console.log(this.token);
    });
    if(this.token == null) {
      this.token = localStorage.getItem('token');
    }
  }

  handleError(error) {
    this.error = error.error.message;
    console.log(error);
    this.matSnakeBar.open(error.error.message, 'ok', {
      duration: 5000
    });
  }
  onSubmit() {
    this.userService.changePassword(this.form, this.token).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    this.matSnakeBar.open('Hasło zostało zmienione', 'ok', {
      duration: 5000,
      verticalPosition: "top"
    });
    // this.route.navigateByUrl('\login');
  }

}
