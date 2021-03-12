import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileComponent } from '../upload-file/upload-file.component'
import { ExomeFileService } from '../../services/file/file-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { ExomeInterface } from '../../entities/exomeInterface';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  providers: [UploadFileComponent],
  selector: 'app-database-page',
  templateUrl: './database-page.component.html',
  styleUrls: ['./database-page.component.css']
})
export class DatabasePageComponent implements OnInit {

  exomes: MatTableDataSource<ExomeInterface>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  savedExomes: Array<ExomeInterface>;
  displayedColumns: string[] = ['id', 'name'];

  constructor(public dialog: MatDialog, private exomeFileService: ExomeFileService) { }

  ngOnInit(): void {
    this.getAllExomesPaginated(0, 10);
  }

  getAllExomesPaginated(pageIndex: number, pageSize: number){
    this.exomeFileService.getFilesPaginated(pageIndex, pageSize).subscribe(
      response => {
        this.paginator.length = response.totalNumberOfElements;
        this.savedExomes = response.exomes
        this.exomes = new MatTableDataSource<ExomeInterface>(this.savedExomes);
        console.log(response);
      },
      error => {

      }
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploadFileComponent, {})

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onPageChanged(event){
    console.log(this.paginator.pageIndex, this.paginator.pageSize, event)
    this.getAllExomesPaginated(this.paginator.pageIndex, this.paginator.pageSize)
  }
}
