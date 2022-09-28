import { ShowService } from 'src/app/Services/Show.service';
import { IShow } from 'src/app/Interface/IShow';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class DashboardShowsComponent implements OnInit {

  shows!: IShow[];
  constructor(public showService: ShowService) { }

  ngOnInit(): void {
    this.getHalls();
  }

  getHalls(){
    this.showService.getShows().pipe(first()).subscribe(res=>{
      this.shows = res;
    },err=>{

    })
  }

  delete(index:number){
    this.showService.delete(index).pipe(first()).subscribe(res=> this.shows = res);
  }

}
