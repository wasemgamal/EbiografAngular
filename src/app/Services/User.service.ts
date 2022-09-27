import { GeneralService } from './General.service';
import { LocalStorageService } from './LocalStorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { IAuthenticationUser } from '../Interface/IAuthenticationUser';
import { IUser } from '../Interface/IUser';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  public user!: Observable<IUser>;
  public localKeyUser = 'user';
  public localKeyUsers = 'users';
  // This will be used to save data locally for token usages.
  private userSubject!: BehaviorSubject<IUser>;
  //URL TO MY API Authentication.
  authUrl: string = "https://localhost:44378/api/User/authenticate"
  // BaseURL
  localUser!: IUser;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, public generalService: GeneralService, public localService: LocalStorageService)// Creating a property with Variable http
  {
    // Returns the localstored user and added in userSubject.
    this.userSubject = new BehaviorSubject<IUser>(this.localService.getLocalItem(this.localKeyUser)!);
    this.user = this.userSubject.asObservable();
    if(!this.localService.getLocalList(this.localKeyUsers).some(user=> user.role === 'admin')){
      this.register({
        userName: 'admin',
        password:'admin',
        phone:'000000000',
        role: 'admin',
        emailAddress: 'admin@admin.com',
        firstName: 'admin',
        lastName: 'admin',
        userID: this.generalService.generateRandomID(),
        dateCreated: new Date(),
        token: 'adminToken'
      })
    }
  }

  // Getting current user value.
  public get userValue(): IUser {
    return this.userSubject.value;
  }



  httpOptions = {
    Headers: new HttpHeaders({ 'content-Type': 'application/json' })
  }


  AuthorizeUserLogin(model: IUser): Observable<IUser> {
    // return await this.http.post<IUser>(this.authUrl, model)
    //   .pipe(map(user => {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('user', JSON.stringify(user));
    //     this.userSubject.next(user);

    //     return user;
    //   }));
    const USER = this.localService.getLocalList(this.localKeyUsers).find((user: IUser) => (user.userName === model.userName) && (user.password === model.password));
    if (USER){
      this.localService.setLocalKey(this.localKeyUser, USER);
      this.userSubject.next(USER);
      return of(USER)
    }
    return throwError('Credentials doesn\'t match our records');  
  }

  isAdmin(){
    return this.userValue.role === 'admin' ? true:false;
  }

  logout() {
    // remove user from local storage and set current user to null
    this.localService.removeLocalKey(this.localKeyUser);
    this.userSubject.next(null!);
    this.router.navigate(['/home'])
  }
  isAuthenticated() {
    this.localUser = this.userValue;
    if (this.localUser != null) {
      return true;
    }
    else {
      return false;
    }
  }

  register(user: IUser) {
    // return await this.http.post(`${environment.baseUrl}/User/register`, user)
    const USER: IUser = {
      ...user,
      userID: this.generalService.generateRandomID(),
    }
    return of(this.localService.createItemInLocalList(this.localKeyUsers, USER));
  }
  getUsers() {
    // return await this.http.post(`${environment.baseUrl}/User/register`, user)
    
    return of(this.localService.getLocalList(this.localKeyUsers));
  }

  async update(id: number|string, user: IUser) {
    // return await this.http.put(`${environment.baseUrl}/User/${id}`, user).pipe
    //   (map(x => {
    //     // update stored user if the logged in user updated their own record.
    //     if (id == this.userValue.userID) {
    //       //update local storage user data.
    //       //Three dots mean that there method can get as parameters as much argument of type Object as it likes.
    //       const Localuser = { ...this.userValue, ...user };
    //       localStorage.setItem('user', JSON.stringify(Localuser));
    //       // publish updated user to subscribers
    //       this.userSubject.next(Localuser);
    //     }
    //     return x;
    //   }))
    return of(this.localService.updateItemInLocalList(id, this.localKeyUsers, user))
  }

  delete(index: number) {
    return of(this.localService.removeItemInLocalListByIndex(index, this.localKeyUsers))
  }

  getUserById(id: number) {
    return this.http.get<IUser>(`${environment.baseUrl}/User/${id}`);
  }
}













