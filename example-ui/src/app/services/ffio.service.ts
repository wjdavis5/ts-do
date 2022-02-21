import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Feature} from "../models/features";
import {LogService} from "./log.service";
import {OktaAuth} from "@okta/okta-auth-js";
import {OKTA_AUTH} from "@okta/okta-angular";
import {FFIO_CONFIG, FfioConfig} from "../models/ffio-config";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class FfioService {


  private baseUrl: string;
  private accessToken: string | undefined;
  private headers: HttpHeaders;
  constructor(
    private httpClient: HttpClient,
    private logService: LogService,
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {
    this.baseUrl = environment.ffioConfig.baseUrl;
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
