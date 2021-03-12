import { ExomeFileService } from '../../services/file/file-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  file: File = null;

  constructor(private exomeFileService : ExomeFileService) { }

  ngOnInit(): void {
  }
  
  fileSelected(event){
    this.file = event.target.files[0]; 
    console.log(this.file);
  }

  onFileSubmit(){
    this.exomeFileService.upload(this.file).subscribe(event => {
    
    },
    err => {

    });
  }
}
