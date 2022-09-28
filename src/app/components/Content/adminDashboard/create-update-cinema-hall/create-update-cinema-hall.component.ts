import { ICinemaSeat } from 'src/app/Interface/ICinemaSeat';
import { GeneralService } from 'src/app/Services/General.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CinemaHallService } from 'src/app/Services/CinemaHall.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-update-cinema-hall',
  templateUrl: './create-update-cinema-hall.component.html',
  styleUrls: ['./create-update-cinema-hall.component.css']
})
export class CreateUpdateCinemaHallComponent implements OnInit {

  public id!:string;
  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private generalService: GeneralService, public hallsService: CinemaHallService, private router: Router) { }


  // cinema seat formGroup
  cinemaSeatGroup(data?: ICinemaSeat): FormGroup{
    return this.formBuilder.group({
      cinemaSeatID: data?.cinemaSeatID?? this.generalService.generateRandomID(),
      seatNumber: data?.seatNumber,
      price: data?.price,
      cinemaHallID: data?.cinemaHallID ?? this.hallForm?.get('cinemaHallID')?.value
    })
  }

  get cinemaSeatsControl(): FormArray{
    return this.hallForm.get('cinemaSeats') as FormArray;
  }
  public hallForm = this.formBuilder.group({
    name: [''],
    cinemaHallID: this.generalService.generateRandomID(),
    cinemaSeats: this.formBuilder.array([])
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    if(this.id){
      this.getHall(this.id)
    }
  }

  pushNewSeat(data?:ICinemaSeat){
    this.cinemaSeatsControl.push(this.cinemaSeatGroup(data))
  }

  save(){
    this.id ? this.hallsService.update(this.id,this.hallForm.value) : this.hallsService.createCinemaHall(this.hallForm.value);
    this.router.navigate(['/dashboard', {outlets: {'dashboard-content': ['cinemaHalls']}}])
  }

  getHall(id:string){
    this.hallsService.getCinemaHallById(id).pipe(first()).subscribe(res=>{
      this.hallForm.patchValue(res);
      res.cinemaSeats.map(item=> this.pushNewSeat(item));
    })
  }

}
