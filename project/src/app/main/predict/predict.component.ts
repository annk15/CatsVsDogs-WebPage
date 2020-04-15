import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ProcessService} from "../../shared/process.service";
import {Subscription} from "rxjs";
import {ButtonAttributes} from "../../shared/button-attributes";

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictComponent implements OnInit {

    predictedLabel : string = "none";
    message : string = "";

    private processSubscription : Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private processService : ProcessService
  ) { }

  ngOnInit(): void {

    this.processSubscription = this.processService.getPrediction().subscribe((prediction) => {
        if (prediction != null) { this.setMessage(prediction.certainty, prediction.label) }
        else { this.router.navigate(["/"]) }
    });
  }

  ngOnDestroy() : void {

    this.processSubscription.unsubscribe();
    this.processService.reset();

  }

  getImgPath(): string {

    var path : string;

    if (this.predictedLabel == "cat") {
      path = "assets/cat2.svg"

    } else if (this.predictedLabel == "dog") {
      path = "assets/dog2.svg"

    } else {
      path = "assets/question.svg"

    }

    return path;
  }

  setMessage(certainty : number, label : string) {

      this.predictedLabel = label;

      if(certainty > 0.9) {
          this.message = "I'm very certain, that's a " + label + "!";
      } else if(certainty > 0.7) {
          this.message = "That's a " + label;
      } else if(certainty > 0.5) {
          this.message = "That looks like a " + label;
      } else if(certainty > 0.3) {
          this.message = "Im unsure, but I think that's a " + label;
      } else if(certainty > 0.1) {
          this.message = "Is that a " + label + "!?";
      } else if(certainty > 0.0) {
          this.predictedLabel = "none"
          this.message = "I'm sorry but I have no idea what that is...";
      }

  }

  getButtonAttributes() : ButtonAttributes { return new ButtonAttributes({text:"Return", route:"/"});}

}
