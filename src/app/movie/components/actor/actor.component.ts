import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieActions } from 'src/app/store/actions';
import { MovieSelector } from 'src/app/store/selectors';
import { ActorAndPhilmography } from '../../movie-model';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  personId:number;

  isStartAnimationShowed: boolean = false;

  isShowPhilmographyClicked:boolean = false;

  actor$: Observable<ActorAndPhilmography> = this.store.select(MovieSelector.selectActor);

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.personId = this.activatedRoute.snapshot.params['actor_id'];
    this.store.dispatch(MovieActions.getActorInfo({personId: this.personId}));
    this.closeStartAnimation();
  }

  closeStartAnimation(){
    setTimeout(()=>{
      this.isStartAnimationShowed = true;
    }, 2000)
  }
  
  showPhilmography(){
    this.isShowPhilmographyClicked = true;
  }

}
