import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

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
    private router: Router
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
    localStorage.setItem('user', value.username);
    this.router.navigateByUrl('chat');
  }
}
