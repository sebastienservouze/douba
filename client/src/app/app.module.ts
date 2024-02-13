import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './home/search/search.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		SearchComponent
	],
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		AutoCompleteModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
