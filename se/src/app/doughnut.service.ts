import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DoughnutService {
  private _url: string = "http://localhost:5000/get_percentage"
  constructor(private http : HttpClient) { }

  getData()
  {
    return this.http.get(this._url)
  }

}
