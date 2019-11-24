import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { window } from 'rxjs/operators';
import { from } from 'rxjs';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Injectable } from '@angular/core';
import { FeedService } from '../feed.service';


@Component({
  selector: 'app-feed-form',
  templateUrl: './feed-form.component.html',
  styleUrls: ['./feed-form.component.css']
})
export class FeedFormComponent implements OnInit {

  @Output() questionAdded = new EventEmitter<any>();

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,private Feed :FeedService,private router: Router) { }
  response : any;
  clicked : any;
  ngOnInit() {
  }

  addquestion(event){
    event.preventDefault();
    const target = event.target;
    const email = this.storage.get('email');
    const question = target.querySelector('#question').value;
    let category = this.clicked;
    this.Feed.addNewQues(email,question,category).subscribe(data => {
      this.response = JSON.parse(JSON.stringify(data));
      console.log(this.response);
      if(this.response.status==201){
        target.querySelector('#question').value = "";
        this.clicked = false;
        this.questionAdded.emit();
      }
    })
  }
}
