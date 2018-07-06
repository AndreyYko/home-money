import { Component, Input, OnInit } from '@angular/core';

import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'flack-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.sass']
})
export class CurrencyCardComponent implements OnInit {

  date: Date;

  @Input() currency: Bill[];

  constructor() { }

  ngOnInit() {
    this.date = new Date();
  }

}
