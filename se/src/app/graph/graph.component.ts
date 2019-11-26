import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import { HttpClient } from '@angular/common/http';
import { GraphService } from '../graph.service';
import { DoughnutService } from '../doughnut.service';

//var CanvasJS = require('./canvasjs.min');
 
@Component({
	selector: 'app-graph',
	templateUrl: './graph.component.html'
})
 
export class GraphComponent implements OnInit {
  SERVER_URL: "http://localhost:5000/calculate_all_rating";
  public doughnutChartLabels:string[] = ['Intuit', 'Others'];
  public demodoughnutChartData:any;
  public doughnutChartType:string = 'doughnut';
  public chartReady = false;
  chartDoughnut: any;
  constructor(private httpClient: HttpClient, private Graph:GraphService, private Doughnut:DoughnutService) { }
  public dataPoints
  ngOnInit() 
  {
    this.Graph.getData().subscribe((data) =>
    {
      console.log(data)
      this.dataPoints = data
      console.log(typeof(this.dataPoints))
      console.log(this.dataPoints)
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        // exportEnabled: true,
        title: {
          text: "Average rating of Companies"
        },
        width:500,
        height:500,
        axisX:{
          drawBorder: true,
          tickLength: 0,
        },
        axisY:{
          drawBorder: true,
          gridThickness: 0,

        },
        data: [{
          type: "column",
          dataPoints: this.dataPoints
        }]
        
      });
        
      chart.render();  
    
    },
    //(err) => console.log(err);
    ),
    
    this.Doughnut.getData().subscribe((res)=>
      {
        console.log(res);
        this.demodoughnutChartData = res;
        this.chartReady = true;
        this.chartDoughnut = new CanvasJS.Chart("ctx", {
          animationEnabled: true,
          // exportEnabled: true,
          title: {
            text: "Percentage of users in each company"
          },
          width:500,
          height:500,
          data:[{
            type : "doughnut",
            dataPoints:res
          }],
          options:{
            legend:{
              display:true
            },
          }
          
        });
          
        this.chartDoughnut.render();  
    
      });
      
      
    }
}
