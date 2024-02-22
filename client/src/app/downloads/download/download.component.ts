import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Download } from '../../../../../common/models/download.model';

@Component({
	selector: 'app-download',
	templateUrl: './download.component.html',
	styleUrls: ['./download.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DownloadComponent {

	@Input() download?: Download;
}
