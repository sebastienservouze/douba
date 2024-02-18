import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './home/search/search.component';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './home/results/results.component';
import { ResultComponent } from './home/results/result/result.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		SearchComponent,
		ResultsComponent,
		ResultComponent,
		DownloadsComponent,
		NavigationComponent,
	],
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		InputTextModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
