import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import { HttpClient } from '@angular/common/http';
import { GraphService } from '../graph.service';

//var CanvasJS = require('./canvasjs.min');
 
@Component({
	selector: 'app-graph',
	templateUrl: './graph.component.html'
})
 
export class GraphComponent implements OnInit {
  SERVER_URL: "http://localhost:5000/calculate_all_rating";
  constructor(private httpClient: HttpClient, private Graph:GraphService) { }
  public dataPoints
  ngOnInit() 
  {
    this.Graph.getData().subscribe((data) =>
    {
      console.log(data)
      this.dataPoints = data
      // this.x = [
      //   {
      //     "label": "Morgan Stanley",
      //     "y": 4.5
      //   },
      //   {
      //     "label": "Goldman Sachs",
      //     "y": 4.0
      //   },
      //   {
      //     "label": "Intuit",
      //     "y": 4.166666666666667
      //   }
      // ]
      // console.log(typeof(x))
      console.log(typeof(this.dataPoints))
      // console.log(x)
      console.log(this.dataPoints)
      // console.log(this.dataPoints==x)
    },
    //(err) => console.log(err);
    );		
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Basic Column Chart in Angular"
      },
      data: [{
        type: "column",
        dataPoints: this.dataPoints
      }]
    });
      
    chart.render();
  
    }
}
