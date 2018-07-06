import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { FlackEvent } from '../shared/models/event.model';

@Component({
  selector: 'flack-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.sass']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  bill: Bill;
  categories: Category[];
  events: FlackEvent[];

  isLoaded = false;
  sub1: Subscription;

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService,
    private title: Title
  ) {
    title.setTitle('Планирование | Домашняя бухгалтерия');
  }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).pipe(map((data) => ({bill: data[0], categories: data[1], events: data[2]})))
      .subscribe((data) => {
        this.bill = data.bill;
        this.categories = data.categories;
        this.events = data.events;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
