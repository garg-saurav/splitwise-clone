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
  insights_data:any;dateRange:any;
  submitted = false;timeplot=false;pi1=false;pi2=false;bar1=false;bar2=false;unique=false;
  constructor(private dataService:DataService) { }
  BarChart:any;PieChart:any;TimePlot:any;
  onSubmit() {
    //console.log(this.model);
     this.submitted=true; 
     this.dataService.get_insights(this.model['fromdate'],this.model['todate'])
     .subscribe(data => {
       this.dateRange = data;
     }); 
  }

  BarGraph1(){
    this.dataService.get_bargraph1(this.model['fromdate'],this.model['todate'])
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
      //  for(var i in friend){
      //  console.log("kkkk",friend[i]);
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
 
  BarGraph2(){
    this.dataService.get_bargraph2(this.model['fromdate'],this.model['todate'])
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
      //  for(var i in friend){
      //  console.log("kkkk",friend[i]);
      //  console.log("kkkk",dat[i]);
      //  }
        
       this.BarChart = new Chart('barChart2', {
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
 
  PieChart1(){

    this.dataService.tagsPieChart(this.model['fromdate'],this.model['todate'])
    .subscribe(data => {
      this.insights_data = data;
      console.log("asdf", this.insights_data[0][0] );
       var amount=[];
      for(var key in this.insights_data){
        amount.push(this.insights_data[key])
        //console.log("kkkk",this.insights_data[key])

      }
   

    this.PieChart = new Chart('PieChart1', {
      type: 'pie',
    data: {
     labels:["movies","food","housing","travel","others"],
     datasets: [{
         label: 'Money Spent on Different Avenues',
         data: amount,
         backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)'
         ],
         borderColor: [
             'rgba(255,99,132,1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)'
         ],
         borderWidth: 1
     }]
    }, 
    options: {
     title:{
         text:"Pie Chart",
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
    this.PieChart.render();

  });
}

PieChart2(){

  this.dataService.friendspiechart(this.model['fromdate'],this.model['todate'])
     .subscribe(data => {
       this.insights_data = data;
       console.log("asdf", this.insights_data[0][0] );
        var friends=[];var amount=[];
       for(var key in this.insights_data){
         friends.push(this.insights_data[key][0]);
         amount.push(this.insights_data[key][1]);
         //console.log("kkkk",key[1])

       }
    
  this.PieChart = new Chart('PieChart2', {
    type: 'pie',
  data: {
   labels:friends,
   datasets: [{
       label: 'Exchange With Different Friends',
       data: amount,
       backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
           'rgba(54, 162, 235, 0.2)',
           'rgba(255, 206, 86, 0.2)',
           'rgba(75, 192, 192, 0.2)',
           'rgba(153, 102, 255, 0.2)',
           'rgba(255, 159, 64, 0.2)'
       ],
       borderColor: [
           'rgba(255,99,132,1)',
           'rgba(54, 162, 235, 1)',
           'rgba(255, 206, 86, 1)',
           'rgba(75, 192, 192, 1)',
           'rgba(153, 102, 255, 1)',
           'rgba(255, 159, 64, 1)'
       ],
       borderWidth: 1
   }]
  }, 
  options: {
   title:{
       text:"Pie Chart",
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
  this.PieChart.render();
  
  });
  }


TimeSeriesPlot(){


  this.dataService.timeseriesplot(this.model['fromdate'],this.model['todate'])
  .subscribe(data => {
    this.insights_data = data;
    console.log("asdf",this.insights_data[0][0] );
     var amount=[];var date=[];
    for(var key in this.insights_data){
      date.push(this.insights_data[key][0])
      amount.push(this.insights_data[key][1])
      

    }
  
  this.TimePlot = new Chart('timeplot', {
    type: 'line',
  data: {
   labels: date,
   datasets: [{
       label: 'Time Plot',
       data: amount,
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
       }],
       xAxes:[ {
        type: 'time',
        scaleLabel: {
          display: true,
          labelString: 'Time',
        },
        ticks: {
          
          unitStepSize:1,
          min:this.model['fromdate'] ,
          max: this.model['todate']
        }
      }
      ]}
   }
  });
  this.TimePlot.render();
  });
}
  newDates() {
    this.model = new Dates(new Date(),new Date());
  }
  
  
}

