import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TorrentComponent } from './torrent/torrent.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':link', component: TorrentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
