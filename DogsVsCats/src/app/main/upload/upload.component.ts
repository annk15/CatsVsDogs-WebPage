import {Component, OnInit} from '@angular/core';
import {ButtonStates} from "../button.states";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  getButtonState() : ButtonStates { return ButtonStates.Upload; }

}
