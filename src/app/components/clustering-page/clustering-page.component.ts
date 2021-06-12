import {Component, OnInit} from '@angular/core';
import {DataAnalysisService} from '../../services/data-analysis/data-analysis.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-clustering-page',
  templateUrl: './clustering-page.component.html',
  styleUrls: ['./clustering-page.component.css']
})
export class ClusteringPageComponent implements OnInit {

  public imageUrl: any;
  public buttonDisabled = false;

  constructor(private dataAnalysisService: DataAnalysisService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getImage();
  }

  private getImage() {
    this.dataAnalysisService.getClusterFigure().subscribe(blob => {
      const unsafeImageUrl = URL.createObjectURL(blob);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    });
  }

  public runClustering() {
    this.buttonDisabled = true;
    this.dataAnalysisService.runClustering().subscribe(success => {
      this.getImage();
      this.buttonDisabled = false;
    }, error => {
      this.getImage();
      this.buttonDisabled = false;
    });
  }
}
