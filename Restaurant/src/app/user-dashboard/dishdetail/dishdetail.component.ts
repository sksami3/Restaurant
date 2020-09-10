import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../../Shared/dish';
import { Routes, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'
import { DishService } from '../../services/dish.service'
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Comment } from '../../Shared/comment';
import { visibility, controlInOutWithFlyingAnimation, expand } from '../../animations/app.animation'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/Shared/JWTModels/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    controlInOutWithFlyingAnimation(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  @ViewChild('cform') feedbackFormDirective;
  visibility = "_shown";
  // @Input()
  dish: Dish;
  dishCopy: Dish;
  commentsForPagination: Array<Comment> = [];
  dishErrMessage: string;
  dishIds: Array<string>;
  prev: string;
  next: string;
  //form
  commentForm: FormGroup;
  comment: Comment;
  //sliderTick
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  //value = 5;
  vertical = false;
  tickInterval = 1;

  menuErrMsg: string;
  //selectedDish: Dish;
  page = 0;
  size = 4;
  data = [];
  isLoggedIn: boolean = false;
  user: User;

  constructor(private dishService: DishService,
    private rout: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private auth : AuthenticationService,
    private toastr: ToastrService,
    @Inject('BaseURL') private BaseURL) {
    this.createForm();
    this.user = auth.userValue;
    if(this.user && this.user.role=='User'){
      this.isLoggedIn= true;
    }
  }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds, errorMsg => this.dishErrMessage = errorMsg);

    this.rout.params.pipe(switchMap((params: Params) => {
      this.visibility = "_hidden";
      return this.dishService.getDish(params['id']);
    }))
      .subscribe((dish) => {
        this.visibility = "_shown";
        this.dish = dish;
        this.dishCopy = dish;
        this.commentsForPagination = dish.comments;
        this.getDataWithPagination({ pageIndex: this.page, pageSize: this.size, commentss: this.commentsForPagination });
        this.setPrevNext(dish.id);
      },
        function (errorMsg) { return this.dishErrMessage = errorMsg; });

    // const id = this.rout.snapshot.params['id'];
    // this.dishService.getDish(id).subscribe((dish) => this.dish = dish);
    this.commentForm.valueChanges.subscribe((data) => this.onValueChangeOfCommentForm(data), (errorMsg) => this.dishErrMessage = errorMsg);
    this.onValueChangeOfCommentForm();
  }


  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  createForm() {
    this.commentForm = this.fb.group({
      viewerscomment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5]
    });

  }

  commentFormError = {
    'viewerscomment': '',
    'author': '',
    'rating': ''
  };
  commentFormErrorMessage = {
    'viewerscomment': {
      'required': 'Comment field can not be empty'
    },
    'author': {
      'required': 'Please enter authors name',
      'minlength': 'Must be more than 2 characters'
    }
  };

  onValueChangeOfCommentForm(data?: any) {
    if (!this.commentForm) { return }
    const form = this.commentForm;
    for (let field in this.commentFormError) {
      if (this.commentFormError.hasOwnProperty(field)) {
        this.commentFormError[field] = '';
        const valueFromForm = form.get(field);
        if (valueFromForm && valueFromForm.dirty && !valueFromForm.valid) {
          const message = this.commentFormErrorMessage[field];
          for (let error in valueFromForm.errors) {
            this.commentFormError[field] += message[error] + ' ';
          }
        }
      }
    }
  }


  // nextClicked() {
  //   this.dish = null;
  // }

  goBack() {
    this.location.back();
  }

  setPrevNext(currentId: string) {
    const index = this.dishIds.indexOf(currentId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }



  onSubmit() {
    //console.log(this.rout.snapshot.params['id'] + typeof(this.rout.snapshot.params['id']))
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.comment.dishId = parseInt(this.dish.id);
    this.dishService.postComment(this.comment)
      .subscribe(f => this.dishService.getDish(f.dishId.toString())
        .subscribe(res => { 
          console.log(res); 
          this.dish = res;
          this.dishCopy = res;
          this.commentsForPagination = res.comments;
          // this.data = res.comments.reverse();
          this.getDataWithPagination({ pageIndex: this.page, pageSize: this.size, commentss: res.comments });
          this.toastr.success('Congratulations!!', 'Comment Submitted');
         }, err => { 
           this.dish = null; 
           this.dishCopy = null; 
           this.dishErrMessage = err;
           this.toastr.error('Error!!', 'Please Try Again Later');
          }),
        (err) => { 
          this.dishErrMessage = <any>err; 
          console.log(err);
          this.toastr.error('Error!!', 'Please Try Again Later');
        });

    this.commentForm.reset(this.commentForm.value);
  }
  getDataWithPagination(obj) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;
    if (obj.commentss) {
      this.data = obj.commentss.filter(() => {
        index++;
        return (index > startingIndex && index <= endingIndex) ? true : false;
      }).reverse();
    } else {
      this.data = this.commentsForPagination.filter(() => {
        index++;
        return (index > startingIndex && index <= endingIndex) ? true : false;
      }).reverse();
    }

  }


}
