import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationNavbarComponent } from './components/application-navbar/application-navbar.component';
import {  MatToolbarModule } from '@angular/material/toolbar';
import {  MatButtonModule } from '@angular/material/button';
import {  MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatabasePageComponent } from './components/database-page/database-page.component';
import { GeneFrequencyPageComponent } from './components/gene-frequency-page/gene-frequency-page.component'
@NgModule({
  declarations: [
    AppComponent,
    ApplicationNavbarComponent,
    DatabasePageComponent,
    GeneFrequencyPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


