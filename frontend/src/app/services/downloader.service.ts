import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DownloaderModel } from '../models/downloader.model';

@Injectable({
    providedIn: 'root'
})
export class DownloaderService {

  private readonly url = 'http://localhost:5000/api/core/sound/download';

  constructor(private http: HttpClient) { }

  download(data: DownloaderModel): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<Blob>(this.url, data, {
      headers: headers,
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }
}
