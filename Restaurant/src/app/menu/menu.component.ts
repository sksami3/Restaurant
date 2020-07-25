import { Component, OnInit } from '@angular/core';
import { Dish } from '../Shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})



export class MenuComponent implements OnInit {

  dishes: Array<Dish>;

  selectedDish: Dish;


  constructor(private dishService: DishService) {

  }

  clickedDish(d: Dish) {
    this.selectedDish = d;
  }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((d) => this.dishes = d);
  }

}
