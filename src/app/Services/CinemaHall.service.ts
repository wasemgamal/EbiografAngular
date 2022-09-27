import { GeneralService } from './General.service';
import { ICinemahall } from 'src/app/Interface/ICinemahall';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovie } from '../Interface/IMovie';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './LocalStorage.service';
@Injectable({
  providedIn: 'root'
})

export class CinemaHallService {
  public localKey: string = 'cinemaHalls';
  public CinemaHall!: Observable<ICinemahall>;
  constructor(private generalService : GeneralService, private http: HttpClient, private router: Router, private route: ActivatedRoute, public localService: LocalStorageService)// Creating a property with Variable http
  { }


  //Listen what product to show.

  // Get Movies
  getCinemaHalls(): Observable<any[]> {
    // return this.http.get<any>(`${environment.baseUrl}/CinemaHall`);
    return of(this.localService.getLocalList(this.localKey))
  }

  getCinemaHallById(id: string | number): Observable<ICinemahall> {
    // return this.http.get<ICinemahall>(`${environment.baseUrl}/CinemaHall/${id}`);
    return of(this.localService.getItemInLocalList(id, this.localKey, 'cinemaHallID'));
  }

  createCinemaHall(hall: ICinemahall){
    const HALL : ICinemahall = {
      ...hall,
      shows: [],
    }
    this.localService.createItemInLocalList(this.localKey, HALL)
  }
}
