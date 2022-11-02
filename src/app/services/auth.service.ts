import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { SweetAlertService } from './sweet-alert.service';

export interface UserIfo {
  email: string;
  password: string;
}

export interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user_: User;
  name: string = 'avto';

  setName(): Promise<string>{
    
    return Promise.resolve('avto');
  }

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private sweetAlert: SweetAlertService
  ) {
    this.auth.onAuthStateChanged((user) => {
      this.user_ = user;
    });
  }

  get isUserLogged() {
    return !!this.user_;
  }

  async getUserUid() {
    let uid:string;
    await this.auth.onAuthStateChanged((user) => {
     uid= user?.uid;
    });
    return uid;
  }

  signIn({ email, password }: UserIfo) {
    if (!email || !password) {
      return;
    }
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(
        () => {
          this.router.navigate(['movie-list'], { queryParams: { page: 1 } });
        },
        (error) => {
          throw 'User not found';
        }
      )
      .catch((error) => {
        this.sweetAlert.authError(error);
      });
  }

  signUp({ email, password }: UserIfo) {
    if (!email || !password) {
      return;
    }
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          this.router.navigate(['movie-list']);
        },
        (error) => {
          throw `Invalid Userinfo or The email address is already in use by another account`;
        }
      )
      .catch((error) => {
        this.sweetAlert.authError(error);
      });
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['auth']);
    });
  }
}
