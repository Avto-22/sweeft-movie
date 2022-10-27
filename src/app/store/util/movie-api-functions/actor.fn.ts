import { Injectable } from "@angular/core";
import { mergeMap, Observable, of } from "rxjs";
import { ActorAndPhilmography, Philmography } from "src/app/movie/movie-model";
import { MovieApiService } from "src/app/movie/services/movie-api.service";

@Injectable({
    providedIn: 'root'
})
export class Actor{

    constructor(
        private moveiApiService: MovieApiService,
    ){}

    getActorInfo(personId:number): Observable<ActorAndPhilmography>{
        return this.moveiApiService.getActor(personId).pipe(
            mergeMap(actor => {
                return this.moveiApiService.getActorPhilmography(personId).pipe(
                    mergeMap(res => {
                        return of({
                            ...actor,
                           movies: [...res.cast, ...res.crew]
                        });
                    }),
                );
            })
        );
    }

}