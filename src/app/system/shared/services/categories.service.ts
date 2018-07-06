import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';

@Injectable()
export class CategoriesService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  getCategories(): Observable<Category[]> {
    return this.get(`categories`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post(`categories`, category);
  }

  changeCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.get(`categories/${id}`);
  }
}
