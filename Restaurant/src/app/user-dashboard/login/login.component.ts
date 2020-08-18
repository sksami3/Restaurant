import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '', remember: false };
  error: string;
  

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private authenticationService: AuthenticationService, private router : Router) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    //console.log('User: ', this.user);
    this.dialogRef.close();
    this.authenticationService.login(this.user.username, this.user.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/menu']);
                },
                error => {
                    this.error = error;
                    console.log(error);
                });
  }

}
