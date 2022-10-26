import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { MovieActions } from 'src/app/store/actions';
import { MovieSelector } from 'src/app/store/selectors';
import { SideBarCollectionDisplay } from '../../movie-model';

@Component({
  selector: 'app-collection-slider',
  templateUrl: './collection-slider.component.html',
  styleUrls: ['./collection-slider.component.css'],
})
export class CollectionSliderComponent implements OnInit {
  collections$: Observable<SideBarCollectionDisplay[]> = this.store
    .select(MovieSelector.selectSideBarCollections)
    .pipe(
      map((collections) => {
        return collections.filter((_, index) => index < 10);
      })
    );

  sliderPosition: number;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(MovieActions.getSideBarCollection());
  }

  changeSlide(slideIndex: number) {
    this.sliderPosition = slideIndex;
  }

  goToCollectionDetail(collectionId:number){
    this.router.navigate(['movie-list/collection/'+collectionId]);
  }

}
