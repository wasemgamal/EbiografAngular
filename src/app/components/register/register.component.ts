import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuthenticationUser } from 'src/app/Interface/IAuthenticationUser';
import { UserService } from 'src/app/Services/User.service';
import { Router,ActivatedRoute, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    RegisterForm!:FormGroup;
    loading = false;
    submitted = false;
    registerError = false;
    showErrorMessage!:string;
  constructor(
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private userService:UserService

  ) { }
  ngOnInit(): void {
   const passwordValidators = [Validators.minLength(6)];

    this.RegisterForm = this.formBuilder
    .group({
       firstName:['',Validators.required],
       lastName:['',Validators.required],
       userName:['',Validators.required],
       password:['',passwordValidators],
       emailAddress:['',Validators.required],
       phone:[Number,Validators.required]
    });
  }

get userForm() {return this.RegisterForm.controls;}

async onRegister()
{
  this.submitted = true;
  //stop here if form is invalid
  if(this.RegisterForm.invalid){
    return;
  }
  this.loading = true;
  this.RegisterForm.value.phone = this.RegisterForm.value.phone.toString();
  await (await this.userService.register(this.RegisterForm.value))
  .pipe(first()).subscribe({next:()=>{
    this.router.navigate(['../login'],{relativeTo: this.route});
  },
  error:HttpErrorResponse=>{
    this.loading = false;
    this.registerError = true;
  this.showErrorMessage = HttpErrorResponse;


  }
})
}

}
