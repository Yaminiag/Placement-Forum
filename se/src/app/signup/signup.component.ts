import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule,MatIconModule } from '@angular/material';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;


  response:any;

  constructor(private _formBuilder: FormBuilder,private Auth: AuthService,private router: Router) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.email]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl : ['',Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl : ['',Validators.nullValidator]
    });
    this.sixthFormGroup = this._formBuilder.group({
      sixthCtrl : ['',Validators.nullValidator]
    });
    this.seventhFormGroup = this._formBuilder.group({
      seventhCtrl : ['',Validators.nullValidator]
    });
  }


  submit() {
    let name = this.firstFormGroup.value.firstCtrl;
    let email = this.secondFormGroup.value.secondCtrl;
    let password = this.thirdFormGroup.value.thirdCtrl;
    let year = this.fourthFormGroup.value.fourthCtrl;
    let twoMonth = this.fifthFormGroup.value.fifthCtrl;
    let sixMonth = this.sixthFormGroup.value.sixthCtrl;
    let fulltime = this.seventhFormGroup.value.seventhCtrl;

    this.Auth.addUserDetails(name,email,password,year,twoMonth,sixMonth,fulltime).subscribe(data=>{
      this.response = JSON.parse(JSON.stringify(data));
      console.log(this.response);
      if(this.response.status==200){
        this.router.navigate(['/login']);
      }
      else{
        this.router.navigate(['/register']);
      }
    })
  }
}
