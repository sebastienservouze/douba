import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	input!: string;
	suggestions!: string[];

	constructor() { }

	ngOnInit(): void {
	}

	search(event: any): void {
		this.suggestions = ['Pamela Rose', 'Le soldat Rayan'];
	}

}
