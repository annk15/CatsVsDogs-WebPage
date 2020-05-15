import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BackendResponse} from "./backend-response";

export enum PROGRESS {
    Idle = 0,
    Loading = 1
}

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

    private progress : BehaviorSubject<PROGRESS> = new BehaviorSubject<PROGRESS>(PROGRESS.Idle);
    private labelSubject : BehaviorSubject<BackendResponse> = new BehaviorSubject<BackendResponse>(null);

    constructor(private httpClient: HttpClient) {}

  predict(file) : void {

      var myReader:FileReader = new FileReader();

      myReader.onloadend = (e) => {

        var encodedFile = myReader.result.toString().split(',')[1];

        var data = {file: encodedFile};

        this.httpClient.post('https://CatsVsDogs.asuscomm.com:5000/', data).subscribe((response) => {

            this.labelSubject.next(new BackendResponse({label:response['class'], certainty:response['certainty']}));

        });

        this.progress.next(PROGRESS.Loading);

      }

      myReader.readAsDataURL(file);

    }

    getProgress() : Observable<PROGRESS> { return this.progress.asObservable(); }

    getPrediction() : Observable<BackendResponse> { return this.labelSubject.asObservable(); }

    reset() :void {

        this.progress.next(PROGRESS.Idle);
        this.labelSubject.next(null);

    }

}
