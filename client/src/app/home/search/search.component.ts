import {Component, OnInit} from '@angular/core';
import {debounceTime, Subject, switchMap} from "rxjs";
import {MovieService} from "../../services/movie.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    input!: string;
    suggestions!: string[];
    search$: Subject<string> = new Subject<string>();

    constructor(private movieService: MovieService) {
    }

    ngOnInit(): void {
        this.search$
            .pipe(
                debounceTime(100),
                switchMap((input: string) => this.movieService.getMovieNames(input))
            )
            .subscribe((suggestions: string[]) => {
                this.suggestions = suggestions;
            }
        );
    }

}
