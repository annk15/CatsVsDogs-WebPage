import {Component, OnInit} from '@angular/core';
import {ButtonAttributes} from "../../shared/button-attributes";
import {ProcessService, PROGRESS} from "../../shared/process.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  PROGRESS = PROGRESS;
  progress : PROGRESS = PROGRESS.Idle;

  private processSubscription : Subscription;


  constructor(private processService : ProcessService) { }

  ngOnInit(): void {

      this.processSubscription = this.processService.getProgress().subscribe((progress) => {
        this.progress = progress;
      });

  }

  getButtonAttributes() : ButtonAttributes { return new ButtonAttributes({icon:"assets/camera.svg", route:"/predict", fileDialog: true});}

}
