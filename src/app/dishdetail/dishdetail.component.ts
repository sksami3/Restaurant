import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../Shared/dish';
import { Routes, RouterModule, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common' 
import {DishService} from '../services/dish.service'
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  // @Input()
  dish : Dish;
  dishIds: Array<string>;
  prev: string;
  next: string;
  
  constructor(private dishService : DishService,private rout: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.rout.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe((dish) => {this.dish = dish; this.setPrevNext(dish.id)});

    // const id = this.rout.snapshot.params['id'];
    // this.dishService.getDish(id).subscribe((dish) => this.dish = dish);
  }

  nextClicked(){
    this.dish = null;
  }

  goBack(){
    this.location.back();
  }

  setPrevNext(currentId : string){
    const index = this.dishIds.indexOf(currentId);
    this.prev = this.dishIds[(this.dishIds.length + index -1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index +1) % this.dishIds.length];
  }

}
