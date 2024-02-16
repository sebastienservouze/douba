import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { YggTorrentService } from 'src/app/services/ygg-torrent.service';
import { Torrent } from '../../../../../common/models/torrent.model';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Output() searched = new EventEmitter<Torrent[]>();

    search: FormControl;

    constructor(private yggTorrentService: YggTorrentService) {
        this.search = new FormControl();
    }

    ngOnInit(): void {
        this.search.valueChanges.pipe(
            debounceTime(100),
            switchMap((value: string) => this.yggTorrentService.findTorrents(value))
        ).subscribe((torrents: Torrent[]) => {
            this.searched.emit(torrents);
        });
    }

}
