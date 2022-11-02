import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { MovieActions } from 'src/app/store/actions';
import { MovieSelector } from 'src/app/store/selectors';
import { ActorAndPhilmography } from '../../movie-model';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit, OnDestroy {
  personId: number;

  isStartAnimationShowed: boolean = false;

  isShowPhilmographyClicked: boolean = false;

  @ViewChild('form', { static: false }) form: FormGroup;

  unsusbscribe$: Subject<number> = new Subject();

  actor$: Observable<ActorAndPhilmography> = this.store.select(
    MovieSelector.selectActor
  );

  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  ngOnDestroy(): void {
    this.unsusbscribe$.next(-1);
    this.unsusbscribe$.unsubscribe();
  }

  ngOnInit(): void {
    this.personId = this.activatedRoute.snapshot.params['actor_id'];
    this.store.dispatch(MovieActions.getActorInfo({ personId: this.personId }));
    this.closeStartAnimation();
  }

  closeStartAnimation() {
    setTimeout(() => {
      this.isStartAnimationShowed = true;
    }, 2000);
  }

  startSearch() {
    this.form?.valueChanges
      .pipe(takeUntil(this.unsusbscribe$))
      .subscribe((value) => {
        this.search(value.search);
      });
  }

  search(movieName: string) {
    if (movieName) {
      this.actor$ = this.store.select(MovieSelector.selectActor).pipe(
        map((res) => {
          return {
            ...res,
            movies: res.movies.filter((movie) =>
              movie.title.toLowerCase().replace( /\s/g, '').includes(movieName.toLowerCase().replace( /\s/g, ''))
            ),
          };
        })
      );
    } else {
      this.actor$ = this.store.select(MovieSelector.selectActor);
    }
  }

  showPhilmography() {
    this.isShowPhilmographyClicked = true;
  }
}
