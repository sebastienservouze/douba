import { TestBed } from '@angular/core/testing';

import { YggTorrentService } from './ygg-torrent.service';

describe('YggTorrentService', () => {
  let service: YggTorrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YggTorrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
