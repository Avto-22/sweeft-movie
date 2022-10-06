import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserIfo } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isClicked: boolean = false;

  signInForm: FormGroup;

  signUpForm: FormGroup;

  passwordError: boolean = false;

  isEyeOn: boolean = false;

  isUpEyeOn: boolean = false;

  isRepEyeOn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    document.body.style.backgroundImage =
      "url('../../../assets/images/auth-img.jpg')";
    document.body.style.backgroundPosition = 'cover';
    document.body.style.backgroundRepeat = 'repeat';
    this.createSignInForm();
    this.createSignUpForm();
  }

  signIn(user: UserIfo) {
    console.log('SignIn loading...');
    this.authService.signIn(user);
  }

  signUp(user: UserIfo) {
    console.log('SignUp loading...');
    this.authService.signUp(user);
  }

  createSignInForm() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required]),
      },
      this.passwordMatch
    );
  }

  passwordMatch(form: FormGroup) {
    return form.get('password').value == form.get('repeatPassword').value
      ? null
      : { misMatch: true };
  }

  switch() {
    this.isClicked = !this.isClicked;
  }

  eyeClick(isSignUp: boolean, isRepeat?: boolean) {
    if (!isSignUp) {
      let password = document.getElementById('signInpassword') as HTMLElement;
      this.isEyeOn = !this.isEyeOn;
      if (this.isEyeOn) {
        password.setAttribute('type', 'text');
      } else {
        password.setAttribute('type', 'password');
      }
    } else {
      if (isRepeat) {
        let repPassword = document.getElementById('rep-pass') as HTMLElement;
        this.isRepEyeOn = !this.isRepEyeOn;
        if (this.isRepEyeOn) {
          repPassword.setAttribute('type', 'text');
        } else {
          repPassword.setAttribute('type', 'password');
        }
      } else {
        let upPassword = document.getElementById('up-pass') as HTMLElement;
        this.isUpEyeOn = !this.isUpEyeOn;
        if (this.isUpEyeOn) {
          upPassword.setAttribute('type', 'text');
        } else {
          upPassword.setAttribute('type', 'password');
        }
      }
    }
  }

}
