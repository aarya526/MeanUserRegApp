import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  singInSuccess: boolean = false;
  user = {
    email: '',
    password: '',
  };
  serverErrorMsgs: string;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form) {
      this.userService.login(this.user).subscribe({
        next: (res) => {
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/userProfile');
        },
        error: (err) => {
          this.serverErrorMsgs = err.error.message;
        },
      });
    }
  }

  reset(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.user = {
      email: '',
      password: '',
    };
  }
}
