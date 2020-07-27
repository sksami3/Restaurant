import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../Shared/dish';
import { Routes, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'
import { DishService } from '../services/dish.service'
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import {Comment} from '../Shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @ViewChild('cform') feedbackFormDirective;
  // @Input()
  dish: Dish;
  dishIds: Array<string>;
  prev: string;
  next: string;
  //form
  commentForm : FormGroup;
  comment : Comment;
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

  constructor(private dishService: DishService,
    private rout: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm();
  }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.rout.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish) => { this.dish = dish; this.setPrevNext(dish.id) });

    // const id = this.rout.snapshot.params['id'];
    // this.dishService.getDish(id).subscribe((dish) => this.dish = dish);
    this.commentForm.valueChanges.subscribe((data) => this.onValueChangeOfCommentForm(data));
    this.onValueChangeOfCommentForm();
  }

  
  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  createForm(){
    this.commentForm = this.fb.group({
      comment : ['', Validators.required],
      author : ['', [Validators.required,Validators.minLength(2)]],
      rating : [5]
    });
    
  }

  commentFormError = {
    'comment' : '',
    'author' : '',
    'rating' : ''
  };
  commentFormErrorMessage={
    'comment' : {
      'required' : 'Comment field can not be empty'
    },
    'author' : {
      'required' : 'Please enter authors name',
      'minlength' : 'Must be more than 2 characters'
    }
  };

  onValueChangeOfCommentForm(data? : any){
    if(!this.commentForm) {return}
    const form = this.commentForm;
    for(let field in this.commentFormError){
      if(this.commentFormError.hasOwnProperty(field)){
        this.commentFormError[field] = '';
        const valueFromForm = form.get(field);
        if(valueFromForm && valueFromForm.dirty && !valueFromForm.valid){
          const message = this.commentFormErrorMessage[field];
          for(let error in valueFromForm.errors){
            this.commentFormError[field] += message[error] + ' ';        
          }
        }
      }
    }
  }


  nextClicked() {
    this.dish = null;
  }

  goBack() {
    this.location.back();
  }

  setPrevNext(currentId: string) {
    const index = this.dishIds.indexOf(currentId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  

  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toString();
    console.log(this.comment);
    this.dish.comments.push(this.comment);
  }



}
