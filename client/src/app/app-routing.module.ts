import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DownloadsComponent } from './downloads/downloads.component';

const routes: Routes = [
  { path: 'recherche', component: HomeComponent },
  { path: 'telechargements', component: DownloadsComponent },
  { path: '**', redirectTo: 'recherche' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
