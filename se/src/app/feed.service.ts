import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IUser } from './user';
import { Observable } from 'rxjs';
import { IFeed } from './feed';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private _url: string = "http://localhost:5000/api/v1/question"
  private _url_user: string = "http://localhost:5000/api/v1/user"
  private _url_feed: string = "http://localhost:5000/api/v1/feed"
  private _url_ans: string = "http://localhost:5000/api/v1/answer"

  constructor(private http : HttpClient) { }

  addNewQues(email,question,category){
    return this.http.post(this._url,{
      "ques_email":email,
      "category":category,
      "question":question
    },{observe : 'response'})
  }

  getUser(email):Observable<IUser>{
    return this.http.get<IUser>(this._url_user, {
      params: new HttpParams().set('email', email)
    })
  }

  getFeed():Observable<IFeed[]>{
      return this.http.get<IFeed[]>(this._url_feed)
  }

  validate(email){
    return this.http.get("http://localhost:5000/api/v1/query/validated",{
      params: new HttpParams().set('email', email)
    })
  }

  deleteQuestion(question){
    return this.http.request('delete',this._url,{body:{"question":question}})
  }

  upvoteAnswer(question,answer,answer_email){
    return this.http.post("http://localhost:5000/api/v1/answer/upvote",{
      'email': answer_email,
      'question':question,
      'answer':answer
    },{observe:'response'})
  }

  deleteAnswer(question,answer){
    return this.http.request('delete',this._url_ans,{body:{"question":question,"answer":answer}})
  }

  postAnswer(question,answer,email){
    return this.http.post(this._url_ans,{
    'question':question,
    'answer' : answer,
    'email' : email
    },{observe:'response'})
  }

  getTag(){
    return this.http.get("http://localhost:5000/get_tags")
  }

  getOrg(){
    return this.http.get("http://localhost:5000/get_orgs")
  }
}
