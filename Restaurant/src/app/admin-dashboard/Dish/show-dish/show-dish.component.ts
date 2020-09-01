import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { Dish } from '../../../Shared/dish';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-show-dish',
  templateUrl: './show-dish.component.html',
  styleUrls: ['./show-dish.component.scss']
})
export class ShowDishComponent implements OnInit {
  //data : Array<Dish>;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      catagory: {
        title: 'Catagory',
        type: 'string',
      },
      label: {
        title: 'Label',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private _dishService: DishService) {
    //let data;
    this._dishService.getDishes().subscribe(res => this.source.load(res));
    //console.log(data);
    //this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      new Promise((resolve, reject) => {
        this._dishService.deleteDish(event.data.id)
          .subscribe(res => resolve(res), err => reject(err))
      }).then(() => {
        event.confirm.resolve();
      }).catch(err =>
        console.log(err)
      );

    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
  }

}
