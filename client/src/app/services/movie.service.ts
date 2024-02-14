import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    constructor(private httpClient: HttpClient) {
    }

    getMovieNames(title: string, page?: number): Observable<string[]> {
        let url = `http://localhost:3000/movies/title=${title}`;
        if (page) {
            url += `&page=${page}`;
        }

        return this.httpClient.get<string[]>(url);
    }

}
