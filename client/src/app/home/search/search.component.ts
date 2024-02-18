import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { YggTorrentService } from 'src/app/services/ygg-torrent.service';
import { TorrentResult } from '../../../../../common/models/torrent-result.model';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Output() searched = new EventEmitter<TorrentResult[]>();

    search: FormControl;
    loading: boolean = false;

    constructor(private yggTorrentService: YggTorrentService) {
        this.search = new FormControl();
    }

    ngOnInit(): void {
        this.search.valueChanges.pipe(
            tap(() => this.loading = true),
            debounceTime(200),
            switchMap((value: string) => this.yggTorrentService.find(value))
        ).subscribe((torrents: TorrentResult[]) => {
            this.loading = false;
            this.searched.emit(torrents);
        });
    }

}
