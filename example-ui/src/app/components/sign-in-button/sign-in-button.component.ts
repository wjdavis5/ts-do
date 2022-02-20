import { Component, OnInit } from '@angular/core';
import {OktaAuthStateService} from "@okta/okta-angular";
import {OktaAuth} from "@okta/okta-auth-js";

@Component({
  selector: 'app-sign-in-button',
  templateUrl: './sign-in-button.component.html',
  styleUrls: ['./sign-in-button.component.css']
})
export class SignInButtonComponent implements OnInit {

  constructor(public authStateService: OktaAuthStateService, public oktaAuth: OktaAuth) { }

  async login() {
    await this.oktaAuth.signInWithRedirect({
      originalUri: '/login/callback'
    });
  }

  ngOnInit(): void {
  }

}
