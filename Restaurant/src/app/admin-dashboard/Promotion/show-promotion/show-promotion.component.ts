import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/services/promotion.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { Dish } from '../../../Shared/dish';
import { TosterService } from 'src/app/services/toster.service';
import { EditDishComponent } from '../../Dish/edit-dish/edit-dish.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-show-promotion',
  templateUrl: './show-promotion.component.html',
  styleUrls: ['./show-promotion.component.scss']
})
export class ShowPromotionComponent implements OnInit {
  settings = {
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
  constructor(private _promotionService: PromotionService,private _tosterService: TosterService,public dialog: MatDialog) {
    this._promotionService.getPromotions().subscribe(res => this.source.load(res));
  }

  ngOnInit(): void {

  }
  onEdit(event){
    console.log(event);
    const something = this.dialog.open(EditDishComponent,{width:'80%', height:'80%'});
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      new Promise((resolve, reject) => {
        this._promotionService.deletePromotion(event.data.id) //delete promotion
          .subscribe(res => resolve(res), err => reject(err))
      }).then(() => {
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

}
