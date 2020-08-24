import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../../Shared/dish';
import { DishService } from '../../services/dish.service';
import { controlInOutWithFlyingAnimation,expand } from '../../animations/app.animation';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    controlInOutWithFlyingAnimation(),
    expand()
  ]
})



export class MenuComponent implements OnInit {

  dishes: Array<Dish>;
  menuErrMsg: string;
  //selectedDish: Dish;


  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) {

  }

  // clickedDish(d: Dish) {
  //   this.selectedDish = d;
  // }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((d) => this.dishes = d, errorM => this.menuErrMsg = errorM);
  }

}
