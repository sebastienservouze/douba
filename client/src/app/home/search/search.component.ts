import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { YggTorrentService } from 'src/app/services/ygg-torrent.service';
import { TorrentResult } from '../../../../../common/models/torrent-result.model';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Output() searched = new EventEmitter<TorrentResult[]>();

    search: FormControl;

    constructor(private yggTorrentService: YggTorrentService) {
        this.search = new FormControl();
    }

    ngOnInit(): void {
        this.search.valueChanges.pipe(
            debounceTime(200),
            switchMap((value: string) => this.yggTorrentService.findTorrents(value))
        ).subscribe((torrents: TorrentResult[]) => {
            this.searched.emit(torrents);
        });
    }

}
