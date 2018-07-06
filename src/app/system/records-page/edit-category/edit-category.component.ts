import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'flack-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.sass']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  form: FormGroup;
  @Input() categories: Category[];
  @Output() categoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  sub1: Subscription;

  constructor(private categoryService: CategoriesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'value': new FormControl(1, [Validators.min(1)])
    });

    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(category => category.id === +this.currentCategoryId); // find in array by id
    this.form.get('name').setValue(this.currentCategory.name); // using set value without [ngModel] in template because deprecated!
    this.form.get('value').setValue(this.currentCategory.capacity);
  }

  onSubmit() {
    const formData = this.form.value;
    const category = new Category(formData.name, formData.value, this.currentCategoryId);

    this.sub1 = this.categoryService.changeCategory(category)
      .subscribe((data: Category) => {
        this.categoryEdit.emit(data);
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
