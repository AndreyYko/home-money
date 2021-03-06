import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApi } from '../core/base-api';

@Injectable()
export class UsersService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`)
      .pipe(map((users: User[]) => {
        return users[0] ? users[0] : undefined;
      }));
  }

  createNewUser(user: User): Observable<User> {
    return this.post(`users`, user);
  }
}
