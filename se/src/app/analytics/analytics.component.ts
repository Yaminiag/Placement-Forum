import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { startWith, map } from 'rxjs/operators';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  public tags;
  tagControl = new FormControl();
  filteredOptions: Observable<string[]>;
  SERVER_URL_SEARCH: "http://localhost:5000/get_orgs";
  
  constructor(private httpClient: HttpClient,private Feed :FeedService) { }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tags.filter(tags => tags.toLowerCase().includes(filterValue));
  }


  ngOnInit() {
    this.Feed.getOrg().subscribe(data => {
      this.tags = data;
      console.log(this.tags)
      this.filteredOptions = this.tagControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }
}
