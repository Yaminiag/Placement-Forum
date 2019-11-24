import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { IUser } from '../user'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FeedService } from '../feed.service';
import { Router } from '@angular/router';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public user;
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,private Feed :FeedService,private router: Router) { }

  @ViewChild(FeedComponent, {static: false})
  private feed: FeedComponent;

  questionAdded() {
    this.feed.ngOnInit();
  }

  ngOnInit() {

    let email = this.storage.get('email');
    this.Feed.getUser(email)
      .subscribe(data => {
        console.log(data[0])
        this.user = data[0];
      })
  }

  

}
