import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { GeneFrequencyPageComponent } from './components/gene-frequency-page/gene-frequency-page.component';
import { DatabasePageComponent } from './components/database-page/database-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClusteringPageComponent} from './components/clustering-page/clustering-page.component';

const routes: Routes = [
  { path: '', component: DatabasePageComponent },
  { path: 'database-page', component: DatabasePageComponent },
  { path: 'frequency-page', component: GeneFrequencyPageComponent },
  { path: 'detail-page', component: DetailPageComponent },
  { path: 'clustering-page', component: ClusteringPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
