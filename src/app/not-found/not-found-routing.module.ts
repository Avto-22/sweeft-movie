import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Route} from '@angular/router';
import { NotFoundComponent } from './not-found.component';

const routes: Route[] = [
  {
    path: '',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }