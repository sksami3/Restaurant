import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.scss']
})
export class EditDishComponent implements OnInit {

  constructor(@Inject('BaseURL') private BaseURL,
  public dialogRef: MatDialogRef<EditDishComponent>) { }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close();
  }

}
