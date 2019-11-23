import { Component ,OnInit} from '@angular/core';
import { Dates } from '../dates';
import { DataService } from '../data.service';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent {

  model = new Dates(new Date(),new Date());
  insights_data:any;
  submitted = false;
  constructor(private dataService:DataService) { }
  LineChart:any;
  onSubmit() {
    //console.log(this.model);
     this.submitted=true;
     this.dataService.get_insights()
     .subscribe(data => {
       this.insights_data = data;
       console.log("asdf", this.insights_data[0] );

       var labels = this.insights_data.jsonarray.map(function(e) {
        return e[0];
     });
     var dat = this.insights_data.jsonarray.map(function(e) {
        return e[1];
     });;
     

       this.LineChart = new Chart('lineChart', {
        type: 'line',
      data: {
       labels: ["Jan", "Feb", "March", "April", "May", "June","July","Aug","Sep","Oct","Nov","Dec","Jan", "Feb", "March", "April", "May", "June","July","Aug","Sep","Oct","Nov","Dec"],
       datasets: [{
           label: 'Number of Items Sold in Months',
           data: [9,7 , 3, 5, 2, 10,15,16,19,3,1,9,9,7 , 3, 5, 2, 10,15,16,19,3,1,9],
           fill:false,
           lineTension:0.2,
           borderColor:"red",
           borderWidth: 1
       }]
      }, 
      options: {
       title:{
           text:"Line Chart",
           display:true
       },
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero:true
               }
           }]
       }
      }
      });
      this.LineChart.render();
    
     });
  }
 
  newDates() {
    this.model = new Dates(new Date(),new Date());
  }
  
  
}

