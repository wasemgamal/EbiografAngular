import { IMovie } from 'src/app/Interface/IMovie';
import { MovieService } from 'src/app/Services/Movie.service';
import { CinemaHallService } from 'src/app/Services/CinemaHall.service';
import { ShowService } from 'src/app/Services/Show.service';
import { GeneralService } from 'src/app/Services/General.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ICinemahall } from 'src/app/Interface/ICinemahall';

@Component({
  selector: 'app-create-update-show',
  templateUrl: './create-update-show.component.html',
  styleUrls: ['./create-update-show.component.css']
})
export class CreateUpdateShowComponent implements OnInit {

  public id!: number;
  public movies: IMovie[] = [];
  public halls: ICinemahall[] = [];

  constructor(private hallsService: CinemaHallService, private moviesService: MovieService,private route: ActivatedRoute,private formBuilder: FormBuilder,private generalService: GeneralService, public showService: ShowService, private router: Router) { }


  public showForm = this.formBuilder.group({
    showID: [this.generalService.generateRandomID()],
    date: [''],
    startTime: [''],
    endTime: [''],
    movie: this.formBuilder.group({
      movieID: [''],
    }),
    cinemaHall: this.formBuilder.group({
      cinemaHallID: [''],
    }),
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    if(this.id){
      this.getShow(this.id)
    }

    this.getMovies();
    this.getHalls();
  }

  save() {
    let show = {
      ...this.showForm.value,
      movie: this.movies.find(item=> item.movieID === this.showForm.value.movie.movieID),
      cinemaHall: this.halls.find(item=> item.cinemaHallID === this.showForm.value.cinemaHall.cinemaHallID),
    } 
    this.id ? this.showService.update(this.id, show) : this.showService.createShow(show);
    this.router.navigate(['/dashboard', { outlets: { 'dashboard-content': ['shows'] } }])
  }

  getShow(id:number){
    this.showService.getShowById(id).pipe(first()).subscribe(res=>{
      this.showForm.patchValue(res);
    })
  }

  getMovies(){
    this.moviesService.GetMovies().pipe(first()).subscribe(res=>{
      this.movies = res;
    },err=>{

    })
  }

  getHalls(){
    this.hallsService.getCinemaHalls().pipe(first()).subscribe(res=>{
      this.halls = res;
    },err=>{

    })
  }

}
