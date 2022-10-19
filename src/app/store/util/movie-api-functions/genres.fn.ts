import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Genre } from 'src/app/movie/movie-model';
import { MovieApiService } from 'src/app/movie/services/movie-api.service';

@Injectable({
  providedIn: 'root',
})
export class GenresClass {
  constructor(private movieApiService: MovieApiService) {}

  getGenres(): Observable<Genre[]> {
    return this.movieApiService
      .getMovieGenres()
      .pipe(map((response) => response.genres));
  }
}
