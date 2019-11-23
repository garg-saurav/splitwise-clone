import { Component } from '@angular/core';
import { Dates } from '../dates';
import { DataService } from '../data.service';
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
  
  onSubmit() {
    console.log(this.model);
     this.submitted=true;
  }
 
  newDates() {
    this.model = new Dates(new Date(),new Date());
  }
  ngOnInit(){
    this.dataService.get_insights()
                  .subscribe(data => {
                    this.insights_data = data;
                    console.log("asdf",data);
                  });
  }
}

