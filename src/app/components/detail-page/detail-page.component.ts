import { DeletePopupComponent } from './../delete-popup/delete-popup.component';
import { ExomeInterface } from '../../entities/interfaces/exomeInterface';
import { ExomeFileService } from './../../services/file/file-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  id: number;
  name: string = 'Exome name';

  constructor(
    private route: ActivatedRoute,
    private exomeService: ExomeFileService,
    public dialog: MatDialog,
    private _location: Location
  ){
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
    });
  }

  ngOnInit(): void {
    this.exomeService.getExome(this.id).subscribe(exome => {
      this.name = exome.name;
    })
  }

  downloadExomeFile() {
    this.exomeService.downloadExomeFile(this.id).subscribe(file => {
      console.log(file)
      this.downloadFile(file)
    })
  }

  downloadFile(data: any) {
    var downloadURL = window.URL.createObjectURL(data);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = this.name;
    link.click();
  }

  openDeleteDialog() {
    const deleteExomeDialog = this.dialog.open(DeletePopupComponent, {
      width: "30%",
      data: { name: this.name }
    });
    deleteExomeDialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        this.deleteExome()
      }
    });
  }

  deleteExome() {
    this.exomeService.delete(this.id).subscribe(
      success => {
        console.log("deleted")
      this._location.back();
      },
      err => { }
    );
  }
}
