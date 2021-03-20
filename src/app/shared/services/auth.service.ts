import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) { 
    this.user$ = this.afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem("returnUrl", returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }

  logout(){
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .pipe(
      switchMap(user => 
      {
        if (user) return this.userService.get(user.uid).valueChanges()
        return of(null)
      })
    )
  }
}
