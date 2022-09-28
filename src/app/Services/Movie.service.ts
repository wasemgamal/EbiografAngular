import { GeneralService } from './General.service';
import { LocalStorageService } from './LocalStorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { IAuthenticationUser } from '../Interface/IAuthenticationUser';
import { IMovie } from '../Interface/IMovie';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class MovieService {
  public localKey : string = 'movies';
  public Movie!: Observable<IMovie>;
  constructor(private generalService: GeneralService, private http: HttpClient, private router: Router, private route: ActivatedRoute, public localService: LocalStorageService)// Creating a property with Variable http
  { }


  //Listen what product to show.


  // Get Movies
  GetMovies(): Observable<any[]> {
    // return this.http.get<any>(`${environment.baseUrl}/Movie`);
    return of(this.localService.getLocalList(this.localKey))
  }

  getMovieById(id: string | number): Observable<IMovie> {
    // return this.http.get<IMovie>(`${environment.baseUrl}/Movie/${id}`);
    return of(this.localService.getItemInLocalList(id, this.localKey, 'movieID'));
  }

  createMovie(movie: IMovie){
    const MOVIE: IMovie = {
      ...movie,
      movieID: this.generalService.generateRandomID(),
    }
    this.localService.createItemInLocalList(this.localKey, MOVIE)
  }

  delete(index: number) {
    return of(this.localService.removeItemInLocalListByIndex(index, this.localKey))
  }

  update(id: number|string, movie: IMovie) {
    return of(this.localService.updateItemInLocalList(id, 'movieID', this.localKey, movie))
  }
}
