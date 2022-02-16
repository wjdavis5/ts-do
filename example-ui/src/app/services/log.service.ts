import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  consoleLog: string = "";
  constructor() { }

  AppendLog(log: string){
    this.consoleLog += `${log}\r\n`;

  }
}
