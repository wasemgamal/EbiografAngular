import { ICinemaSeat } from 'src/app/Interface/ICinemaSeat';
import { GeneralService } from 'src/app/Services/General.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CinemaHallService } from 'src/app/Services/CinemaHall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-update-cinema-hall',
  templateUrl: './create-update-cinema-hall.component.html',
  styleUrls: ['./create-update-cinema-hall.component.css']
})
export class CreateUpdateCinemaHallComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private generalService: GeneralService, public hallsService: CinemaHallService, private router: Router) { }


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
  }

  pushNewSeat(){
    this.cinemaSeatsControl.push(this.cinemaSeatGroup())
  }

  save(){
    this.hallsService.createCinemaHall(this.hallForm.value);
    this.router.navigate(['/dashboard', {outlets: {'dashboard-content': ['cinemaHalls']}}])
  }

}
