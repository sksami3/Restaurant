import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/app/Shared/JWTModels/user';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  isLoggedIn: boolean;
  user: User;
  constructor(public dialog: MatDialog, private auth: AuthenticationService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit(): void {
    if (this.auth.userValue) {
      if (!this.user){
        this.user = this.auth.userValue;
      }
      this.isLoggedIn = true;
    }
  }

  openLoginForm(): void {
    const loginPop = this.dialog.open(LoginComponent, { width: '500px', height: '450px' });
    console.log(loginPop);
  }

  logout(): void {
    console.log("logout button working");
    this.auth.logout();
  }
  
  undoDropProfileDetails(): void {
    this.trigger.closeMenu();
  }
}
