import { Component } from '@angular/core';
import { Dates } from '../dates';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent {

  model = new Dates(new Date(),new Date());

  submitted = false;

  onSubmit() {
    console.log(this.model);
     this.submitted=true;
  }
 
  newDates() {
    this.model = new Dates(new Date(),new Date());
  }

}

