import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { ExomeFileService } from '../../services/file/file-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { ExomeInterface } from '../../entities/interfaces/exomeInterface';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  providers: [UploadFileComponent],
  selector: 'app-database-page',
  templateUrl: './database-page.component.html',
  styleUrls: ['./database-page.component.css']
})
export class DatabasePageComponent implements AfterViewInit {

  exomes: MatTableDataSource<ExomeInterface>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  savedExomes: Array<ExomeInterface>;
  displayedColumns: string[] = ['id', 'name'];
  nameFilter = '';

  constructor(public dialog: MatDialog, private exomeFileService: ExomeFileService, private router: Router) { }

  ngAfterViewInit(): void {
    this.getAllExomesPaginated(0, this.paginator.pageSize);
  }

  getAllExomesPaginated(pageIndex: number, pageSize: number) {
    this.exomeFileService.getFilesPaginated(pageIndex, pageSize, this.nameFilter).subscribe(
      response => {
        this.paginator.length = response.totalNumberOfElements;
        this.savedExomes = response.exomes;
        this.exomes = new MatTableDataSource<ExomeInterface>(this.savedExomes);
        console.log(response);
      },
      error => {

      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploadFileComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onPageChanged(event) {
    console.log(this.paginator.pageIndex, this.paginator.pageSize, event);
    this.getAllExomesPaginated(this.paginator.pageIndex, this.paginator.pageSize);
  }

  getExomesFilteredByName(event) {
    console.log(event);
    this.nameFilter = event;
    this.paginator.pageIndex = 0;
    this.getAllExomesPaginated(this.paginator.pageIndex, this.paginator.pageSize);
  }

  onTableRowClick(row) {
    console.log(row);
    this.router.navigate(['/detail-page'], { queryParams: { id: row.id }});
  }
}
