import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import {FfioComponent} from "./components/ffio/ffio.component";
import {OktaAuthGuard, OktaCallbackComponent} from "@okta/okta-angular";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'ffio' },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'ffio', component: FfioComponent,canActivate: [ OktaAuthGuard ] },
  { path: 'login/callback', component: OktaCallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
