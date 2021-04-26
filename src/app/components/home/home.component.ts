import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // paises: any[] = [];

  // constructor( private http: HttpClient ) {
  //   console.log('Constructor del home hecho');
  //   this.http.get('https://restcountries.eu/rest/v2/lang/es').subscribe( (respuesta: any) => {
  //     this.paises = respuesta;
  //     console.log(respuesta);
  //   });
  // }

  nuevasCanciones: any[] = [];
  loading: boolean;

  error: boolean = false;
  mensajeError: string;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;

    this.spotify.getNewReleases().subscribe((data: any) => {
      this.nuevasCanciones = data;
      this.loading = false;
    }, (errorServicio) => {
      this.error = true;
      this.loading = false;
      console.log(errorServicio.error.error.message);
      this.mensajeError = errorServicio.error.error.message;
    });
  }

  ngOnInit(): void {
  }

}
