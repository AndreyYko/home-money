import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Category } from '../shared/models/category.model';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'flack-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.sass']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[] = [];
  isLoaded = false;

  constructor(
    private categoriesService: CategoriesService,
    private title: Title
  ) {
    title.setTitle('Запись | Домашняя бухгалтерия');
  }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((data: Category[]) => {
        this.categories = data;
        this.isLoaded = true;
      });
  }

  onAddCategory(category: Category) {
    this.categories.push(category);
  }

  onCategoryEdit(category: Category) {
    const index = this.categories
      .findIndex(cat => cat.id === category.id); // find index of changed category
    this.categories[index] = category;
  }

}
