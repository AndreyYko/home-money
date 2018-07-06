import { Component, Input, OnInit } from '@angular/core';

import { Category } from '../../shared/models/category.model';
import { FlackEvent } from '../../shared/models/event.model';

@Component({
  selector: 'flack-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.sass']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[];
  @Input() events: FlackEvent[];
  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';

  constructor() { }

  checkCategoryName(event: FlackEvent): string {
    return this.categories.find((category) => {
      return event.category === category.id;
    }).name;
  }

  ngOnInit() {
    this.events.reverse();
  }

  changeCriteria(field: string) {
    const searchMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceholder = searchMap[field];
    this.searchField = field;
  }
}
