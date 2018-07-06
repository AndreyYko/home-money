import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { fadeStateTrigger } from '../../shared/animations/fade.animation';

@Component({
  selector: 'flack-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {
    title.setTitle('Вход | Домашняя бухгалтерия');
  }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['canLogin']) {
          this.showMessage('Теперь вы можете войти в систему', 'success');
        } else if (params['accessDenied']) {
          this.showMessage('Только для авторизированых пользователей!', 'warning');
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message.text = text;
    this.message.type = type;
    // window.setTimeout(() => {
    //   this.message.text = '';  ------- clear message after 5 seconds
    // }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            if (this.message.text !== '') {
              this.message.text = '';
            }
            window.localStorage.setItem('user', JSON.stringify(user)); // add user info to localstorage
            this.authService.logIn();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage('Пароль не верный');
          }
        } else {
          this.showMessage('Такого пользователя не существует');
        }
      });
  }
}
