"use strict";

import { Component, OnInit, ViewChild, resolveForwardRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../../Shared/feedback';
import { FeedbackService } from '../../services/feedback.service';
import { expand } from '../../animations/app.animation';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    expand()
  ]
})
export class ContactComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  feedBackReturnObject: Feedback;
  feedBackErrorMsg: string;
  waitFor5Sec: boolean = false;
  runSpinner: boolean = false;
  //map
  title = 'Map Of Our Location';
  lat = 23.824273;
  lng = 90.365513;

  constructor(private fb: FormBuilder, private _feedbackService: FeedbackService, private toastr: ToastrService) {
    this.createFormGroup();
  }

  ngOnInit(): void {
    this.feedbackForm.valueChanges.subscribe((data) => this.onValueChange(data));
    this.onValueChange();
  }

  createFormGroup() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['88', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  };

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First name is required...',
      'minlength': 'Must give at least 2 digit first name',
      'maxlength': 'First name can not exceed 25 words'
    },
    'lastname': {
      'required': 'Last name is required',
      'minlength': 'Must give at least 2 digit last name',
      'maxlength': 'Last name can not exceed 25 words'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };

  onValueChange(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.runSpinner = true;

    new Promise<Feedback>((resolve, reject) => {
      this._feedbackService.submitFeedback(this.feedback)
        .subscribe(f => resolve(f), errMSG => reject(errMSG));
    })
      .then(value => {
        this.toastr.success('Submitted Successfully','Success!')
        this.feedBackReturnObject = value;
        this.waitFor5Sec = true;
        this.runSpinner = false;
        setTimeout(() => {
          this.waitFor5Sec = false;
        }, 5000)
      })
      .catch(error => {
        this.toastr.success(error.message,'Error!')
        this.feedBackErrorMsg = error;
        this.runSpinner = false;
        setTimeout(() => {
          this.waitFor5Sec = false;
        }, 5000)
      })
      .finally(() => {
        //this.waitFor5Sec = false;
        this.feedbackForm.reset({
          firstname: '',
          lastname: '',
          telnum: '88',
          email: '',
          agree: false,
          contacttype: 'None',
          message: ''
        });
      });

  }



}
