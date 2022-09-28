import { IShow } from 'src/app/Interface/IShow';
import { GeneralService } from './General.service';
import { LocalStorageService } from './LocalStorage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMovie } from '../Interface/IMovie';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class ShowService {
  public localKey : string = 'shows';
  public show!: Observable<IShow>;
  constructor(private generalService: GeneralService, private http: HttpClient, private router: Router, private route: ActivatedRoute, public localService: LocalStorageService)// Creating a property with Variable http
  { }


  //Listen what product to show.


  getShows(): Observable<any[]> {
    // return this.http.get<any>(`${environment.baseUrl}/Movie`);
    return of(this.localService.getLocalList(this.localKey))
  }

  getShowById(id: string | number): Observable<IShow> {
    // return this.http.get<IMovie>(`${environment.baseUrl}/Movie/${id}`);
    return of(this.localService.getItemInLocalList(id, this.localKey, 'showID'));
  }

  createShow(show: IShow){
    const SHOW: IShow = {
      ...show,
      showID: this.generalService.generateRandomID(),
      availableSeats: show.cinemaHall.cinemaSeats
    }
    this.localService.createItemInLocalList(this.localKey, SHOW)
  }

  delete(index: number) {
    return of(this.localService.removeItemInLocalListByIndex(index, this.localKey))
  }

  update(id: number|string, show: IShow) {
    return of(this.localService.updateItemInLocalList(id, 'showID', this.localKey, show))
  }

}
