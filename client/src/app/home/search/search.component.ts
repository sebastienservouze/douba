import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject, switchMap } from "rxjs";
import { YggTorrentService } from 'src/app/services/ygg-torrent.service';
import { Torrent } from '../../../../../common/models/torrent.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    input!: string;
    suggestions!: Torrent[];
    search$: Subject<string> = new Subject<string>();

    constructor(private yggTorrentService: YggTorrentService) {
    }

    ngOnInit(): void {
        this.search$
            .pipe(
                debounceTime(100),
                switchMap((input: string) => this.yggTorrentService.findTorrents(input))
            )
            .subscribe((torrents: Torrent[]) => {
                this.suggestions = torrents;
            }
            );
    }

}
