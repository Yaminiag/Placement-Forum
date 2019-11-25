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
      console.log(typeof(this.dataPoints))
      console.log(this.dataPoints)
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
        
      chart.render();    },
    //(err) => console.log(err);
    );		
      
    }
    
}
