import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  signinToggle: boolean = false;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, this.emailRegexValidator]],
      password: ['', [Validators.required, this.passwordRegexValidator]]
    })
  }

  login(): void {
    if (this.signInForm.valid) {
      this.signinToggle = true;
      this.authenticationService.loginUser(this.signInForm.value).subscribe(() => {
        this.router.navigateByUrl('/user');
      })
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
