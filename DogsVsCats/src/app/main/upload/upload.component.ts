import {Component, OnInit} from '@angular/core';
import {ButtonAttributes} from "../../shared/button-attributes";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  static getButtonAttributes() : ButtonAttributes { return new ButtonAttributes({text:"Upload", route:"/predict"});}

}
