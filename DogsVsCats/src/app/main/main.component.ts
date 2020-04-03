import {Component, OnInit} from '@angular/core';
import {ButtonStates} from "./button.states";
import {ProcessComponent} from "./process/process.component";
import {ProcessService} from "./process/process.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  ButtonStates = ButtonStates;
  buttonState : ButtonStates = ButtonStates.Upload;

  constructor(private processService : ProcessService, private router: Router) { }

  ngOnInit(): void {}

  onFileSelect(event) {

    var file : File = event.target.files[0];

    if(file) {
      this.processService.setFile(file);
      this.router.navigate(["/process"])
    }

  }

  onActivate(ref) {

    if(ref.getButtonState) {
      this.buttonState = ref.getButtonState();
    }
  }

}
