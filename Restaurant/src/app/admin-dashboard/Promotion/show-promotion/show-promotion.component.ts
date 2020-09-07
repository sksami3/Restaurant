import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/services/promotion.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { Dish } from '../../../Shared/dish';
import { TosterService } from 'src/app/services/toster.service';

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
  constructor(private _promotionService: PromotionService,private _tosterService: TosterService) {
    this._promotionService.getPromotions().subscribe(res => this.source.load(res));
  }

  ngOnInit(): void {

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
