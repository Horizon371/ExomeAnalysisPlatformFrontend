import {ExomeFileService} from '../../services/file/file-service.service';
import {Component, OnInit} from '@angular/core';
import {MatSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  file: File = null;
  selectedSwitch = true;
  isFileUploaded = false;

  constructor(private exomeFileService: ExomeFileService) {
  }

  ngOnInit(): void {
  }

  fileSelected(event) {
    this.file = event.target.files[0];
    this.selectedSwitch = this.file === undefined;
    console.log(this.file);
  }

  onFileSubmit() {
    this.isFileUploaded = true;
    console.log(this.isFileUploaded);
    this.exomeFileService.upload(this.file).subscribe(event => {
        this.isFileUploaded = false;
        this.file = undefined;
        this.selectedSwitch = true;
      },
      err => {
        this.isFileUploaded = false;
        this.file = undefined;
        this.selectedSwitch = true;
      });
  }
}
