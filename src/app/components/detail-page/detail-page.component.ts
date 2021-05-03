import {DeletePopupComponent} from './../delete-popup/delete-popup.component';
import {ExomeFileService} from './../../services/file/file-service.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {DataAnalysisService} from '../../services/data-analysis/data-analysis.service';
import {GeneEntry} from '../../entities/response/geneEntry';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit, AfterViewInit {

  id: number;
  name = 'Exome name';
  cosanguinity = '...';
  geneEntries = Array();
  dataSource: MatTableDataSource<GeneEntry>;
  displayedColumns: string[] = ['Gene Name', 'Chromosome', 'Position'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private exomeService: ExomeFileService,
    private dataAnalysisService: DataAnalysisService,
    public dialog: MatDialog,
    private location: Location
  ) {
    this.dataSource = new MatTableDataSource([]);
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
  }

  ngOnInit(): void {
    this.getExomeName();
    this.getCosangunity();
    this.getIncidentialDiscoveries();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.geneEntries);
    this.dataSource.paginator = this.paginator;
  }

  getExomeName() {
    this.exomeService.getExome(this.id).subscribe(exome => {
        this.name = exome.name;
      },
      error => {
        this.router.navigate(['/database-page'], {replaceUrl: true});
      });
  }

  getCosangunity() {
    this.dataAnalysisService.getCosanguinity(this.id).subscribe(
      success => {
        this.cosanguinity = success;
        console.log(this.cosanguinity);
      },
      error => {
      }
    );
  }

  getIncidentialDiscoveries() {
    this.dataAnalysisService.getIncidentialDiscoveries(this.id).subscribe(
      entries => {
        this.geneEntries = entries;
      },
      error => {
      }
    );
  }

  downloadExomeFile() {
    this.exomeService.downloadExomeFile(this.id).subscribe(file => {
      console.log(file);
      this.downloadFile(file);
    });
  }

  downloadFile(data: any) {
    const downloadURL = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = this.name;
    link.click();
  }

  openDeleteDialog() {
    const deleteExomeDialog = this.dialog.open(DeletePopupComponent, {
      width: '30%',
      data: {name: this.name}
    });
    deleteExomeDialog.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteExome();
      }
    });
  }

  deleteExome() {
    this.exomeService.delete(this.id).subscribe(
      success => {
        console.log('deleted');
        this.location.back();
      },
      err => {
      }
    );
  }
}
