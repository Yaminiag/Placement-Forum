import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { FeedService } from '../feed.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user;
  public qcount;
  public acount;
  public upcount;
  public r_2m;
  public r_6m;
  public r_ft;
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private Feed : FeedService,private router: Router) { }

  ngOnInit() {

    let email = this.storage.get('email');
    this.Feed.getUser(email)
      .subscribe(data => {
        this.user = data[0];
        var stars = ''
        for(var i=0; i<this.user.password.length; i++)
          stars = stars.concat('*')
        this.user.password = stars;

      })
    this.Feed.getStats(email)
    .subscribe(data => {
      this.qcount = data[0];
      this.acount = data[1];
      this.upcount = data[2];
      console.log(data);
    })

    this.Feed.getRating(email, "2m")
    .subscribe(data => {
      console.log(data);
      this.r_2m = data['rating'];
    })

    this.Feed.getRating(email, "6m")
    .subscribe(data => {
      console.log(data);
      this.r_6m = data['rating'];
    })

    this.Feed.getRating(email, "ft")
    .subscribe(data => {            
      console.log(data);
      this.r_ft = data['rating'];
    })

  }

  onRate_2m($event) 
  {
    let email = this.storage.get('email');
    this.Feed.updateRating(email, $event.newValue, this.user.two_month_internship, "2m").subscribe()  
  }

  onRate_6m($event:{oldValue:number, newValue:number, starRating:StarRatingComponent})
  {
    let email = this.storage.get('email');
    this.Feed.updateRating(email, $event.newValue, this.user.six_month_internship, "6m").subscribe()
  }

  onRate_fulltime($event:{oldValue:number, newValue:number, starRating:StarRatingComponent})
  {
    let email = this.storage.get('email');
    this.Feed.updateRating(email, $event.newValue, this.user.fulltime, "ft").subscribe()
  }

  twom_exists()
  {
    if(this.user.two_month_internship != '')
      return true
    else
      return false
  }

  sixm_exists()
  {
    if(this.user.six_month_internship != '')
      return true
    else
      return false
  }

  ft_exists()
  {
    if(this.user.fulltime != '')
      return true
    else
      return false
  }

}
