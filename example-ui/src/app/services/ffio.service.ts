import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Feature} from "../models/features";
import {LogService} from "./log.service";
import {OktaAuth} from "@okta/okta-auth-js";
import {OKTA_AUTH} from "@okta/okta-angular";

@Injectable({
  providedIn: 'root'
})
export class FfioService {
//  private baseUrl: string = "https://ts-do.wjd5.workers.dev"
  private baseUrl: string = "http://127.0.0.1:8787"
  private accessToken: string | undefined;
  private headers: HttpHeaders;
  constructor(private httpClient: HttpClient, private logService: LogService,@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {
    this.accessToken = this.oktaAuth.getAccessToken();
    this.headers = new HttpHeaders(
     {'Authorization': `Bearer ${this.accessToken}`}
    );

  }

  GetFeatures(customer: string): Observable<Array<Feature>>{
    const url = `${this.baseUrl}/${customer}`;
    this.logService.AppendLog(`Calling GET: ${url}`);
    return this.httpClient.get<Array<Feature>>(url,{observe: "body",headers:this.headers});
  }

  ToggleFeature(feature: Feature): Observable<Feature> {
    const url = `${this.baseUrl}/${feature.name}`;
    this.logService.AppendLog(`Calling POST: ${url}`);
    return this.httpClient.post<Feature>(
      url,{},
      {observe: "body", headers: this.headers});
  }
}
