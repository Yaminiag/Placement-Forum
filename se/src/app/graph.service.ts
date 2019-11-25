import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private _url: string = "http://localhost:5000/calculate_all_rating"
  constructor(private http : HttpClient) { }

  getData()
  {
    return this.http.get(this._url)
  }

}
