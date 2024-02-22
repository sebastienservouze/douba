import { Component } from '@angular/core';
import { DownloadService } from './services/download.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private downloadService: DownloadService) { }

}
