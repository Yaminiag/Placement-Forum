import { Component, OnInit, Inject } from '@angular/core';
import { FeedService } from '../feed.service';
import { Router } from '@angular/router';
import { IFeed ,IAnswer } from '../feed';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public feedArr = [];
  public user_email;
  public valid;
  public response;
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,private Feed :FeedService,private router: Router) { }

  ngOnInit() {
      this.user_email = this.storage.get('email');
      this.Feed.validate(this.user_email).subscribe(data =>{
        this.valid = data;
        console.log(this.valid)
      })
      this.Feed.getFeed().subscribe(data=>{
          this.feedArr = data;
          console.log(data);
      })
  }
  deleteQues(question){
    this.Feed.deleteQuestion(question).subscribe(data=>{
      console.log(data);
      this.ngOnInit();
    })
  }

  upvote(question,answer){
    this.Feed.upvoteAnswer(question,answer,this.user_email).subscribe(data => {
      this.response = JSON.parse(JSON.stringify(data));
      console.log(this.response);
      if(this.response.status==200){
        this.ngOnInit();
      }
    })
  }

  deleteAns(question,answer){
    this.Feed.deleteAnswer(question,answer).subscribe(data => {
      this.response = JSON.parse(JSON.stringify(data));
      console.log(this.response);
      this.ngOnInit();
    })
  }

  postAns(event,question){
    event.preventDefault();
    const target = event.target;
    const answer = target.querySelector('#answer').value;
    console.log(answer,question);
    this.Feed.postAnswer(question,answer,this.user_email).subscribe(data => {
      this.response = JSON.parse(JSON.stringify(data));
      console.log(this.response);
      this.ngOnInit();
    })
  }
}
