import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  private fileSubject : BehaviorSubject<File> = new BehaviorSubject<File>(null);

  constructor() { }

  setFile(file) : void { this.fileSubject.next(file); }
  getFile() : Observable<File> { return this.fileSubject.asObservable(); }

}
