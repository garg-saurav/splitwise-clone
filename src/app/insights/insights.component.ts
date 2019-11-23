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
  BarChart:any;
  onSubmit() {
    //console.log(this.model);
     this.submitted=true;
     this.dataService.get_insights()
     .subscribe(data => {
       this.insights_data = data;
       console.log("asdf", this.insights_data[0][0] );
        var friend=[];var dat=[];var dat2=[];
       for(var key in this.insights_data){
         friend.push(this.insights_data[key][0]);
         dat.push(this.insights_data[key][1]);
         dat2.push(this.insights_data[key][2]);
         //console.log("kkkk",key[1])

       }
      //  for(var i in label){
      //  console.log("kkkk",label[i]);
      //  console.log("kkkk",dat[i]);
      //  }
        
       this.BarChart = new Chart('barChart', {
        type: 'bar',
      data: {
       labels: friend,
       datasets: [
         {
           label: 'Money Borrowed',
           data: dat2,
           backgroundColor:'#b82e2e',
           
           borderWidth: 1
       },
       {
        label: 'Money Lent',
        data: dat,
        backgroundColor: '#3366cc',
       
        borderWidth: 1
    }]
      }, 
      
    
      options: {
       title:{
           text:"Bar Chart",
           display:true
       },
       scales: {
        xAxes: [{
          stacked: true // this should be set to make the bars stacked
       }],

           yAxes: [{
               ticks: {
                   beginAtZero:true
               }
           }]
       }
      }
      });

       
      this.BarChart.render();
    
     });
  }
 
  newDates() {
    this.model = new Dates(new Date(),new Date());
  }
  
  
}

