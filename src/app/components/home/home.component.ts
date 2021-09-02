import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import { IUser } from 'src/app/Interface/IUser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username!:string;
  user!:IUser;
  islogin = false;
  constructor(private userService:UserService, private router:Router){
    //gets this current user.
    this.userService.user.subscribe(x=> this.user = x);
    this.user = this.userService.userValue;
  }
  ngOnInit(): void {
    if(this.user){
      this.islogin = true;
    }

  }

  logoutUser(){
    this.userService.logout();
    this.islogin = false;


  }
  loginUser(){
    this.router.navigate(['/login']);
  }
}
