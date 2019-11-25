import { Component ,OnInit} from '@angular/core';
import { Dates } from '../dates';
import { DataService } from '../data.service';
import { Router,ActivatedRoute } from '@angular/router';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent {

  model = new Dates(new Date(),new Date());
  cat:any;
  insights_data:any;timegraph_data:any;friendshipchart_data:any;
  bargraph1_data:any;bargraph2_data:any;piechart1_data:any;piechart2_data:any;dateRange:any;
  submitted = false;l=["movies","food","housing","travel","others"];labels_data=[];
  //timeplot=false;pi1=false;pi2=false;bar1=false;bar2=false;friendshipchart=false;
  constructor(private dataService:DataService,private router:Router) { }
  BarChart:any;PieChart:any;TimePlot:any;
  onSubmit() {
    //console.log(this.model);
     this.submitted=true; 
     this.dataService.get_insights(this.model['fromdate'],this.model['todate'])
     .subscribe(data => {
       this.dateRange = data;
       
     }); 

  }

  value(r){
    return parseFloat(r).toFixed(2);
  }

  public print(id,canvasid): void {
    let printContents, popupWin;
    printContents = document.getElementById(id).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    var canvas = document.getElementById(canvasid) as HTMLCanvasElement;   
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    popupWin.document.write('<img src="'+image+'"/>'); 
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

    
  BarGraph1(){
    this.cat="barChart";
    //timeplot=false;pi1=false;pi2=false;bar1=true;bar2=false;friendshipchart=false;
    this.dataService.get_bargraph1(this.model['fromdate'],this.model['todate'])
     .subscribe(data => {
       this.bargraph1_data = data;
      // console.log("asdf", this.insights_data[0][0] );
        var friend=[];var dat=[];var dat2=[];
        if(this.bargraph1_data.length==0){
          window.alert("Couldn't retrive any transaction in specified period");
        }
        else{
       for(var key in this.bargraph1_data){
         friend.push(this.bargraph1_data[key][0]);
         dat.push(this.bargraph1_data[key][1]);
         dat2.push(this.bargraph1_data[key][2]);
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
             stacked:true,
               ticks: {
                   beginAtZero:true
               }
           }]
       }
      }
      });

       
      this.BarChart.render();
    
     }
    
     });
  }
 
  BarGraph2(){
    this.cat="barChart2";
    //timeplot=false;pi1=false;pi2=false;bar1=false;bar2=true;friendshipchart=false;
    this.dataService.get_bargraph2(this.model['fromdate'],this.model['todate'])
     .subscribe(data => {
       this.bargraph2_data = data;
        var friend=[];var dat=[];var dat2=[];
        console.log("sjhnjdn",this.bargraph2_data);
        if(this.bargraph2_data.length==0){
          window.alert("Couldn't retrive any transaction in specified period");
        }
        else{
       for(var key in this.bargraph2_data){
         friend.push(this.bargraph2_data[key][0]);
         dat.push(this.bargraph2_data[key][1]);
         dat2.push(this.bargraph2_data[key][2]);
       }
             
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
        stacked:true,
          ticks: {
              beginAtZero:true
          }
          }]
       }
      }
      });

       
      this.BarChart.render();
    
     }
    });
  }
 
  PieChart1(){
    this.cat="PieChart1";
    
    this.dataService.tagsPieChart(this.model['fromdate'],this.model['todate'])
    .subscribe(data => {
      this.piechart1_data = data;
      //console.log("asdf", this.insights_data[0][0] );
       var amount=[];

       if(this.piechart1_data.length==0){
        window.alert("Couldn't retrive any transaction in specified period");
      }
      else{
      for(var key in this.piechart1_data){
        //this._label.push(l[key])
        amount.push(this.piechart1_data[key])
            }
      for(var key in this.piechart1_data){
        var res=[];
        res.push(this.piechart1_data[key]);
        res.push(this.l[key]);
        this.labels_data.push(res);
        
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
  }
  });
}

PieChart2(){
  this.cat="PieChart2";
  //timeplot=false;pi1=false;pi2=true;bar1=false;bar2=false;friendshipchart=false;
  this.dataService.friendspiechart(this.model['fromdate'],this.model['todate'])
     .subscribe(data => {
       this.piechart2_data = data;
       //console.log("asdf", this.insights_data[0][0] );
        var friends=[];var amount=[];
        if(this.piechart2_data.length==0){
          window.alert("Couldn't retrive any transaction in specified period");
        }
        else{
       for(var key in this.piechart2_data){
         friends.push(this.piechart2_data[key][0]);
         amount.push(this.piechart2_data[key][1]);
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
}
  });
  }

friendshipchart(){
  this.cat="friendshipchart";
 // timeplot=false;pi1=false;pi2=false;bar1=false;bar2=false;friendshipchart=true;
  this.dataService.friendshipchart(this.model['fromdate'],this.model['todate'])
     .subscribe(data => {
       this.friendshipchart_data = data;
       //console.log("asdf", this.insights_data[0][0] );
        var friends=[];var amount=[];
        if(this.friendshipchart_data.length==0){
          window.alert("Couldn't retrive any transaction in specified period");
        }
        else{
       for(var key in this.friendshipchart_data){
         friends.push(this.friendshipchart_data[key][0]);
         amount.push(this.friendshipchart_data[key][1]);
       }
    
  this.PieChart = new Chart('friendshipchart', {
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
}
  });
}

TimeSeriesPlot(){
  //timeplot=true;pi1=false;pi2=false;bar1=false;bar2=false;friendshipchart=false;
  this.cat="timeplot";
  this.dataService.timeseriesplot(this.model['fromdate'],this.model['todate'])
  .subscribe(data => {
    this.timegraph_data = data;
    if(this.timegraph_data.length==0){
      window.alert("Couldn't retrive any transaction in specified period");
    }else{
              console.log("asdf",data );
              var amount=[];var date=[];
              for(var key in this.timegraph_data){
                date.push(this.timegraph_data[key][0])
                amount.push(this.timegraph_data[key][1])
                

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
          }
  });
}
  newDates() {
    this.model = new Dates(new Date(),new Date());
  }
  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }
  
  
}

