import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { LeaderService } from 'src/app/services/leader.service';
import { TosterService } from 'src/app/services/toster.service';

@Component({
  selector: 'app-show-leadership',
  templateUrl: './show-leadership.component.html',
  styleUrls: ['./show-leadership.component.scss']
})
export class ShowLeadershipComponent implements OnInit {
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
      designation: {
        title: 'Designation',
        type: 'string',
      },
      abbr: {
        title: 'Abbr',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
    },
    };

  source: LocalDataSource = new LocalDataSource();
  constructor(private _leaderService: LeaderService,private _tosterService: TosterService) {
    this._leaderService.getLeaders().subscribe(res => {console.log(res);this.source.load(res);});
  }

  ngOnInit(): void {

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      new Promise((resolve, reject) => {
        this._leaderService.deleteLeader(event.data.id)
          .subscribe(res => resolve(res), err => reject(err))
      }).then(() => {
        event.confirm.resolve();
        this._tosterService.showToast('success', 'Congratulations!!', 'Deleted Successfully');
      }).catch(err =>
        {console.log(err);
        this._tosterService.showToast('danger', 'Error!!', err.message);}
      );
      
    } else {
      event.confirm.reject();
    }
  }
}


