import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "../_service/auth.service";

import { LogIn } from "../_model/login";

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
      keep: false
    });
  }

  onSubmit({ value }: { value: LogIn }) {
    this.auth.checkAuth(value.username, value.password);
  }
}
