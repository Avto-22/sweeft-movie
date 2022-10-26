import { Injectable } from "@angular/core";
import { MovieApiService } from "src/app/movie/services/movie-api.service";

@Injectable({
    providedIn: 'root'
})
export class CollectionDetail{

    constructor(
        private movieApiService: MovieApiService
    ){}

    getCollectionDetail(colectionId:number){
        return this.movieApiService.getCollection(colectionId)
    }
}