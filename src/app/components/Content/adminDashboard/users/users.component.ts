import { IUser } from 'src/app/Interface/IUser';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/Services/User.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: IUser[];
  constructor(public usersService: UserService) { }

  ngOnInit(): void {
    this.getHalls();
  }

  getHalls(){
    this.usersService.getUsers().pipe(first()).subscribe(res=>{
      this.users = res;
    },err=>{

    })
  }

  delete(index:number){
    this.usersService.delete(index).pipe(first()).subscribe(res=> this.users = res);
  }

}
