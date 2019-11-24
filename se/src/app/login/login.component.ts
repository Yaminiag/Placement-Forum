import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { window } from 'rxjs/operators';
import { from } from 'rxjs';
import { AuthService } from '../auth.service'
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,private Auth: AuthService,private router: Router) { }
  response : any;
  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault();
    const target = event.target;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    this.Auth.getUserDetails(email,password).subscribe(data => {
      this.response = JSON.parse(JSON.stringify(data));
      console.log(this.response)
      if(this.response.status==200){
        this.storage.set('email',email);
        console.log(this.storage.get('email'));
        this.router.navigate(['/dashboard'])
      }
      else{
        this.router.navigate(['/login'])
      }
    });
  }
}
