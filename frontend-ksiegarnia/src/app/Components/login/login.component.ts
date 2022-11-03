import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public error = null;
  public hide = true;
  public isLoading = false;
  public form = {
    email: null,
    password: null,
    role: null,
  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading = true;
  }
}
