import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IMovie } from 'src/app/Interface/IMovie';
import { MovieService } from 'src/app/Services/Movie.service';

@Component({
  selector: 'app-dashboard-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class DashboardMoviesComponent implements OnInit {

  movies!: IMovie[];
  constructor(public moviesService: MovieService) { }

  ngOnInit(): void {
    this.getHalls();
  }

  getHalls(){
    this.moviesService.GetMovies().pipe(first()).subscribe(res=>{
      this.movies = res;
    },err=>{

    })
  }

  delete(index:number){
    this.moviesService.delete(index).pipe(first()).subscribe(res=> this.movies = res);
  }

}
