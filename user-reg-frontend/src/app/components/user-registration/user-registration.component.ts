import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  user: User = new User();
  serverErrorMsgs: string[];
  userSuccess: boolean = false;
  hasErrors: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.reset();
  }

  onSubmit(form: NgForm) {
    if (form) {
      return this.userService.createUser(this.user).subscribe({
        next: (res) => {
          this.hasErrors = false;
          this.reset(form);
          this.userSuccess = true;
          setTimeout(() => {
            this.userSuccess = false;
          }, 5000);
        },
        error: (err) => {
          this.hasErrors = true;
          if (err.status == 422) {
            this.serverErrorMsgs = err.error;
          }
        },
      });
    }
  }

  reset(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.user = new User();
  }
}
