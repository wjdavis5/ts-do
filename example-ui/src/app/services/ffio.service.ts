import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Feature} from "../models/features";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class FfioService {
  private baseUrl: string = "https://ts-do.wjd5.workers.dev"
  constructor(private httpClient: HttpClient, private logService: LogService) { }

  GetFeatures(customer: string): Observable<Array<Feature>>{
    const url = `${this.baseUrl}/${customer}`;
    this.logService.AppendLog(`Calling GET: ${url}`);
    return this.httpClient.get<Array<Feature>>(url,{observe: "body"});
  }

  ToggleFeature(feature: Feature): Observable<Feature> {
    const url = `${this.baseUrl}/${feature.name}`;
    this.logService.AppendLog(`Calling POST: ${url}`);
    return this.httpClient.post<Feature>(
      url,{},
      {observe: "body"});
  }
}
