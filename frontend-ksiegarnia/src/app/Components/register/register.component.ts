import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../../Services/user-service.service";
import {User} from "../../Services/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User =new User();
  constructor(private userServiceService: UserServiceService
  ) {
  }
  ngOnInit(): void{
  }

  userRegister(){
    console.log(this.user);
    this.userServiceService.registerUser(this.user).subscribe(data=>{
      alert("Zarejestrowano pomyślnie!")
    },error=>alert("Nie udało się zarejestrować!"));
  }


}
