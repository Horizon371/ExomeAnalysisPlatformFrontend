import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogData } from 'src/app/entities/componentComm/deleteDialogData';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit {

  fileName: string;
  delete: boolean = false;
  isDeleteButtonInactive: boolean = true;

  constructor(public dialogRef: MatDialogRef<DeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) {
    var nameString = data.name;
    if(nameString.length >= 25){
      nameString = nameString.substring(0, 25) + "...";
    }
    this.fileName = nameString;
  }

  onTextChanged(event){
    const text = event.target.value;
    if(text == "delete " + this.fileName){
      this.isDeleteButtonInactive = false;
    }
    else{
      this.isDeleteButtonInactive = true;
    }
  }

  ngOnInit(): void {
  }

}
