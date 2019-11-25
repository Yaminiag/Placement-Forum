import { Component, OnInit, Inject, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { IUser } from '../user'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FeedService } from '../feed.service';
import { Router } from '@angular/router';
import { FeedComponent } from '../feed/feed.component';
import { FormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public user;
  public key = '';
  public tags;
  public searched = false;
  public opArray = [];
  SERVER_URL_SEARCH = "http://localhost:5000/fetch";
  // tags: string[] = ['One', 'Two', 'Three'];
  tagControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,private Feed :FeedService,private router: Router,private httpClient: HttpClient) { }

  @ViewChild(FeedComponent, {static: false})
  @ViewChild('searches', {static: false}) searches:ElementRef
  private feed: FeedComponent;

  questionAdded() {
    this.feed.ngOnInit();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tags.filter(tags => tags.toLowerCase().includes(filterValue));
  }

  ngOnInit() {

    let email = this.storage.get('email');
    this.Feed.getUser(email)
      .subscribe(data => {
        console.log(data[0])
        this.user = data[0];
      })
    
    this.Feed.getTag().subscribe(data => {
      this.tags = data;
      console.log(this.tags)
      this.filteredOptions = this.tagControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })
    
  }

  search(tag): any
  {
    console.log('searching')
    this.key = tag
    if(this.key.length)
    {
      this.httpClient.get<any>(this.SERVER_URL_SEARCH, {params: {key: this.key}}).subscribe(
        (res) =>
        {
          this.searched = true;
          this.opArray = res;
          console.log(this.opArray)
        },
        (err) => console.log(err)
      );
    }
    else
    {
      this.opArray=[];
    }
  }
  refreshFeed(){
    // console.log(event)
    // const target= event.target;
    // var btn = target.querySelector('#search').value;
    // console.log(btn)
    // btn = '';
    this.searched = false;
    this.searches.nativeElement.value='';
    this.ngOnInit();
  }
  

}
