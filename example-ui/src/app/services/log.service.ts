import { Injectable } from '@angular/core';
import {delay, interval, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  get consoleLog(): string {
    return this.messages.join();
  }
  messages: Array<string> = new Array<string>();
  constructor() {
  }

  AppendLog(log: string){
    this.messages.push(`${log}\r\n`);

    timer(4000).subscribe(value =>{
        this.messages.shift();
      });
  }
}
