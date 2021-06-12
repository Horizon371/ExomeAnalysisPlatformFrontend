import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {DataAnalysisService} from '../../services/data-analysis/data-analysis.service';
import {GeneFrequencyEntry} from '../../entities/response/geneFrequencyEntry';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {GeneEntry} from '../../entities/response/geneEntry';

@Component({
  selector: 'app-gene-frequency-page',
  templateUrl: './gene-frequency-page.component.html',
  styleUrls: ['./gene-frequency-page.component.css']
})
export class GeneFrequencyPageComponent implements OnInit {

  geneInput = '';
  geneVariationFrequencies: GeneFrequencyEntry[] = [
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
    {position: 111, chromosome: 'chr2', frequency: 200},
  ];

  displayedColumns: string[] = ['frequency', 'chromosome', 'position'];
  geneVariationsLoaded = false;
  geneVariationsLoading = false;
  centerMessageText = 'Here will appear a table for the chosen gene';
  centerTextNotVisible = false;
  selectedGeneSearch = '';
  dataSource: MatTableDataSource<GeneFrequencyEntry>;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dataAnalysisService: DataAnalysisService,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
  }

  onGeneSearch() {
    this.geneVariationsLoaded = false;
    this.geneVariationsLoading = true;
    this.centerTextNotVisible = true;
    this.selectedGeneSearch = this.geneInput.toUpperCase();
    if (this.geneInput === '' || this.geneInput === ' '){
      this.selectedGeneSearch = 'No Gene';
    }
    this.dataAnalysisService.getGeneFrequency(this.selectedGeneSearch).subscribe(
      frequenciesResp => {
        const frequencies = frequenciesResp.sort((a, b) => this.compare(Number(a.frequency), Number(b.frequency)));
        this.geneVariationFrequencies = frequencies;
        if (this.geneVariationFrequencies.length === 0) {
          this.centerTextNotVisible = false;
          this.centerMessageText = 'There are no gene variants corresponding to the gene ' + this.selectedGeneSearch;
        } else {
          this.geneVariationsLoaded = true;
          this.dataSource = new MatTableDataSource(this.geneVariationFrequencies.slice(0, 8));
        }
        this.geneVariationsLoading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  public compare(a: number, b: number) {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.setSlicedData(startIndex, endIndex);
  }

  private setSlicedData(startIndex, endIndex) {
    if (endIndex > this.geneVariationFrequencies.length) {
      endIndex = this.geneVariationFrequencies.length;
    }
    this.dataSource.data = this.geneVariationFrequencies.slice(startIndex, endIndex);
  }
}
