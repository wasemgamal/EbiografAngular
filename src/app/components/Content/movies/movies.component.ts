import { IShow } from 'src/app/Interface/IShow';
import { ShowService } from 'src/app/Services/Show.service';
import { Component, OnInit } from '@angular/core';
import { first, min } from 'rxjs/operators';
import { IMovie } from 'src/app/Interface/IMovie';
import { MovieService } from 'src/app/Services/Movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movieYear!: string;
  math = Math;
  constructor(private movieContext: MovieService, private showService: ShowService) { }
  MoviesDisplay: any = [];
  ShowsDisplay: IShow[] = [];
  ngOnInit(): void {
    this.loadMovies();
  }
  loadMovies() {
    this.movieContext.GetMovies().subscribe((movieResult) => {
      this.MoviesDisplay = movieResult;
    });
  }
  loadShows() {
    this.showService.getShows().pipe(first()).subscribe((res) => {
      this.ShowsDisplay = res;
    });
  }
  convertMinuteToHour(minute:number){
    var hours = this.math.floor(minute/60);
    var minutes = minute % 60;
    var duration = hours+" H : " +minutes + "M";
    return duration;
  }

}

