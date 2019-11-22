import { Component } from '@angular/core';
import { Transaction } from '../transaction';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  tags=['movies','food','housing','travel','others'];
  model=new Transaction('',0,'');
  submitted=false;
  onSubmit(){console.log(this.model);this.submitted=true;}
  newTransaction(){
    this.model=new Transaction('',0,'');
  }

}
