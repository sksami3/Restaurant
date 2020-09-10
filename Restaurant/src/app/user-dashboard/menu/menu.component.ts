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

  data = [];
  dishes: Array<Dish>;
  menuErrMsg: string;
  //selectedDish: Dish;
  page = 0;
  size = 4;



  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) {

  }

  // clickedDish(d: Dish) {
  //   this.selectedDish = d;
  // }

  ngOnInit(): void {

      this.dishService.getDishes().subscribe((d) => 
      {
        this.dishes = d;
        this.getDataWithPagination({pageIndex: this.page, pageSize: this.size, dishess:d });}, 
      errorM => this.menuErrMsg = errorM
      );
      

    
  }
getDataWithPagination(obj) {
    let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;
    if(obj.dishess){
      this.data = obj.dishess.filter(() => {
        index++;
        return (index > startingIndex && index <= endingIndex) ? true : false;
      });
    }else{
      this.data = this.dishes.filter(() => {
        index++;
        return (index > startingIndex && index <= endingIndex) ? true : false;
      });
    }
    
  }
}
