import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenResponse } from '../models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  signupToggle: boolean = false;
  alertSuccess: boolean = false;
  alertFailure: boolean = false;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, this.nameRegexValidator]],
      lastName: ['', [Validators.required, this.nameRegexValidator]],
      email: ['', [Validators.required, this.emailRegexValidator]],
      password: ['', [Validators.required, this.passwordRegexValidator]]
    })
  }

  signup(): void {
    if (this.signUpForm.valid) {
      this.signupToggle = true;
      this.authenticationService.createUser(this.signUpForm.value).subscribe((data: TokenResponse) => {
        if (data) {
          this.signupToggle = false;
          this.alertSuccess = true;
        }
        this.signUpForm.reset();
      }, (error) => {
        this.signupToggle = false;
        this.alertFailure = true;
        this.signUpForm.reset();
      })
    }
  }

  nameRegexValidator(c: FormControl) {
    let NAME_REGEX: RegExp = /^[a-zA-Z]{1,50}$/;
    return NAME_REGEX.test(c.value) ? null : {
      nameRegexValidator: {
        valid: false
      }
    }
  }

  emailRegexValidator(c: FormControl) {
    let EMAIL_REGEX: RegExp = /^[\w+.-]{1,50}@[a-zA-Z0-9.-]{1,50}$/;
    return EMAIL_REGEX.test(c.value) ? null : {
      emailRegexValidator: {
        valid: false
      }
    }
  }

  passwordRegexValidator(c: FormControl) {
    let PASS_REGEX: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()]).{8,20}$/;
    return PASS_REGEX.test(c.value) ? null : {
      passwordRegexValidator: {
        valid: false
      }
    }
  }

}
