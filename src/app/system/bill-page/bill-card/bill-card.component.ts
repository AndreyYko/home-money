import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'flack-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.sass']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: Bill[];

  dollars: number;
  euros: number;

  constructor() { }

  ngOnInit() {
    this.dollars = this.bill.value / this.currency[0].value;
    this.euros = this.bill.value / this.currency[1].value;
  }

}
