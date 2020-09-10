import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/app/Shared/JWTModels/user';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  isLoggedIn: boolean;
  user: User;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogga: MatDialog, private auth: AuthenticationService, 
    @Inject('BaseURL') private BaseURL,
    private dialogService: NbDialogService,
    private router: Router) { }
    isAdmin:boolean = false;
  ngOnInit(): void {
    if (this.auth.userValue) {
      if (!this.user){
        this.user = this.auth.userValue;
        if(this.user.role == 'Admin'){
          this.isAdmin = true;
        }
      }
      this.isLoggedIn = true;
    }
  }

  openLoginForm(): void {
    //const loginPop = this.dialogga.open(LoginComponent, { width: '500px', height: '450px' });
    
    this.router.navigate(['/login']);
    
  }

  // openLoginForm(): void{
  //   try{
  //     //const something = this.dialogga.open(LoginComponent,{width:'500px', height:'450px'});
  //     this.dialogService.open(LoginOverlayComponent, {
  //       context: {
  //         title: 'This is a title passed to the dialog component',
  //       },
  //     });
  //   }
  //   catch(Error){
  //     console.log(Error);
  //   };
    
  // }

  logout(): void {
    console.log("logout button working");
    this.auth.logout();
  }
  
  undoDropProfileDetails(): void {
    this.trigger.closeMenu();
  }
}
