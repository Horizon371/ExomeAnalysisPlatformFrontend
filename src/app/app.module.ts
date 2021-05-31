import { environment } from './../environments/environment.prod';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationNavbarComponent } from './components/application-navbar/application-navbar.component';
import {  MatToolbarModule } from '@angular/material/toolbar';
import {  MatButtonModule } from '@angular/material/button';
import {  MatInputModule } from '@angular/material/input';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatabasePageComponent } from './components/database-page/database-page.component';
import { GeneFrequencyPageComponent } from './components/gene-frequency-page/gene-frequency-page.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component'
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import { FilterExomesComponentComponent } from './components/filter-exomes-component/filter-exomes-component.component';
import { FormsModule } from '@angular/forms';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationNavbarComponent,
    DatabasePageComponent,
    GeneFrequencyPageComponent,
    UploadFileComponent,
    FilterExomesComponentComponent,
    DetailPageComponent,
    DeletePopupComponent,
  ],
  imports: [
    MatSelectModule,
    MatOptionModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MaterialFileInputModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


