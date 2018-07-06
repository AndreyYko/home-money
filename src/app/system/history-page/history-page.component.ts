import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { FlackEvent } from '../shared/models/event.model';

@Component({
  selector: 'flack-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.sass']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  categories: Category[];
  events: FlackEvent[];

  chartData = [];
  sub1: Subscription;

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService,
    private title: Title
  ) {
    title.setTitle('История | Домашняя бухгалтерия');
  }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).pipe(map((data) => ({categories: data[0], events: data[1]})))
      .subscribe((data) => {
        this.categories = data.categories;
        this.events = data.events;

        this.calcChartData();
        this.isLoaded = true;
      });
  }

  calcChartData(): void {
    this.chartData = [];
    this.categories.forEach((category) => {
      let value = 0;
      const neededEvents = this.events.filter((event) => {
        return event.category === category.id && event.type === 'outcome';
      });
      neededEvents.forEach((event) => {
        value += event.amount;
      });
      this.chartData.push({name: category.name, value: value});
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
