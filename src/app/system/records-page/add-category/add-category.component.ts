import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'flack-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  @Output() addCategory = new EventEmitter<Category>();

  form: FormGroup;
  sub1: Subscription;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'value': new FormControl(1, Validators.min(1))
    });
  }

  onSubmit() {
    // this.form.setValue({'name': '', value: 1});
    const formData = this.form.value;
    const category: Category = new Category(formData.name, formData.value);
    this.sub1 = this.categoriesService.addCategory(category)
      .subscribe((data: Category) => {
        this.form.reset(); // reset form!
        this.form.patchValue({'value': 1});
        this.addCategory.emit(data);
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
