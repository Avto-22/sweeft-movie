import { Injectable } from '@angular/core';
import { catchError, forkJoin, Observable, of, switchMap } from 'rxjs';
import { SideBarCollectionDisplay } from 'src/app/movie/movie-model';
import { MovieApiService } from 'src/app/movie/services/movie-api.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarCollections {
  constructor(private movieApiService: MovieApiService) {}

  getSideBarCollection(collecctionsIdArray: number[]) {
    let collectionArray: Observable<SideBarCollectionDisplay>[] = [];
    let newCollection: Observable<SideBarCollectionDisplay>;
    collecctionsIdArray.forEach((collection_id) => {
      newCollection = this.movieApiService.getCollection(collection_id).pipe(
        switchMap((collection) =>
          of({
            collectionId: collection.id,
            poster: collection.poster_path,
            name: collection.name,
            movie_count: collection.parts.length,
            backdrop_path: collection.backdrop_path
          })
        ),
        catchError(() =>
          of({
            collectionId: undefined,
            poster: undefined,
            name: undefined,
            movie_count: undefined,
            backdrop_path: undefined
          })
        )
      );
      collectionArray = [newCollection, ...collectionArray];
    });

    return forkJoin(collectionArray);
  }
}
