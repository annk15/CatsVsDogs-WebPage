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

    private predictedLabel : string = "none";
    predictedCertainty : number = 0.0;
    private processSubscription : Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private processService : ProcessService
  ) { }

  ngOnInit(): void {

    this.processSubscription = this.processService.getPrediction().subscribe((prediction) => {

        if (prediction != null) {
            this.predictedLabel = prediction.label;
            this.predictedCertainty = prediction.certainty;
        }
    });

  }

  ngOnDestroy() : void {

    this.processSubscription.unsubscribe();
    this.processService.reset();

  }

  getImgPath(): string {

    var path : string;

    if (this.predictedLabel == "cat") {
      path = "assets/cat.svg"

    } else if (this.predictedLabel == "dog") {
      path = "assets/dog.svg"

    } else {
      path = "assets/question.svg"

    }

    return path;
  }

  getButtonAttributes() : ButtonAttributes { return new ButtonAttributes({text:"Return", route:"/"});}

}
