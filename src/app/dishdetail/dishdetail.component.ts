import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../Shared/dish';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common' 
import {DishService} from '../services/dish.service'

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  // @Input()
  dish : Dish;
  
  constructor(private dishService : DishService,private rout: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    const id = this.rout.snapshot.params['id'];
    this.dish = this.dishService.getDish(id);
  }

  goBack(){
    this.location.back();
  }

}
