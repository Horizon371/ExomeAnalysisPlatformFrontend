import {DeletePopupComponent} from './../delete-popup/delete-popup.component';
import {ExomeFileService} from './../../services/file/file-service.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {DataAnalysisService} from '../../services/data-analysis/data-analysis.service';
import {GeneEntry} from '../../entities/response/geneEntry';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit, AfterViewInit {

  id: number;
  chromosomeFilter = 'None';
  geneNameFilter = 'None';


  name = 'Exome name';
  displayedColumns: string[] = ['Gene Name', 'Chromosome', 'Position'];
  defaultItemsPerPage = 6;
  cosanguinity = '';
  geneEntries: GeneEntry[] = Array();
  geneEntriesFiltered: GeneEntry[] = Array();
  geneEntriesSlice: any[];
  geneNames: string[] = Array('None');
  chromosomes: string[] = Array('None');

  dataSource: MatTableDataSource<GeneEntry>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  elementsLoaded = false;
  cosanguinityLoaded = false;
  isTableHidden = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private exomeService: ExomeFileService,
    private dataAnalysisService: DataAnalysisService,
    public dialog: MatDialog,
    private location: Location
  ) {
    this.dataSource = new MatTableDataSource([]);
    this.routePage();
  }

  private routePage() {
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
        this.cosanguinityLoaded = true;
        this.cosanguinity = success;
      },
      error => {
        this.cosanguinityLoaded = true;
        this.cosanguinity = 'Error';
      }
    );
  }

  getIncidentialDiscoveries() {
    this.dataAnalysisService.getIncidentialDiscoveries(this.id).subscribe(
      incidentialDiscoveries => {
        this.geneEntries = incidentialDiscoveries.geneEntries;
        this.geneEntriesFiltered = incidentialDiscoveries.geneEntries;
        this.dataSource.data = this.geneEntriesFiltered.slice(0, this.defaultItemsPerPage);
        this.geneNames = incidentialDiscoveries.geneNames;
        this.geneNames.push('None');
        this.chromosomes = incidentialDiscoveries.chromosomes;
        this.chromosomes.push('None');
        this.elementsLoaded = true;
        if (this.geneEntries.length === 0) {
          this.isTableHidden = true;
        }
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

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.setSlicedData(startIndex, endIndex);
  }

  private filterItems() {
    if (this.geneNameFilter === 'None' && this.chromosomeFilter === 'None') {
      this.dataSource.data = this.geneEntries;
      this.geneEntriesFiltered = this.geneEntries;
    } else {
      this.geneEntriesFiltered = this.geneEntries;
      if (this.geneNameFilter !== 'None') {
        this.filterByGeneName();
      }
      if (this.chromosomeFilter !== 'None') {
        this.filterByChromosome();
      }
      this.paginator.pageIndex = 0;
    }
    this.isTableHidden = this.geneEntriesFiltered.length === 0;
    this.setSlicedData(0, this.paginator.pageSize);
  }

  private filterByGeneName() {
    this.geneEntriesFiltered = this.geneEntriesFiltered.filter(entry => {
      return entry.geneName === this.geneNameFilter;
    });
  }

  private filterByChromosome() {
    this.geneEntriesFiltered = this.geneEntriesFiltered.filter(entry => {
      return entry.chromosome === this.chromosomeFilter;
    });
  }

  private setSlicedData(startIndex, endIndex) {
    if (endIndex > this.geneEntriesFiltered.length) {
      endIndex = this.geneEntriesFiltered.length;
    }
    this.dataSource.data = this.geneEntriesFiltered.slice(startIndex, endIndex);
  }

  onGeneNameSelected(selectedGeneName) {
    this.geneNameFilter = selectedGeneName;
    this.filterItems();
  }


  onChromosomeSelected(selectedChromosome) {
    this.chromosomeFilter = selectedChromosome;
    this.filterItems();
  }
}
