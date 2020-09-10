import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/Shared/JWTModels/user';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Role } from 'src/app/Shared/JWTModels/role';
import { ownUrl } from 'src/app/Shared/baseurl';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  userDetailsForm: FormGroup;
  userModel: User;
  uploadFile: any;
  fileToUpload: any;
  public progress: number;
  public message: string;
  disableButton: boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private router: Router) {
    this.setFormControls();

  }

  ngOnInit(): void {
    console.log("in user profile");
  }


  setFormControls = () => {
    this.userDetailsForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
      
    });
  }

  invalidateForm = () => {
    Object.keys(this.userDetailsForm.controls).forEach(field => {
      const control = this.userDetailsForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
  

  submit = () => {    
    this.userModel = this.userDetailsForm.value;
    console.log(this.userModel);
    this.auth.sendResetLink(this.userModel.email,ownUrl.toString()).subscribe(res => {
      if(res == true){
        this.toastr.success('Email sent successfully','Please check your email');
      }
      else{
        this.toastr.info("User not found",'Not a user');
      }
    },
    err =>{
      console.log(err);
      this.toastr.error(err.message,'Error sending mail');
    });
  }

}

