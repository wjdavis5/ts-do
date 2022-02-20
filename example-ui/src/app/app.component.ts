import {Component, Inject} from '@angular/core';
import {OktaAuthStateService, OKTA_AUTH} from "@okta/okta-angular";
import {OktaAuth} from "@okta/okta-auth-js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-material-auth-ui';
  constructor(public authStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  async login() {
    await this.oktaAuth.signInWithRedirect({
      originalUri: '/ffio'
    });
  }
}
