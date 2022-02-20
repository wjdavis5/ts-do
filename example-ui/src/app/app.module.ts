import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from "./angular-material/angular-material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FfioComponent } from './components/ffio/ffio.component';
import {HttpClientModule} from "@angular/common/http";
import { AuthComponent } from './components/auth/auth.component';
import {
  OKTA_CONFIG,
  OktaAuthModule,
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import {environment} from "../environments/environment";
import { SignInButtonComponent } from './components/sign-in-button/sign-in-button.component';

const oktaAuth = new OktaAuth({
  clientId: environment.oktaConfig.clientId,
  issuer: environment.oktaConfig.issuer,
  redirectUri: environment.oktaConfig.redirectUri,
  scopes: environment.oktaConfig.scopes,
  pkce: true
});
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    FfioComponent,
    AuthComponent,
    SignInButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: { oktaAuth } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
