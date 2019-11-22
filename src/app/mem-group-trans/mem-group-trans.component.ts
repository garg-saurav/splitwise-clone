import { Component } from '@angular/core';
import { Trans } from '../trans';
@Component({
  selector: 'app-mem-group-trans',
  templateUrl: './mem-group-trans.component.html',
  styleUrls: ['./mem-group-trans.component.css']
})
export class MemGroupTransComponent {

  constructor() { }
  model=new Trans(0);
  submitted=false;
  onSubmit(){console.log(this.model);this.submitted=true;}
  newTransaction(){
    this.model=new Trans(0);
  }

}

