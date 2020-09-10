// import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/Shared/JWTModels/user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Role } from 'src/app/Shared/JWTModels/role';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public uploader: FileUploader;
  hasDragOver = false;

  @Input()
  editmode = false;

  @Input()
  url: any = '';

  @Output()
  urlChange = new EventEmitter();

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

  public fileOver(e: any): void {
    this.hasDragOver = e;
  }



  setFormControls = () => {
    this.userDetailsForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      firstname: ['', [Validators.min(0), Validators.max(100)]],
      lastname: ['', [Validators.min(0), Validators.max(100)]],
      image: ['']
    });
  }

  invalidateForm = () => {
    Object.keys(this.userDetailsForm.controls).forEach(field => {
      const control = this.userDetailsForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
      this.uploadFile = event.target.files[0];
    }
  }

  submit = () => {
    this.disableButton = true;
    var returnObj: User;
    // if (this.userDetailsForm.valid) {
    this.userModel = this.userDetailsForm.value;
    this.userModel.role = Role.User;
    this.fileToUpload = <File>this.uploadFile;

    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
      console.log(this.userModel);

      var something = new Promise<any>((resolve, reject) => {
        try {
          this.userService.uploadImage(formData).subscribe(f => { console.log(f); resolve(f); }, errMSG => { reject(errMSG) });
        }
        catch (Error) {
          this.disableButton = false;
          this.toastr.error('Problem occoured! Please try again later.', 'Error!!');
        }
      }).then((value) => {
        this.userModel.image = value;
        this.userService.create(this.userModel).subscribe(res => {
          console.log(res);
          if (res) {
            console.log(res);
            returnObj = res;
            this.toastr.success('Registerd Successfully', 'Success!!');
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          }
          else {
            this.toastr.error('username or email already exists');
            this.disableButton = false;
          }

        }, err => this.message = err);
      }).catch(err => {
        console.log(err);
        this.disableButton = false;
        this.message = err.message;
        this.toastr.error('Problem occoured! Please try again later.', 'Error!!');
      }
      );

      console.log(something);
    }
    else {
      this.userService.create(this.userModel).subscribe(res => {
        console.log(res);
        if (res) {
          console.log(res);
          returnObj = res;
          this.toastr.warning('Registerd Successfully without Profile Picture', 'Success!!');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        }
        else {
          this.toastr.error('username or email already exists','Problem!');
          this.disableButton = false;
        }
      }, err => {
        this.message = err;
        this.toastr.error(this.message,'Error');
      });
    }
  }

}
