import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { SignIn } from "../_model/sign-in";

@Component({
  selector: 'auth-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
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

  onSubmit({ value }: { value: SignIn }) {
    console.log(value);
    this.router.navigateByUrl('chat');
  }
}
