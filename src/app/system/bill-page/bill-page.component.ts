import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'flack-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.sass']
})
export class BillPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;

  currency: Bill[] = [{
    value: 26.44,
    currency: 'USD'
  }, {
    value: 30.6,
    currency: 'EUR'
  }, {
    value: 0.4,
    currency: 'RUB'
  }];
  bill: Bill;

  isLoaded = false;
  isRefreshed = false;
  constructor(
    private billService: BillService,
    private title: Title
  ) {
    title.setTitle('Счет | Домашняя бухгалтерия');
  }

  ngOnInit() {
    this.sub1 = this.billService.getBill()
      .subscribe((data: Bill) => {
        this.bill = data;
        this.isLoaded = true;
      });
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getBill()
      .subscribe((data: Bill) => {
        this.bill = data;
        // console.log(this.bill);
        setTimeout(() => {
          this.isLoaded = true;
        }, 2000);
        this.isRefreshed = true;
      });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    if (this.isRefreshed === true) {
      this.sub2.unsubscribe();
    }
  }
}
