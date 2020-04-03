import {Component, OnInit, Output} from '@angular/core';
import { Router} from "@angular/router";
import {ButtonStates} from "../button.states";
import {ProcessService} from "./process.service";
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient, private processService : ProcessService) { }

  ngOnInit(): void {

    this.processService.getFile().subscribe( (file) => {

      var myReader:FileReader = new FileReader();

      myReader.onloadend = (e) => {

        var encodedFile = myReader.result.toString().split(',')[1];

        var data = {file: encodedFile};

        this.httpClient.post('http://127.0.0.1:5000/', data).subscribe((response) => {
          this.router.navigate(['predict'], { queryParams: {label: response['class']}});
        });

      }

      myReader.readAsDataURL(file);

    } );
  }

  onServerResponse(data) : void {
    console.log("Data recived:");
    console.log(data);

  }

  onNewFileToProcess(file : File) : void {

      console.log("Data Sent:");
      console.log(this.processService);

  }

  getButtonState() : ButtonStates { return ButtonStates.Loading; }

}
