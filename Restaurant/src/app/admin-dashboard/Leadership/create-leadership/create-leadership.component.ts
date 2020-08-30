import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { LeaderService } from 'src/app/services/leader.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Leader } from 'src/app/Shared/leader';

@Component({
  selector: 'app-create-leadership',
  templateUrl: './create-leadership.component.html',
  styleUrls: ['./create-leadership.component.scss']
})
export class CreateLeadershipComponent implements OnInit {
  leadershipForm: FormGroup;
  leadership: Leader;

  public uploader: FileUploader;
  hasDragOver = false;

  @Input()
  editmode = false;

  @Input()
  url: any = '';

  @Output()
  urlChange = new EventEmitter();

  uploadFile: any;
  fileToUpload: any;
  public progress: number;
  public message: string;
  constructor(private fb: FormBuilder, private _leadershipService: LeaderService,private userService: UserService) { 
    this.createFormGroup();
  }

  ngOnInit(): void {
    this.leadershipForm.valueChanges.subscribe((data) => this.onValueChange(data));
    this.onValueChange();
  }

  public fileOver(e: any): void {
    this.hasDragOver = e;
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

  createFormGroup() {
    this.leadershipForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      Abbr: ['', [Validators.required]],
      Designation: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Image: [''],
      Featured: false
    });
  };

  formErrors = {
    'Name': '',
    'Abbr': '',
    'Designation': '',
    'Description': '',
    'Featured': ''
  };

  validationMessages = {
    'Name': {
      'required': 'Name is required...',
      'minlength': 'Must give at least 2 digit first name',
      'maxlength': 'Name can not exceed 25 words'
    },

    'Abbr': {
      'required': 'Abbr is required.',
      
    },
    'Designation': {
      'required': 'Designation is required.',
     
    },
    'Description': {
      'required': 'Description is required.',
     
    }
  };

  onValueChange(data?: any) {
    if (!this.leadershipForm) { return; }
    const form = this.leadershipForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit = () => {
    var returnObj: Leader;
    // if (this.userDetailsForm.valid) {
    this.leadership = this.leadershipForm.value;
    this.fileToUpload = <File>this.uploadFile;

    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
      console.log(this.leadership);

      var something = new Promise<any>((resolve, reject) => {
        try {
          this.userService.uploadImage(formData).subscribe(f => { console.log(f); resolve(f); }, errMSG => { reject(errMSG) });
        }
        catch (Error) {
          alert(Error);
        }
      }).then((value) => {
        this.leadership.image = value;
        console.log(this.leadership);
        this._leadershipService.postLeader(this.leadership).subscribe(res => returnObj = res, err => this.message = err);
      }).catch(err => {
        console.log(err);
        this.message = err.message;
      }
      );

      console.log(something);
    }
    else {
      //error pop
      this._leadershipService.postLeader(this.leadership).subscribe(res => returnObj = res, err => this.message = err);
    }
  }

}
