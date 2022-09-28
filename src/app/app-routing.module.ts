import { CreateUpdateCinemaHallComponent } from './components/Content/adminDashboard/create-update-cinema-hall/create-update-cinema-hall.component';
import { CinemaHallsComponent } from './components/Content/adminDashboard/cinema-halls/cinema-halls.component';
import { DashboardMoviesComponent } from './components/Content/adminDashboard/movies/movies.component';
import { AdminGuard } from './guards/admin.guard';
import { DashboardHomeComponent } from './components/Content/adminDashboard/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/Content/profile/profile.component';
import { EditProfileComponent } from './components/Content/Profile-content/edit-profile/edit-profile.component';
import { MyprofileComponent } from './components/Content/Profile-content/myprofile/myprofile.component';
import { MyHistoryComponent } from './components/Content/Profile-content/my-history/my-history.component';
import { MovieDetailsComponent } from './components/Content/movies/movie-details/movie-details.component';
import { MovieTicketComponent } from './components/Content/movies/movie-ticket/movie-ticket.component';
import { BookingNavComponent } from './components/Content/movies/movie-ticket/booking-nav/booking-nav.component';
import { TicketComponent } from './components/Content/movies/movie-ticket/bookingNav/ticket/ticket.component';
import { UsersComponent } from './components/Content/adminDashboard/users/users.component';
import { DashboardShowsComponent } from './components/Content/adminDashboard/shows/shows.component';
import { CreateUpdateMovieComponent } from './components/Content/adminDashboard/create-update-movie/create-update-movie.component';
import { CreateUpdateShowComponent } from './components/Content/adminDashboard/create-update-show/create-update-show.component';
import { ShowDetailsComponent } from './components/Content/main-shows/show-details/show-details.component';
const routes: Routes = [
{path:'home', component:HomeComponent},
{path:'',redirectTo: 'home', pathMatch:'full'},
{path:"login",component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'profile',component:ProfileComponent,canActivate:[AuthGuard],children:[
    {path:'myprofile',component:MyprofileComponent,outlet:'profile-content'},
    {path:'edit-profile',component:EditProfileComponent,outlet:'profile-content'},
    {path:'my-history',component:MyHistoryComponent,outlet:'profile-content'},
    {path:'',redirectTo:'/profile/(profile-content:myprofile)',pathMatch:'full'}
]},
{path:'dashboard',component:DashboardHomeComponent,canActivate:[AuthGuard, AdminGuard],children:[

    {path:'movies',component:DashboardMoviesComponent,outlet:'dashboard-content'},
    {path:'shows',component:DashboardShowsComponent,outlet:'dashboard-content'},
    {path:'cinemaHalls',component:CinemaHallsComponent,outlet:'dashboard-content'},
    {path:'users',component:UsersComponent,outlet:'dashboard-content'},
    {path:'my-history',component:MyHistoryComponent,outlet:'dashboard-content'},
    {path:'create-cinema-hall',component:CreateUpdateCinemaHallComponent,outlet:'dashboard-content'},
    {path:'update-cinema-hall/:id',component:CreateUpdateCinemaHallComponent,outlet:'dashboard-content',},
    {path:'create-movie',component:CreateUpdateMovieComponent,outlet:'dashboard-content'},
    {path:'update-movie/:id',component:CreateUpdateMovieComponent,outlet:'dashboard-content'},
    {path:'create-show',component:CreateUpdateShowComponent,outlet:'dashboard-content'},
    {path:'update-show/:id',component:CreateUpdateShowComponent,outlet:'dashboard-content'},
    {path:'',redirectTo:'/dashboard/(dashboard-content:movies)',pathMatch:'full'}

]},
{path: 'movie/:id',component:MovieDetailsComponent},
{path: 'show/:id',component:ShowDetailsComponent},
{path: 'movie/:movieID/show/:showID',component:MovieTicketComponent},
{path: 'movie/:movieID/show/:showID/booking/:bookingID/ticket/:ticketID',component:BookingNavComponent},
{path: 'movieticket/:paymentID',component:TicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload',  enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
