import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ICinemaSeat } from 'src/app/Interface/ICinemaSeat';
import { IMovie } from 'src/app/Interface/IMovie';
import { IShow } from 'src/app/Interface/IShow';
import { GeneralService } from 'src/app/Services/General.service';
import { MovieService } from 'src/app/Services/Movie.service';
import { ShowService } from 'src/app/Services/Show.service';
import { UserService } from 'src/app/Services/User.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  id!: string;
  show!: Partial<IShow>;
  selected!: Date;
  week = new Array(7).fill(new Date());
  shows: any = [];
  constructor(
    private rouite: ActivatedRoute,
    private movieContext: MovieService,
    public generalService: GeneralService,
    private showContext: ShowService) {

  }

  ngOnInit(): void {
    this.rouite.params.subscribe(params => this.id = params['id']);
    this.showDetails(this.id);
    this.getNextWeek();
    // this.getShows();
    this.selected = new Date();

  }

  showDetails(id: string) {
    this.showContext.getShowById(id).subscribe((res) => {
      this.show = res;
    });
  }

  getNextWeek() {
    var date = new Date();
    for (let i = 0; i < 7; i++) {
      this.week[i] = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);
    }

  }

  availablilitySeatClass(item:ICinemaSeat, seats:ICinemaSeat[] | undefined){
    return seats?.some(seat=> seat.cinemaSeatID === item.cinemaSeatID) ? 'badge-secondary':'badge-warning';
  }

}
