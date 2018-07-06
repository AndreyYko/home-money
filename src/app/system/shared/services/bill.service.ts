import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put(`bill`, bill);
  }

  getBill(): Observable<Bill> {
    return this.get(`bill`);
  }
}
