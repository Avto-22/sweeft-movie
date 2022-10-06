import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Route[] = [
 {
    path: '',
    component: AuthComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }