import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { FlackEvent } from '../../shared/models/event.model';
import { Subscription } from 'rxjs';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'flack-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.sass']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: FlackEvent;
  categoryName: string;

  isLoaded = false;
  sub1: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.sub1 = this.route.params // get params
      .subscribe((params: Params) => {
        this.eventsService.getEventById(params['id'])
          .subscribe((event: FlackEvent) => {
            this.event = event;
            this.categoriesService.getCategoryById(event.category)
              .subscribe((category: Category) => {
                this.categoryName = category.name;
                this.isLoaded = true;
              });
          });
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
