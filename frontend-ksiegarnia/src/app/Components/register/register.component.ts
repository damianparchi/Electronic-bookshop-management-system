import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../Services/user-service.service";
import {User} from "../../Services/user";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  mobileNumber = new FormControl('', [Validators.required, Validators.pattern(new RegExp("[2-8 ]{8}"))]);
  username = new FormControl('', [Validators.required])
  hide = true;

  user: User = new User();

  constructor(private userServiceService: UserServiceService
  ) {
  }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Podaj email';
    }
    return this.email.hasError('email') ? 'Niepoprawny email' : '';
  }

  getErrorMobileMessage() {
    if (this.mobileNumber.hasError('required')) {
      return 'Podaj nr tel';
    }
    return this.mobileNumber.hasError('pattern') ? 'Zły numer' : '';
  }

  getErrorNameMessage() {
    if (this.mobileNumber.hasError('required')) {
      return 'Podaj nazwę użytkownika';
    }
    return this.mobileNumber.hasError('pattern') ? 'Zła nazwa użytkownika' : '';

  }

  userRegister() {
    console.log(this.user);
    this.userServiceService.registerUser(this.user).subscribe(data => {
      alert("Zarejestrowano pomyślnie!")
    }, error => alert("Nie udało się zarejestrować!"));
  }


}
