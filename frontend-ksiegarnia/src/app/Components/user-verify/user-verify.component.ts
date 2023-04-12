import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../../Services/user/user-service.service";
import {ActivatedRoute, ActivatedRouteSnapshot, ParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-verify',
  templateUrl: './user-verify.component.html',
  styleUrls: ['./user-verify.component.css']
})
export class UserVerifyComponent implements OnInit {

  constructor(private userService: UserServiceService,private route: Router, private activatedRoute: ActivatedRoute, private matsnackbar: MatSnackBar) { }

  token: any;
  error: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parameters: ParamMap) => {
      this.token = parameters.get('token');
      console.log(this.token);
    });
  }



  onSubmit() {
    this.route.navigate(['paymentmethod.htm'])
  }

  handleError(error) {
    this.error = error.error.message;
    console.log(error);
    this.matsnackbar.open("Error", 'ok', {
      duration: 5000
    });
  }

  handleResponse(data) {
    this.matsnackbar.open('Sucessfull Update Password ', 'ok', {
      duration: 5000
    });
    // this.route.navigateByUrl('\login');
  }

}
