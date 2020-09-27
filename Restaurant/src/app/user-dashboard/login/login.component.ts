import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '', remember: false };
  error: string;
  isLoaded: boolean = false;

  Suser: SocialUser;
  loggedIn: boolean;


  constructor(private authService: SocialAuthService, public dialogRef: MatDialogRef<LoginComponent>, private authenticationService: AuthenticationService, private router: Router) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      console.log(user);
      this.Suser = user;
      this.loggedIn = (user != null);
      this.authenticationService.loginByEmail(user.email)
        .pipe(first())
        .subscribe(
          data => {
            if (data == null)
              console.log("No user found");
            else {
              this.signOut();
              if (data.role == 'Admin')
                this.router.navigate(['/admin/showDishes']);
              else
                this.router.navigate(['/menu']);
            }

          },
          error => {
            this.signOut();
            this.error = error;
            console.log(error);
          });


    });

    var urlParams = [];
    window.location.search.replace("?", "").split("&").forEach(function (e, i) {
      var p = e.split("=");
      urlParams[p[0]] = p[1];
    });

    // We have all the params now -> you can access it by name
    console.log(urlParams["loaded"]);

    if (urlParams["loaded"]) { } else {

      let win = (window as any);
      win.location.search = '?loaded=1';
      //win.location.reload('?loaded=1');
    }
  }
  goToRegisterPage(): void {
    this.router.navigateByUrl('/createProfile');
    //this.dialogRef.close();
  }
  goToForgetPassword(): void {
    this.router.navigateByUrl('/forgetPassword');
  }
  onSubmit() {
    //console.log('User: ', this.user);
    //this.dialogRef.close();
    this.authenticationService.login(this.user.username, this.user.password)
      .pipe(first())
      .subscribe(
        data => {
          if (data.role == 'Admin')
            this.router.navigate(['/admin/showDishes']);
          else
            this.router.navigate(['/menu']);
        },
        error => {
          this.error = error;
          console.log(error);
        });
  }

}
