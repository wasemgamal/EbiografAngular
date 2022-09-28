import { MovieService } from 'src/app/Services/Movie.service';
import { GeneralService } from 'src/app/Services/General.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-update-movie',
  templateUrl: './create-update-movie.component.html',
  styleUrls: ['./create-update-movie.component.css']
})
export class CreateUpdateMovieComponent implements OnInit {

  public id!: number;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,private generalService: GeneralService, public movieService: MovieService, private router: Router) { }


  public movieForm = this.formBuilder.group({
    movieID: [this.generalService.generateRandomID()],
    title: [''],
    imgLink: [''],
    description: [''],
    duration: [''],
    language: [''],
    releaseDate: [''],
    trailerLink: [''],
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    if(this.id){
      this.getMovie(this.id)
    }
  }

  save() {
    this.id ? this.movieService.update(this.id, this.movieForm.value) : this.movieService.createMovie(this.movieForm.value);
    this.router.navigate(['/dashboard', { outlets: { 'dashboard-content': ['movies'] } }])
  }

  getMovie(id:number){
    this.movieService.getMovieById(id).pipe(first()).subscribe(res=>{
      this.movieForm.patchValue(res);
    })
  }

}
