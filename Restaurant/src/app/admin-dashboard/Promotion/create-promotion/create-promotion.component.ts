import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PromotionService } from 'src/app/services/promotion.service';
import { UserService } from 'src/app/services/user.service';
import { Promotion } from 'src/app/shared/promotion';
import { TosterService } from 'src/app/services/toster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.scss']
})
export class CreatePromotionComponent implements OnInit {

  promotionForm: FormGroup;
  promotion: Promotion;

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

  disableButton:boolean = false;
  loadingLargeGroup = false;
  loadingMediumGroup = false;
  loading = false;

  constructor(private fb: FormBuilder,
    private _promotionService: PromotionService,
    private userService: UserService,
    private _tosterService: TosterService,
    private router: Router) {
    this.createFormGroup();
  }

  ngOnInit(): void {
    this.promotionForm.valueChanges.subscribe((data) => {
      this.onValueChange(data);
      console.log(data);
    });
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
    this.promotionForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      Label: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Image: [''],
      Featured: false
    });
  };

  formErrors = {
    'Name': '',
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
    console.log('on value change');
    if (!this.promotionForm) { return; }
    const form = this.promotionForm;
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

  toggleLoadingLargeGroupAnimation() {
    this.loadingLargeGroup = true;

    //setTimeout(() => this.loadingLargeGroup = false, 3000);
  }

  toggleLoadingMediumGroupAnimation() {
    this.loadingMediumGroup = true;

    //setTimeout(() => this.loadingMediumGroup = false, 3000);
  }

  onSubmit = () => {
    var returnObj: Promotion;
    // if (this.userDetailsForm.valid) {
    this.promotion = this.promotionForm.value;
    this.fileToUpload = <File>this.uploadFile;

    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
      console.log(this.promotion);

      var something = new Promise<any>((resolve, reject) => {
        try {
          this.userService.uploadImage(formData).subscribe(f => { console.log(f); resolve(f); }, errMSG => { reject(errMSG) });
        }
        catch (Error) {
          alert(Error);
        }
      }).then((value) => {
        this.disableButton = true;
        this.promotion.image = value;
        console.log(this.promotion);
        this._promotionService.postPromotion(this.promotion).subscribe(
          res => {
            returnObj = res;
            this._tosterService.showToast('success', 'Congratulations!!', 'Created Successfully');
            setTimeout(() => {
              this.router.navigate(['admin/showPromotions']);
            }, 3000);
          },
          err => {
            this.disableButton = false;
            this.message = err;
            this._tosterService.showToast('danger', 'Error!!', err.message);
          });
      }).catch(err => {
        this.disableButton = false;
        console.log(err);
        this.message = err.message;
        this._tosterService.showToast('danger', 'Error!!', err.message);
      }
      );

      console.log(something);
    }
    else {
      //error pop
      this._promotionService.postPromotion(this.promotion).subscribe(res => {
        returnObj = res;
        this._tosterService.showToast('warning', 'Warning!!', 'Created without Photo');
        setTimeout(() => {
          this.router.navigate(['admin/showPromotions']);
        }, 3000);
      }, err => {
        this.message = err;
        this._tosterService.showToast('danger', 'Error!!', err.message);
      });
    }
  }

}
