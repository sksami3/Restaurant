// import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/Shared/JWTModels/user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  constructor(private fb: FormBuilder, private userService: UserService, private http: HttpClient,private auth:AuthenticationService) {
    this.setFormControls();


    // this.uploader = new FileUploader({
    //   url: 'http://localhost:9090/upload',
    //   disableMultipart: false,
    //   autoUpload: true
    // });

    // this.uploader.response.subscribe(res => {
    //   // Upload returns a JSON with the image ID
    //   this.url = 'http://localhost:9090/get/' + JSON.parse(res).id;
    //   this.urlChange.emit(this.url);
    // });

  }

  ngOnInit(): void {
    console.log("in user profile");
    this.userService.getById(this.auth.userValue.id)
    .subscribe(value => console.log(value),err => console.log(err));
  }

  public fileOver(e: any): void {
    this.hasDragOver = e;
  }



  setFormControls = () => {
    this.userDetailsForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]],
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

  // get username() { return this.userDetailsForm.get('username'); }

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
    var returnObj: User;
    // if (this.userDetailsForm.valid) {
    this.userModel = this.userDetailsForm.value;

    // } else {
    //   this.invalidateForm();
    // }
    this.fileToUpload = <File>this.uploadFile;
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    console.log(this.userModel);
    //this.http.post('https://localhost:44306/users', { firstname: valueToBeSubmitted.firstName, lastname: valueToBeSubmitted.lastName, email: valueToBeSubmitted.email, image: formData, password: valueToBeSubmitted.password, username: valueToBeSubmitted.username }, { reportProgress: true, observe: 'events' })

    // this.http.post('https://localhost:44306/users', { formData, valueToBeSubmitted }, { reportProgress: true, observe: 'events' })
    //   .subscribe(event => {
    //     if (event.type === HttpEventType.UploadProgress)
    //       this.progress = Math.round(100 * event.loaded / event.total);
    //     else if (event.type === HttpEventType.Response) {
    //       this.message = 'Upload success.';
    //       //this.onUploadFinished.emit(event.body);
    //     }
    //   });


    var someting = new Promise<any>((resolve, reject) => {
      try {
        this.userService.uploadImage(formData).subscribe(f => { console.log(f);resolve(f); }, errMSG => { reject(errMSG) });
      }
      catch (Error) {
        alert(Error);
      }
    }).then((value) => {
      this.userModel.image = value;
      console.log(this.userModel);
      this.userService.create(this.userModel).subscribe(res => returnObj = res, err => this.message = err);
    }).catch(err => {
      console.log(err);
      this.message = err.message;
    }
    );
  }

}
