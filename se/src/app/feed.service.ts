import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private _url: string = "http://localhost:5000/api/v1/question"
  constructor(private http : HttpClient) { }

  addNewQues(email,question,category){
    return this.http.post(this._url,{
      "ques_email":email,
      "category":category,
      "question":question
    },{observe : 'response'})
  }
}
