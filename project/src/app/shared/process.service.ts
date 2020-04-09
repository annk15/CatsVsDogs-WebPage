import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  public static initialValue : string = "none";
  private labelSubject : BehaviorSubject<string> = new BehaviorSubject<string>(ProcessService.initialValue);

  constructor(private httpClient: HttpClient) {}

  predictFileLabel(file) : void {

      var myReader:FileReader = new FileReader();

      myReader.onloadend = (e) => {

        var encodedFile = myReader.result.toString().split(',')[1];

        var data = {file: encodedFile};

        this.httpClient.post('http://192.168.1.143:5000/', data).subscribe((response) => {

          this.labelSubject.next(response['class']);

        });

      }

      myReader.readAsDataURL(file);

    }

  getPredictedLabel() : Observable<string> { return this.labelSubject.asObservable(); }

  reset() :void { this.labelSubject.next(ProcessService.initialValue); }

}
