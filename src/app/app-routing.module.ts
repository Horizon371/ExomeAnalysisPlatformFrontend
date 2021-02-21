import { GeneFrequencyPageComponent } from './components/gene-frequency-page/gene-frequency-page.component';
import { DatabasePageComponent } from './components/database-page/database-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'database-page', component: DatabasePageComponent },
  { path: 'frequency-page', component: GeneFrequencyPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
