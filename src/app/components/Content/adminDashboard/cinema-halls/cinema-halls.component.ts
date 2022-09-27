import { first } from 'rxjs/operators';
import { ICinemahall } from 'src/app/Interface/ICinemahall';
import { Component, OnInit } from '@angular/core';
import { CinemaHallService } from 'src/app/Services/CinemaHall.service';

@Component({
  selector: 'app-cinema-halls',
  templateUrl: './cinema-halls.component.html',
  styleUrls: ['./cinema-halls.component.css']
})
export class CinemaHallsComponent implements OnInit {

  halls!: ICinemahall[];
  constructor(public hallsService: CinemaHallService) { }

  ngOnInit(): void {
    this.getHalls();
  }

  getHalls(){
    this.hallsService.getCinemaHalls().pipe(first()).subscribe(res=>{
      this.halls = res;
      console.log(res)
    },err=>{

    })
  }
}
