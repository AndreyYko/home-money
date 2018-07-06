import { Component, Input, OnInit } from '@angular/core';

import { Bill } from '../../shared/models/bill.model';
import { Category } from '../../shared/models/category.model';
import { FlackEvent } from '../../shared/models/event.model';

@Component({
  selector: 'flack-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.sass']
})
export class CostsComponent implements OnInit {

  @Input() bill: Bill;
  @Input() categories: Category[];
  @Input() events: FlackEvent[];

  constructor() { }

  calcCategoryCosts(category: Category): number {
    let cost = 0;
    const costs = this.events.filter((element) => {
      return element.category === category.id && element.type === 'outcome';
    });
    costs.forEach((event) => {
      cost += event.amount;
    });
    return cost;
  }

  getCategoryPercent(category: Category): number {
    const cost = this.calcCategoryCosts(category);
    const capacity = category.capacity;
    const percent = (cost * 100) / capacity;
    return percent > 100 ? 100 : percent;
  }

  getStringPercent(category: Category): string {
    return this.getCategoryPercent(category) + '%';
  }

  getClass(category: Category): string {
    const percent = this.getCategoryPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnInit() {
  }

}
