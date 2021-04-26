import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) { 
    console.log('Spotify service ready');
  }

  getQuery ( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCa1JTWElIohGv34wpfKaGDty-jeOXcxojc10TXzwsWvHOhvVvmfe3KD73WuFqJ2Itb1IJFiNZuSqpIvl4'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases')
              .pipe( map( data => data['albums'].items ));
  }

  getArtistas( termino: string ) {
    return this.getQuery(`search?q=${ termino }&type=artist`)
              .pipe( map( data => data['artists'].items ));
  }

  getArtista( id: string ) {
    return this.getQuery(`artists/${ id }`);
              // .pipe( map( data => data['artists'].items ));
  }
// https://api.spotify.com/v1/artists/{id}/top-tracks

  getTopTracks( id: string ) {
    return this.getQuery(`artists/${ id }/top-tracks?country=ES`)
              .pipe( map( data => data['tracks'] ));
  }
  
}
