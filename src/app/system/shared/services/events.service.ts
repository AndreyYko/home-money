import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../shared/core/base-api';
import { FlackEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  addEvent(event): Observable<FlackEvent> {
    return this.post(`events`, event);
  }

  getEvents(): Observable<FlackEvent[]> {
    return this.get(`events`);
  }

  getEventById(id): Observable<FlackEvent> {
    return this.get(`events/${id}`);
  }
}
