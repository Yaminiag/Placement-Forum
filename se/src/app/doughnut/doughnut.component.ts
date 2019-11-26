import { Component, OnInit } from '@angular/core';
import { DoughnutService } from '../doughnut.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit{

  public doughnutChartLabels:string[] = ['Intuit', 'Others'];


  public demodoughnutChartData:any;
  public doughnutChartType:string = 'doughnut';
  constructor(private httpClient: HttpClient, private Doughnut:DoughnutService) { }
  public chartReady = false;
  ngOnInit()
  {
    this.Doughnut.getData().subscribe((data)=>
    {
      console.log(data);
      this.demodoughnutChartData = data;
      this.chartReady = true;
    });
  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}