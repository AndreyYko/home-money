import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

import { Category } from '../../shared/models/category.model';
import { FlackEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'flack-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.sass']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[];
  form: FormGroup;
  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ];
  message: Message;
  sub1: Subscription;
  sub2: Subscription;

  constructor(
    private eventsService: EventsService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'category': new FormControl(1, [Validators.required]),
      'type': new FormControl('outcome', [Validators.required]),
      'value': new FormControl(1, [Validators.required, Validators.min(1)]),
      'description': new FormControl(null, [Validators.required])
    });
    this.message = new Message('', '');
  }

  showMessage(type: string, text: string) {
    this.message.type = type;
    this.message.text = text;
    window.setTimeout(() => {
      this.message.type = '';
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    const event = new FlackEvent(
      formData.type,
      formData.value,
      +formData.category,
      moment().format('DD.MM.YYYY HH:mm:ss'),
      formData.description
    );

    this.sub1 = this.billService.getBill()
      .subscribe((data: Bill) => {
        let value = 0;
        if (event.type === 'outcome') {
          if (event.amount > data.value) {
            this.showMessage('danger', 'Недостаточно денег!');
            return;
          } else {
            value = data.value - event.amount;
          }
        } else {
          value = data.value + event.amount;
        }
        const bill: Bill = new Bill(value, data.currency);
        this.sub2 = this.billService.updateBill(bill)
          .subscribe(() => {
            this.eventsService.addEvent(event)
              .subscribe(() => {
                this.showMessage('success', 'Событие успешно добавлено.');
                this.form.reset();
                this.form.get('category').setValue(1);
                this.form.get('type').setValue('outcome');
                this.form.get('value').setValue(1);
              });
          });
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
