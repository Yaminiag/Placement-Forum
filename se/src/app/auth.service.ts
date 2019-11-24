import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url_login: string = "http://localhost:5000/login";
  private _url_register: string = "http://localhost:5000/register";

  constructor(private http : HttpClient) { }

  getUserDetails(email,password){
    return this.http.post(this._url_login,{
      "email":email,
      "password":password
    },{observe : 'response'})
  }
  addUserDetails(name,email,password,year,twoMonth,sixMonth,fulltime){
    return this.http.post(this._url_register,{
      "email":email,
      "name":name,
      "password":password,
      "year":year,
      "2m_internship":twoMonth,
      "6m_internship":sixMonth,
      "fulltime":fulltime
    },{observe : 'response'})
  }
}
