import { UserService } from 'src/app/Services/User.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
