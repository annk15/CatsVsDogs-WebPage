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

  private predictedLabel : string;
  private processSubscription : Subscription;

  private static assetsPath : string = "../../../assets/";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private processService : ProcessService
  ) { }

  ngOnInit(): void {

    this.processSubscription = this.processService.getPredictedLabel().subscribe((label) => {
      this.predictedLabel = label;
    });

  }

  ngOnDestroy() : void {

    this.processSubscription.unsubscribe();
    this.processService.reset();

  }

  getImgPath(): string {

    var path : string;

    if (this.predictedLabel == "cat") {
      path = PredictComponent.assetsPath + "cat.svg"

    } else if (this.predictedLabel == "dog") {
      path = PredictComponent.assetsPath + "dog.svg"

    } else {
      path = PredictComponent.assetsPath + "question.svg"

    }

    return path;
  }

  getButtonAttributes() : ButtonAttributes { return new ButtonAttributes({text:"Return", route:"/"});}

}
