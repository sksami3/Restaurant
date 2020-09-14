import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Dish } from 'src/app/shared/dish';
import { DishService } from 'src/app/services/dish.service';
import { UserService } from 'src/app/services/user.service';
import { TosterService } from 'src/app/services/toster.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.scss']
})
export class CreateDishComponent implements OnInit {
  dishForm: FormGroup;
  dish: Dish;

  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
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
  disableButton: boolean = false;
  loadingLargeGroup = false;
  loadingMediumGroup = false;
  loading = false;

  constructor(@Inject(DOCUMENT) private document,
    private fb: FormBuilder,
    private _dishService: DishService, private userService: UserService,
    private _tosterService: TosterService,
    private router: Router
  ) {
    this.createFormGroup();
  }

  ngOnInit(): void {
    this.dishForm.valueChanges.subscribe((data) => {
      this.onValueChange(data);
      console.log(data);
    }
    );
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
    this.dishForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      Catagory: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      Label: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Image: [''],
      Featured: false
    });
  };

  formErrors = {
    'Name': '',
    'Catagory': '',
    'Label': '',
    'Price': '',
    'Description': '',
    'Featured': ''
  };

  validationMessages = {
    'Name': {
      'required': 'Name is required...',
      'minlength': 'Must give at least 2 digit first name',
      'maxlength': 'Name can not exceed 25 words'
    },
    'Catagory': {
      'required': 'Catagory name is required',
      'minlength': 'Must give at least 2 digit Catagory',
      'maxlength': 'Catagory can not exceed 25 words'
    },
    'Label': {
      'required': 'Label is required.',

    },
    'Price': {
      'required': 'Price is required.',

    },
    'Description': {
      'required': 'Description is required.',

    }
  };

  onValueChange(data?: any) {
    if (!this.dishForm) { return; }
    const form = this.dishForm;
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
    this.loadingMediumGroup = true;

    var returnObj: Dish;
    // if (this.userDetailsForm.valid) {
    this.dish = this.dishForm.value;
    this.fileToUpload = <File>this.uploadFile;

    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
      console.log(this.dish);

      var something = new Promise<any>((resolve, reject) => {
        try {
          this.userService.uploadImage(formData).subscribe(f => {
            console.log(f);
            resolve(f);
          }, errMSG => {
            reject(errMSG);
          });
        }
        catch (Error) {
          alert(Error);
        }
      }).then((value) => {
        this.dish.image = value;
        console.log(this.dish);
        this._dishService.postDishe(this.dish).subscribe(
          res => {
            this.disableButton = true;
            returnObj = res;
            new Promise<any>((resolve, reject) => {
              this._tosterService.showToast('success', 'Congratulations!!', 'Created Successfully');
            })

            setTimeout(() => {
              this.router.navigate(['admin/showDishes']);
            }, 3000);  //5s
          },
          err => {
            this.disableButton = false;
            this.message = err;
            this._tosterService.showToast('danger', 'Error!!', err.message);
          }
        );

      }).catch(err => {
        this.disableButton = false;
        console.log(err);
        this.message = err.message;
        this._tosterService.showToast('danger', 'Error!!', err.message);
      }
      );
    }
    else {
      //error pop
      this._dishService.postDishe(this.dish).subscribe(res => {
        returnObj = res;
        this._tosterService.showToast('warning', 'Warning!!', 'Created without Photo');
        setTimeout(() => {
          this.router.navigate(['admin/showDishes']);
        }, 3000);
      }, err => {
        this.message = err;
        this._tosterService.showToast('danger', 'Error!!', err.message);
      });
    }
  }

  toggleLoadingLargeGroupAnimation() {
    this.loadingLargeGroup = true;

    //setTimeout(() => this.loadingLargeGroup = false, 3000);
  }

  toggleLoadingMediumGroupAnimation() {
    this.loadingMediumGroup = true;

    //setTimeout(() => this.loadingMediumGroup = false, 3000);
  }

}
