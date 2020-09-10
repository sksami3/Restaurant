import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { Dish } from '../../../Shared/dish';
import { DishService } from 'src/app/services/dish.service';
import { TosterService } from 'src/app/services/toster.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditDishComponent } from '../edit-dish/edit-dish.component';

@Component({
  selector: 'app-show-dish',
  templateUrl: './show-dish.component.html',
  styleUrls: ['./show-dish.component.scss']
})
export class ShowDishComponent implements OnInit {
  //data : Array<Dish>;
  settings = {
    //rowClassFunction: (row) => { return 'ng2-custom-actions-inline' },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    // mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      // saveButtonContent: '<i class="nb-checkmark"></i>',
      // cancelButtonContent: '<i class="nb-close"></i>',
      confirmEdit: 'ourCustomAction'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    
    actions: {
      add: false,
      edit: false,
      delete: true,
    
      custom: [{ name: 'edit', title: '<i class="nb-edit"></i>' }],
      position: 'right'
      
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false
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

  constructor(private _dishService: DishService,
    private _tosterService: TosterService
    ,public dialog: MatDialog,
    ) {
    //let data;
    this._dishService.getDishes().subscribe(res => this.source.load(res));
    //console.log(data);
    //this.source.load(data);
  }
  onEdit(event){
    console.log(event);
    const something = this.dialog.open(EditDishComponent,{width:'80%', height:'80%'});
  }
  onDeleteConfirm(event): void {
    console.log(event)
    if (window.confirm('Are you sure you want to delete?')) {
      new Promise((resolve, reject) => {
        this._dishService.deleteDish(event.data.id)
          .subscribe(res => {resolve(res); }, err => reject(err))
      }).then((result) => {
        event.confirm.resolve();
        this._tosterService.showToast('success', 'Congratulations!!', 'Deleted Successfully');
      }).catch(err =>
        {
          console.log(err);
          this._tosterService.showToast('danger', 'Error!!', err.message);
        }
      );

    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
  }

}
